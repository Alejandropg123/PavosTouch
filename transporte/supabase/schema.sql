-- =====================================================================
-- ControlOps · Esquema de base de datos para Supabase
-- Pegar completo en Supabase → SQL Editor → New query → Run.
-- Se puede volver a ejecutar sin perder datos (usa "if not exists").
-- =====================================================================

-- ---------- Empresas y consecutivo de OS ----------
create table if not exists public.empresas (
  id          text primary key,
  nombre      text not null,
  prefijo     text not null,
  consecutivo integer not null default 0
);

-- Último número usado por cada empresa (según la hoja de Drive).
-- La próxima OS será 00-452 y JF-267. Ajustar si cambió.
insert into public.empresas (id, nombre, prefijo, consecutivo) values
  ('llano', 'Llano Carga', '00-', 451),
  ('jf', 'Jorge Fonseca', 'JF-', 266)
on conflict (id) do nothing;

-- ---------- Perfiles de usuario y roles ----------
create table if not exists public.perfiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text,
  nombre     text,
  rol        text not null default 'operador' check (rol in ('admin', 'operador')),
  created_at timestamptz not null default now()
);

-- Cada usuario nuevo recibe un perfil. El PRIMER usuario queda como administrador.
create or replace function public.crear_perfil() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.perfiles (id, email, nombre, rol)
  values (
    new.id, new.email, coalesce(new.raw_user_meta_data ->> 'nombre', split_part(new.email, '@', 1)),
    case when exists (select 1 from public.perfiles where rol = 'admin') then 'operador' else 'admin' end
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists al_crear_usuario on auth.users;
create trigger al_crear_usuario after insert on auth.users
  for each row execute function public.crear_perfil();

-- Perfiles de usuarios que ya existían antes de correr este script
insert into public.perfiles (id, email, nombre, rol)
select u.id, u.email, split_part(u.email, '@', 1),
       case when row_number() over (order by u.created_at) = 1
             and not exists (select 1 from public.perfiles where rol = 'admin') then 'admin' else 'operador' end
from auth.users u
on conflict (id) do nothing;

create or replace function public.es_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.perfiles where id = auth.uid() and rol = 'admin');
$$;
-- Solo la usan el disparador y las reglas de seguridad: no se expone a internet.
revoke all on function public.crear_perfil() from public, anon, authenticated;
revoke all on function public.es_admin() from public, anon;
grant execute on function public.es_admin() to authenticated;

-- ---------- Fichas: clientes, vehículos, conductores ----------
-- "docs" guarda la lista de documentos de la ficha: [{tipo, vence, archivo}]
create table if not exists public.clientes (
  id         text primary key,
  nombre     text not null,
  nit        text,
  ciudad     text,
  contacto   text,
  telefono   text,
  docs       jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid default auth.uid()
);

create table if not exists public.vehiculos (
  id         text primary key,
  placa      text not null unique,
  tipo       text,
  modelo     text,
  trailer    text,
  docs       jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid default auth.uid()
);

create table if not exists public.conductores (
  id         text primary key,
  nombre     text not null,
  cedula     text,
  telefono   text,
  docs       jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid default auth.uid()
);

-- ---------- Operaciones (viajes) ----------
-- Relacionadas con empresa, cliente, vehículo y conductor.
-- "docs" guarda la ruta de cada archivo: {remesa, manifiesto, cumplido, terceros, factura}
create table if not exists public.operaciones (
  id           text primary key,
  empresa      text not null references public.empresas (id),
  os           text not null unique,
  fecha        date not null default current_date,
  etapa        text not null default 'pendiente' check (etapa in ('pendiente', 'acta', 'finalizado', 'facturado')),
  cliente_id   text not null references public.clientes (id) on delete restrict,
  vehiculo_id  text not null references public.vehiculos (id) on delete restrict,
  conductor_id text not null references public.conductores (id) on delete restrict,
  trailer      text,
  origen       text,
  destino      text,
  carga        text,
  remesa       text,
  manifiesto   text,
  flete        bigint not null default 0,
  anticipo     bigint not null default 0,
  obs          text,
  factura_no   text,
  docs         jsonb not null default '{}',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  created_by   uuid default auth.uid()
);
create index if not exists operaciones_fecha_idx on public.operaciones (fecha desc);
create index if not exists operaciones_cliente_idx on public.operaciones (cliente_id);
create index if not exists operaciones_vehiculo_idx on public.operaciones (vehiculo_id);
create index if not exists operaciones_conductor_idx on public.operaciones (conductor_id);

-- ---------- Gastos y anticipos del conductor (uno por operación) ----------
create table if not exists public.gastos (
  id             text primary key,
  op_id          text not null unique references public.operaciones (id) on delete cascade,
  fecha          date,
  combustible    bigint not null default 0,
  pct_conductor  bigint not null default 0,
  parqueadero    bigint not null default 0,
  mantenimiento  bigint not null default 0,
  peajes         bigint not null default 0,
  engrase        bigint not null default 0,
  lavado         bigint not null default 0,
  otros          bigint not null default 0,
  anticipos      jsonb not null default '[]',   -- [{valor, fecha}]
  legalizado     boolean not null default false,
  soporte        text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  created_by     uuid default auth.uid()
);

-- ---------- updated_at automático ----------
create or replace function public.tocar_updated_at() returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end $$;

do $$
declare t text;
begin
  foreach t in array array['clientes', 'vehiculos', 'conductores', 'operaciones', 'gastos'] loop
    execute format('drop trigger if exists tocar_updated_at on public.%I', t);
    execute format('create trigger tocar_updated_at before update on public.%I for each row execute function public.tocar_updated_at()', t);
  end loop;
end $$;

-- ---------- Número de OS sin duplicados (aunque dos personas creen viajes a la vez) ----------
create or replace function public.siguiente_os(p_empresa text) returns text
language plpgsql security definer set search_path = public as $$
declare n integer; pre text;
begin
  if auth.uid() is null then raise exception 'No autenticado'; end if;
  update public.empresas set consecutivo = consecutivo + 1 where id = p_empresa
  returning consecutivo, prefijo into n, pre;
  if n is null then raise exception 'La empresa % no existe', p_empresa; end if;
  return pre || n;
end $$;
revoke all on function public.siguiente_os(text) from public, anon;
grant execute on function public.siguiente_os(text) to authenticated;

-- ---------- Seguridad (RLS) ----------
-- Solo usuarios con sesión iniciada ven y editan. Solo administradores borran.
alter table public.empresas    enable row level security;
alter table public.perfiles    enable row level security;
alter table public.clientes    enable row level security;
alter table public.vehiculos   enable row level security;
alter table public.conductores enable row level security;
alter table public.operaciones enable row level security;
alter table public.gastos      enable row level security;

drop policy if exists "empresas_leer" on public.empresas;
create policy "empresas_leer" on public.empresas for select to authenticated using (true);
drop policy if exists "empresas_admin" on public.empresas;
create policy "empresas_admin" on public.empresas for update to authenticated using (public.es_admin()) with check (public.es_admin());

drop policy if exists "perfiles_leer" on public.perfiles;
create policy "perfiles_leer" on public.perfiles for select to authenticated using (id = auth.uid() or public.es_admin());
drop policy if exists "perfiles_admin" on public.perfiles;
create policy "perfiles_admin" on public.perfiles for update to authenticated using (public.es_admin()) with check (public.es_admin());

do $$
declare t text;
begin
  foreach t in array array['clientes', 'vehiculos', 'conductores', 'operaciones', 'gastos'] loop
    execute format('drop policy if exists "%s_leer" on public.%I', t, t);
    execute format('create policy "%s_leer" on public.%I for select to authenticated using (true)', t, t);
    execute format('drop policy if exists "%s_crear" on public.%I', t, t);
    execute format('create policy "%s_crear" on public.%I for insert to authenticated with check (true)', t, t);
    execute format('drop policy if exists "%s_editar" on public.%I', t, t);
    execute format('create policy "%s_editar" on public.%I for update to authenticated using (true) with check (true)', t, t);
    execute format('drop policy if exists "%s_borrar" on public.%I', t, t);
    execute format('create policy "%s_borrar" on public.%I for delete to authenticated using (public.es_admin())', t, t);
  end loop;
end $$;

-- ---------- Archivos (PDF y fotos de documentos) ----------
insert into storage.buckets (id, name, public, file_size_limit)
values ('documentos', 'documentos', false, 20971520)   -- 20 MB por archivo
on conflict (id) do nothing;

drop policy if exists "documentos_leer" on storage.objects;
create policy "documentos_leer" on storage.objects for select to authenticated using (bucket_id = 'documentos');
drop policy if exists "documentos_subir" on storage.objects;
create policy "documentos_subir" on storage.objects for insert to authenticated with check (bucket_id = 'documentos');
drop policy if exists "documentos_reemplazar" on storage.objects;
create policy "documentos_reemplazar" on storage.objects for update to authenticated using (bucket_id = 'documentos');
drop policy if exists "documentos_borrar" on storage.objects;
create policy "documentos_borrar" on storage.objects for delete to authenticated using (bucket_id = 'documentos' and public.es_admin());

-- ---------- Cambios en vivo (todos ven lo mismo al instante) ----------
do $$
declare t text;
begin
  foreach t in array array['clientes', 'vehiculos', 'conductores', 'operaciones', 'gastos'] loop
    if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = t) then
      execute format('alter publication supabase_realtime add table public.%I', t);
    end if;
  end loop;
end $$;

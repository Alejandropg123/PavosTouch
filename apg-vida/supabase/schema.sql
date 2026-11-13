-- APG VIDA · esquema de base de datos (Supabase / Postgres)
-- App personal: cada fila pertenece a un usuario y solo ese usuario puede verla.
-- Se puede ejecutar completo en el SQL Editor de un proyecto nuevo.

-- ---------- Categorías creadas por el usuario ----------
-- tipo: 'lista' (listas de tareas), 'pago' (categorías de pagos), 'carpeta' (carpetas del baúl)
create table if not exists public.categorias (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  tipo text not null check (tipo in ('lista', 'pago', 'carpeta')),
  nombre text not null check (length(trim(nombre)) > 0),
  icono text,
  orden int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- Tareas ----------
create table if not exists public.tareas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  titulo text not null check (length(trim(titulo)) > 0),
  fecha date,
  prioridad text check (prioridad in ('alta', 'media', 'baja')),
  lista_id uuid references public.categorias(id) on delete set null,
  repetir text check (repetir in ('diaria', 'semanal', 'mensual')),
  urgente boolean not null default false,      -- matriz de Eisenhower
  importante boolean not null default false,
  hecha boolean not null default false,
  hecha_en timestamptz,
  created_at timestamptz not null default now()
);

-- ---------- Hábitos ----------
create table if not exists public.habitos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  nombre text not null check (length(trim(nombre)) > 0),
  icono text,
  es_ejercicio boolean not null default false,  -- permite anotar tiempo y repeticiones
  momento text check (momento in ('manana', 'tarde', 'noche')),   -- vacío = todo el día
  meta_dias int check (meta_dias is null or meta_dias between 1 and 1000),
  color text check (color is null or color ~ '^#[0-9A-Fa-f]{6}$'),
  orden int not null default 0,
  created_at timestamptz not null default now()
);

-- Un registro por hábito y día = el check de ese día.
-- detalle (solo ejercicio): {"minutos": 30, "ejercicios": [{"nombre": "Flexiones", "reps": 40}]}
create table if not exists public.habito_registros (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  habito_id uuid not null references public.habitos(id) on delete cascade,
  fecha date not null,
  detalle jsonb,
  created_at timestamptz not null default now(),
  unique (habito_id, fecha)
);

-- ---------- Pagos recurrentes ----------
create table if not exists public.pagos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  nombre text not null check (length(trim(nombre)) > 0),
  frecuencia text not null default 'mensual'
    check (frecuencia in ('mensual', 'bimestral', 'trimestral', 'semestral', 'anual')),
  proxima_fecha date not null,
  valor numeric(14, 2),            -- vacío = valor variable
  categoria_id uuid references public.categorias(id) on delete set null,
  notas text,
  created_at timestamptz not null default now()
);

create table if not exists public.pago_historial (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  pago_id uuid not null references public.pagos(id) on delete cascade,
  fecha_vencimiento date not null,
  pagado_en timestamptz not null default now(),
  valor numeric(14, 2),
  created_at timestamptz not null default now()
);

-- ---------- Baúl de documentos ----------
-- archivos: [{"path": "<user>/<doc>/<archivo>", "nombre": "soat.pdf", "tipo": "application/pdf", "tamano": 123}]
create table if not exists public.documentos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  nombre text not null check (length(trim(nombre)) > 0),
  carpeta_id uuid references public.categorias(id) on delete set null,
  persona text,
  numero text,
  fecha_expedicion date,
  fecha_vencimiento date,
  notas text,
  archivos jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- ---------- Índices ----------
create index if not exists categorias_user_idx on public.categorias (user_id, tipo);
create index if not exists tareas_user_idx on public.tareas (user_id);
create index if not exists tareas_lista_idx on public.tareas (lista_id);
create index if not exists habitos_user_idx on public.habitos (user_id);
create index if not exists registros_user_fecha_idx on public.habito_registros (user_id, fecha);
create index if not exists pagos_user_idx on public.pagos (user_id);
create index if not exists pagos_categoria_idx on public.pagos (categoria_id);
create index if not exists historial_pago_idx on public.pago_historial (pago_id);
create index if not exists historial_user_idx on public.pago_historial (user_id);
create index if not exists documentos_user_idx on public.documentos (user_id);
create index if not exists documentos_carpeta_idx on public.documentos (carpeta_id);

-- ---------- Seguridad: cada usuario solo ve y toca lo suyo ----------
do $$
declare t text;
begin
  foreach t in array array['categorias', 'tareas', 'habitos', 'habito_registros', 'pagos', 'pago_historial', 'documentos'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "dueno" on public.%I', t);
    execute format(
      'create policy "dueno" on public.%I for all to authenticated
         using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()))', t);
  end loop;
end $$;

-- ---------- Archivos: bucket privado, cada usuario en su propia carpeta ----------
-- 20 MB por archivo; solo PDF e imágenes
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('documentos', 'documentos', false, 20971520,
        array['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'image/gif'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "apg_vida_archivos_dueno" on storage.objects;
create policy "apg_vida_archivos_dueno" on storage.objects for all to authenticated
  using (bucket_id = 'documentos' and (storage.foldername(name))[1] = (select auth.uid())::text)
  with check (bucket_id = 'documentos' and (storage.foldername(name))[1] = (select auth.uid())::text);

-- ---------- App de una sola persona: solo se permite el primer registro ----------
-- Después de crear tu cuenta, nadie más puede registrarse aunque encuentre la dirección de la app.
create or replace function public.apg_vida_un_solo_usuario()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if exists (select 1 from auth.users) then
    raise exception 'Registro cerrado: APG VIDA es de uso personal';
  end if;
  return new;
end $$;
revoke execute on function public.apg_vida_un_solo_usuario() from public, anon, authenticated;

drop trigger if exists apg_vida_un_solo_usuario on auth.users;
create trigger apg_vida_un_solo_usuario before insert on auth.users
  for each row execute function public.apg_vida_un_solo_usuario();

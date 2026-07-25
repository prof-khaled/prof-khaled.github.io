-- Run in a dedicated Supabase project before creating an owner administration UI.
-- No passwords, API keys, or service-role credentials belong in this repository.

create type public.publication_status as enum ('draft', 'published', 'in_press', 'unpublished');

create table public.publications (
  id uuid primary key default gen_random_uuid(),
  publication_number integer not null unique check (publication_number > 0),
  citation text not null,
  authors text[] not null default '{}',
  title text not null,
  journal text not null,
  publication_year integer not null check (publication_year between 1900 and 2100),
  volume text,
  issue text,
  pages text,
  doi text unique,
  url text,
  publication_type text not null default 'research-article',
  status public.publication_status not null default 'draft',
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

create table public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'visitor'))
);

create table public.publication_audit_log (
  id bigint generated always as identity primary key,
  publication_id uuid references public.publications(id),
  action text not null,
  actor uuid references auth.users(id),
  changed_at timestamptz not null default now(),
  details jsonb not null default '{}'::jsonb
);

alter table public.publications enable row level security;
alter table public.user_roles enable row level security;
alter table public.publication_audit_log enable row level security;

create policy "public reads published publications"
on public.publications for select
using (status in ('published', 'in_press') and not is_deleted);

create policy "owners manage publications"
on public.publications for all
using (exists (select 1 from public.user_roles r where r.user_id = auth.uid() and r.role = 'owner'))
with check (exists (select 1 from public.user_roles r where r.user_id = auth.uid() and r.role = 'owner'));

create policy "owners read own role"
on public.user_roles for select
using (user_id = auth.uid() or exists (
  select 1 from public.user_roles r where r.user_id = auth.uid() and r.role = 'owner'
));

create policy "owners read audit log"
on public.publication_audit_log for select
using (exists (select 1 from public.user_roles r where r.user_id = auth.uid() and r.role = 'owner'));


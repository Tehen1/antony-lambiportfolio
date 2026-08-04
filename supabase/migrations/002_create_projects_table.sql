-- Table projects (pour géé°°rer les projets dynamiquement)
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  tags text[] not null default '{}',
  github_url text,
  demo_url text,
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.projects enable row level security;

-- Policy: tout le monde peut voir les projets
drop policy if exists "Anyone can view projects" on public.projects;
create policy "Anyone can view projects"
on public.projects
for select
using (true);

-- Policy: seul service role peut insé°°rer/modifier/supprimer
drop policy if exists "Service role can manage projects" on public.projects;
create policy "Service role can manage projects"
on public.projects
for all
using (auth.jwt() ->> 'role' = 'service_role')
with check (auth.jwt() ->> 'role' = 'service_role');

-- Index
drop index if exists idx_projects_featured;
drop index if exists idx_projects_created_at;
create index idx_projects_featured on public.projects(featured) where featured = true;
create index idx_projects_created_at on public.projects(created_at desc);

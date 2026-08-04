-- Table contact_messages
create table if not exists public.contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  ip text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.contact_messages enable row level security;

-- Policy: tout le monde peut insé°°rer (formulaire public)
create policy "Anyone can insert contact messages"
on public.contact_messages
for insert
with check (true);

-- Policy: seul service role peut lire (admin dashboard)
create policy "Service role can view all messages"
on public.contact_messages
for select
using (auth.jwt() ->> 'role' = 'service_role');

-- Policy: seul service role peut supprimer
create policy "Service role can delete messages"
on public.contact_messages
for delete
using (auth.jwt() ->> 'role' = 'service_role');

-- Index pour performances
drop index if exists idx_contact_messages_created_at;
create index idx_contact_messages_created_at
on public.contact_messages(created_at desc);

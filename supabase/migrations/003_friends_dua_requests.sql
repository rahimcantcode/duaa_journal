create table if not exists public.friends_dua_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  dua_request text not null,
  status text not null default 'new',
  note text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.friends_dua_requests enable row level security;

drop policy if exists "Public users can submit friend duaa requests" on public.friends_dua_requests;
create policy "Public users can submit friend duaa requests"
on public.friends_dua_requests
for insert
to anon, authenticated
with check (
  length(trim(name)) > 0
  and length(trim(dua_request)) > 0
);

drop policy if exists "Authenticated users can read friend duaa requests" on public.friends_dua_requests;
create policy "Authenticated users can read friend duaa requests"
on public.friends_dua_requests
for select
to authenticated
using (
  auth.uid() = (
    select p.id
    from public.profiles p
    where lower(coalesce(p.full_name, '')) = lower('Amina Benaissa')
    order by p.created_at asc
    limit 1
  )
);

drop policy if exists "Authenticated users can update friend duaa requests" on public.friends_dua_requests;
create policy "Authenticated users can update friend duaa requests"
on public.friends_dua_requests
for update
to authenticated
using (
  auth.uid() = (
    select p.id
    from public.profiles p
    where lower(coalesce(p.full_name, '')) = lower('Amina Benaissa')
    order by p.created_at asc
    limit 1
  )
)
with check (
  auth.uid() = (
    select p.id
    from public.profiles p
    where lower(coalesce(p.full_name, '')) = lower('Amina Benaissa')
    order by p.created_at asc
    limit 1
  )
);

grant insert on public.friends_dua_requests to anon, authenticated;
grant select, update on public.friends_dua_requests to authenticated;

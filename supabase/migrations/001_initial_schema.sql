create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.duas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  title text,
  content text not null,
  is_favorite boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  google_form_link text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_duas_updated_at on public.duas;
create trigger set_duas_updated_at
before update on public.duas
for each row
execute function public.set_updated_at();

drop trigger if exists set_settings_updated_at on public.settings;
create trigger set_settings_updated_at
before update on public.settings
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', 'Amina Benaissa'),
    new.email
  )
  on conflict (id) do nothing;

  insert into public.settings (user_id)
  values (new.id)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.duas enable row level security;
alter table public.settings enable row level security;

create policy "Users can read their own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "Users can insert their own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users can read their own duas"
on public.duas
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own duas"
on public.duas
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own duas"
on public.duas
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own duas"
on public.duas
for delete
to authenticated
using (auth.uid() = user_id);

create policy "Users can read their own settings"
on public.settings
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own settings"
on public.settings
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own settings"
on public.settings
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create or replace function public.get_public_google_form_link(
  target_email text default null,
  target_name text default 'Amina Benaissa'
)
returns text
language sql
security definer
set search_path = public
as $$
  select s.google_form_link
  from public.settings s
  join public.profiles p on p.id = s.user_id
  where s.google_form_link is not null
    and (
      (target_email is not null and lower(p.email) = lower(target_email))
      or (target_email is null and p.full_name = target_name)
    )
  order by s.updated_at desc
  limit 1;
$$;

grant execute on function public.get_public_google_form_link(text, text) to anon, authenticated;

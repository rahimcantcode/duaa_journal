create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create unique index if not exists categories_user_id_lower_name_idx
on public.categories (user_id, lower(name));

alter table public.categories enable row level security;

do $$
begin
  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'duas'
      and column_name = 'category_id'
  ) then
    alter table public.duas add column category_id uuid references public.categories(id) on delete set null;
  end if;
end
$$;

create policy "Users can read their own categories"
on public.categories
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own categories"
on public.categories
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own categories"
on public.categories
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own categories"
on public.categories
for delete
to authenticated
using (auth.uid() = user_id);

create or replace function public.ensure_default_categories_for_user(target_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.categories (user_id, name)
  select target_user_id, category_name
  from (
    values
      ('For My Family'),
      ('For My Hajj'),
      ('For Our Future'),
      ('For Peace & Clarity'),
      ('For Forgiveness')
  ) as defaults(category_name)
  where not exists (
    select 1
    from public.categories c
    where c.user_id = target_user_id
      and lower(c.name) = lower(defaults.category_name)
  );
end;
$$;

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

  perform public.ensure_default_categories_for_user(new.id);

  return new;
end;
$$;

do $$
declare
  current_user_id uuid;
begin
  for current_user_id in
    select id from auth.users
  loop
    perform public.ensure_default_categories_for_user(current_user_id);
  end loop;
end
$$;

insert into public.categories (user_id, name)
select distinct d.user_id, d.category
from public.duas d
where d.category is not null
  and not exists (
    select 1
    from public.categories c
    where c.user_id = d.user_id
      and lower(c.name) = lower(d.category)
  );

update public.duas d
set category_id = c.id
from public.categories c
where d.user_id = c.user_id
  and d.category_id is null
  and lower(c.name) = lower(d.category);

grant execute on function public.ensure_default_categories_for_user(uuid) to authenticated;

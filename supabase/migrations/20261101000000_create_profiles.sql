-- Dinner Decider: household profiles
--
-- Where to run this: Supabase Dashboard → your project → SQL Editor → New query →
-- paste this whole file → Run. Run it once; running it a second time fails with
-- "already exists", which is harmless.

-- 1. The table: one row per user, holding the household profile.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,

  household_size smallint not null default 2
    check (household_size between 1 and 20),

  -- Free text, e.g. "Kids: no mushrooms".
  picky_eaters text not null default ''
    check (char_length(picky_eaters) <= 500),

  -- HARD CONSTRAINT: a suggested dinner must never contain any of these.
  allergies text[] not null default '{}'
    check (cardinality(allergies) <= 30),

  weeknight_minutes smallint not null default 30
    check (weeknight_minutes in (15, 30, 45, 60)),

  spice_level text not null default 'mild'
    check (spice_level in ('mild', 'medium', 'hot')),

  favorite_cuisines text[] not null default '{}'
    check (cardinality(favorite_cuisines) <= 20),

  -- 0 = comfort food only … 4 = very adventurous.
  adventurousness smallint not null default 1
    check (adventurousness between 0 and 4),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Household profile, one row per user.';
comment on column public.profiles.allergies is
  'Hard constraint: a suggested dinner must never contain these.';

-- 2. Row-level security: each signed-in user can only see and change their own row.
alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Users can create their own profile"
  on public.profiles for insert
  to authenticated
  with check ((select auth.uid()) = id);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- No delete policy: a profile is removed automatically when its user is deleted.
-- Logged-out visitors (the "anon" role) get no access at all.
grant select, insert, update on public.profiles to authenticated;

-- 3. Keep updated_at current on every change.
create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- 4. Create an empty profile automatically when someone signs up.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- Favorites table
create table if not exists public.favorites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  tool_id text not null,
  created_at timestamptz default now(),
  unique(user_id, tool_id)
);

alter table public.favorites enable row level security;

create policy "Users can read own favorites"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "Users can insert own favorites"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own favorites"
  on public.favorites for delete
  using (auth.uid() = user_id);

-- Recommendation history
create table if not exists public.recommend_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  answers jsonb not null,
  results jsonb not null,
  created_at timestamptz default now()
);

alter table public.recommend_history enable row level security;

create policy "Users can read own history"
  on public.recommend_history for select
  using (auth.uid() = user_id);

create policy "Users can insert own history"
  on public.recommend_history for insert
  with check (auth.uid() = user_id);

-- Events table (analytics)
create table if not exists public.events (
  id uuid default gen_random_uuid() primary key,
  event text not null,
  props jsonb default '{}',
  url text,
  timestamp timestamptz default now()
);

-- Events are write-only from client, no RLS needed for insert
alter table public.events enable row level security;

create policy "Anyone can insert events"
  on public.events for insert
  with check (true);

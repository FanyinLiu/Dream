-- Run this in Supabase SQL Editor

create table if not exists public.memberships (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  plan text not null default 'free', -- 'free' | 'pro'
  lemon_customer_id text,
  lemon_subscription_id text,
  lemon_order_id text,
  expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.memberships enable row level security;

create policy "Users can read own membership"
  on public.memberships for select
  using (auth.uid() = user_id);

-- Only server (service_role) can insert/update memberships via webhook

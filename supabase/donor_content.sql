-- Donor-facing organization content
create table if not exists public.organization_leaders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text,
  photo_url text not null,
  sort_order integer default 0,
  published boolean default true,
  created_at timestamptz default now()
);
create table if not exists public.organization_content (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  title text not null,
  body text,
  metric_value text,
  metric_label text,
  image_url text,
  document_url text,
  document_name text,
  sort_order integer default 0,
  published boolean default true,
  created_at timestamptz default now()
);
alter table public.organization_leaders enable row level security;
alter table public.organization_content enable row level security;
create policy "public read published leaders" on public.organization_leaders for select using (published = true);
create policy "public read published organization content" on public.organization_content for select using (published = true);
create policy "authenticated manage leaders" on public.organization_leaders for all to authenticated using (true) with check (true);
create policy "authenticated manage organization content" on public.organization_content for all to authenticated using (true) with check (true);

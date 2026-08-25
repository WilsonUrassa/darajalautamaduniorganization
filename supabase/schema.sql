-- Keep the existing contact_messages table/policies from the original site.
-- Run this file in Supabase SQL Editor.

create table if not exists public.project_proposals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_url text not null,
  file_name text not null,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.project_proposals enable row level security;

drop policy if exists "Public can view published proposals" on public.project_proposals;
create policy "Public can view published proposals"
on public.project_proposals for select
to anon, authenticated
using (published = true);

-- Gallery metadata supports images and videos. Files themselves live in Storage.
create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  media_type text not null check (media_type in ('image','video')),
  media_url text not null,
  thumbnail_url text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.gallery_items enable row level security;

drop policy if exists "Public can view published gallery items" on public.gallery_items;
create policy "Public can view published gallery items"
on public.gallery_items for select
to anon, authenticated
using (published = true);

-- Public read-only Storage buckets. Upload/delete remains controlled from the
-- Supabase dashboard by the project owner/admin.
insert into storage.buckets (id, name, public)
values ('project-proposals', 'project-proposals', true)
on conflict (id) do update set public = true;

insert into storage.buckets (id, name, public)
values ('project-gallery', 'project-gallery', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can read proposal files" on storage.objects;
create policy "Public can read proposal files"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'project-proposals');

drop policy if exists "Public can read gallery files" on storage.objects;
create policy "Public can read gallery files"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'project-gallery');

-- After running this SQL, use Supabase Dashboard -> Storage to upload files.
-- Then add their public Storage URLs to project_proposals.file_url or
-- gallery_items.media_url. Keep published=true for items that should appear.

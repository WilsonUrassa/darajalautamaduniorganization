-- Run after schema.sql in Supabase SQL Editor.
-- Create the admin user in Supabase Authentication -> Users first.
-- For production, restrict authenticated access further if multiple users exist.

drop policy if exists "Authenticated users can insert proposals" on public.project_proposals;
create policy "Authenticated users can insert proposals" on public.project_proposals for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update proposals" on public.project_proposals;
create policy "Authenticated users can update proposals" on public.project_proposals for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated users can delete proposals" on public.project_proposals;
create policy "Authenticated users can delete proposals" on public.project_proposals for delete to authenticated using (true);

drop policy if exists "Authenticated users can insert gallery" on public.gallery_items;
create policy "Authenticated users can insert gallery" on public.gallery_items for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update gallery" on public.gallery_items;
create policy "Authenticated users can update gallery" on public.gallery_items for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated users can delete gallery" on public.gallery_items;
create policy "Authenticated users can delete gallery" on public.gallery_items for delete to authenticated using (true);

drop policy if exists "Authenticated users can upload proposal files" on storage.objects;
create policy "Authenticated users can upload proposal files" on storage.objects for insert to authenticated with check (bucket_id = 'project-proposals');

drop policy if exists "Authenticated users can delete proposal files" on storage.objects;
create policy "Authenticated users can delete proposal files" on storage.objects for delete to authenticated using (bucket_id = 'project-proposals');

drop policy if exists "Authenticated users can upload gallery files" on storage.objects;
create policy "Authenticated users can upload gallery files" on storage.objects for insert to authenticated with check (bucket_id = 'project-gallery');

drop policy if exists "Authenticated users can delete gallery files" on storage.objects;
create policy "Authenticated users can delete gallery files" on storage.objects for delete to authenticated using (bucket_id = 'project-gallery');

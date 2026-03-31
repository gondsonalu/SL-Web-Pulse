-- ================================================================
--  SLWebPulse — Supabase Storage Setup
--  Run this in Supabase SQL Editor AFTER running schema.sql
-- ================================================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  (
    'project-images',
    'project-images',
    true,               -- publicly accessible URLs
    5242880,            -- 5 MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  ),
  (
    'ceo-images',
    'ceo-images',
    true,
    5242880,
    ARRAY['image/jpeg', 'image/png', 'image/webp']
  )
ON CONFLICT (id) DO NOTHING;

-- ── Storage RLS Policies ──────────────────────────────────────

-- project-images: anyone can read, only service role can upload/delete
CREATE POLICY "project_images_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

CREATE POLICY "project_images_service_upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'service_role');

CREATE POLICY "project_images_service_delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'project-images' AND auth.role() = 'service_role');

-- ceo-images: same pattern
CREATE POLICY "ceo_images_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'ceo-images');

CREATE POLICY "ceo_images_service_upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'ceo-images' AND auth.role() = 'service_role');

CREATE POLICY "ceo_images_service_delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'ceo-images' AND auth.role() = 'service_role');

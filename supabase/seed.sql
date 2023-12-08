insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at) 
values ('00000000-0000-0000-0000-000000000000', '5e040c00-ce26-4f2f-8413-e0985ec1f4b2', 'authenticated', 'authenticated', 'jonny@supabase.io', '$2a$10$Iw/2HLcgRMoXLslFxZXFC.8bxpDZnDhrj.NVGZ20H4T/OLq2HzCcy', '2023-01-11 16:54:12.7991+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-01-11 16:54:12.801124+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-01-11 16:54:12.796822+00', '2023-01-11 16:54:12.80197+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL);

-- Seed data for bookmarks
INSERT INTO public.bookmarks (inserted_by, url, title, description)
VALUES
  ('5e040c00-ce26-4f2f-8413-e0985ec1f4b2', 'https://vercel.com', 'Vercel', 'Search engine'),
  ('5e040c00-ce26-4f2f-8413-e0985ec1f4b2', 'https://twitter.com', 'NextJS', 'Social media'),
  ('5e040c00-ce26-4f2f-8413-e0985ec1f4b2', 'https://facebook.com', 'Supabase', 'Social media'),
  ('5e040c00-ce26-4f2f-8413-e0985ec1f4b2', 'https://instagram.com', 'React', 'Social media'),
  ('5e040c00-ce26-4f2f-8413-e0985ec1f4b2', 'https://youtube.com', 'TailwindCSS', 'Video sharing'),
  ('5e040c00-ce26-4f2f-8413-e0985ec1f4b2', 'https://twitch.tv', 'ui.shadcn', 'Video streaming');

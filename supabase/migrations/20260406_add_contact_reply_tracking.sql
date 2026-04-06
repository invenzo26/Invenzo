alter table public.contacts
add column if not exists replied_at timestamptz,
add column if not exists reply_subject text;

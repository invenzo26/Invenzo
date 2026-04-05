create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at_site_settings()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_site_settings_updated_at on public.site_settings;

create trigger trg_site_settings_updated_at
before update on public.site_settings
for each row
execute function public.set_updated_at_site_settings();

insert into public.site_settings (key, value)
values
  ('home_promo_card', '{}'::jsonb),
  ('admin_profile', '{"replyEmail": ""}'::jsonb)
on conflict (key) do nothing;

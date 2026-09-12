-- Supabase Dashboard -> SQL Editor oynasida shu faylning hammasini Run qiling.
create table if not exists public.students (
  id uuid primary key,
  full_name text not null,
  school_class text not null,
  password text not null,
  results jsonb not null default '{}'::jsonb,
  attempts jsonb not null default '[]'::jsonb,
  pending_review jsonb not null default '{}'::jsonb,
  telegram_sent boolean not null default false,
  telegram_error text,
  created_at timestamptz not null default now()
);

create unique index if not exists students_name_class_unique
  on public.students (lower(full_name), school_class);

create table if not exists public.questions (
  id text primary key,
  section text not null,
  grade integer check (grade between 1 and 11),
  prompt text not null,
  options jsonb,
  answer text,
  audio_text text,
  audio_url text,
  created_at timestamptz not null default now()
);

create index if not exists questions_section_grade_index on public.questions (section, grade);

create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

insert into public.app_settings (key, value)
values ('main', '{"gradingMode":"teacher","adminUsername":"admin","adminPassword":"admin","readingPassage":{"content":"","translation":""}}'::jsonb)
on conflict (key) do nothing;

-- Sayt Supabase service_role kaliti orqali faqat serverdan ulanadi.
-- Shuning uchun brauzer foydalanuvchilari bu jadvallarga to‘g‘ridan-to‘g‘ri kira olmaydi.
alter table public.students enable row level security;
alter table public.questions enable row level security;
alter table public.app_settings enable row level security;

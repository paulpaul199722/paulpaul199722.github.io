-- 1TakePass (香港私家車自動波甲部筆試溫習系統)
-- Shares the same Supabase project as pillsreminder (zwrnjqzagbepowsiwzyf),
-- using completely separate tables prefixed with onetake_ so public.doses is untouched.

create table if not exists public.onetake_progress (
  profile_id text not null default 'default',
  question_id text not null,
  attempts integer not null default 0,
  correct_count integer not null default 0,
  wrong_count integer not null default 0,
  box integer not null default 1 check (box between 0 and 5),
  streak integer not null default 0,
  last_result text check (last_result in ('correct', 'wrong')),
  last_selected_option text check (last_selected_option in ('A', 'B', 'C')),
  mistake_reason text,
  personal_note text,
  next_review_at timestamptz not null default now(),
  last_answered_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (profile_id, question_id)
);

create table if not exists public.onetake_exams (
  id uuid primary key default gen_random_uuid(),
  profile_id text not null default 'default',
  mode text not null check (mode in ('exam', 'practice', 'mistakes', 'srs', 'signs', 'chapter')),
  total_questions integer not null check (total_questions > 0),
  correct_count integer not null check (correct_count >= 0),
  passed boolean not null,
  answers jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.onetake_stats (
  profile_id text primary key default 'default',
  total_answered integer not null default 0,
  total_correct integer not null default 0,
  best_combo integer not null default 0,
  current_combo integer not null default 0,
  exams_passed integer not null default 0,
  xp integer not null default 0,
  updated_at timestamptz not null default now()
);

create index if not exists idx_onetake_progress_review
  on public.onetake_progress (profile_id, next_review_at);

create index if not exists idx_onetake_exams_profile_created
  on public.onetake_exams (profile_id, created_at desc);

alter table public.onetake_progress enable row level security;
alter table public.onetake_exams enable row level security;
alter table public.onetake_stats enable row level security;

drop policy if exists "onetake_progress_anon_all" on public.onetake_progress;
create policy "onetake_progress_anon_all"
  on public.onetake_progress
  for all to anon
  using (true)
  with check (true);

drop policy if exists "onetake_exams_anon_all" on public.onetake_exams;
create policy "onetake_exams_anon_all"
  on public.onetake_exams
  for all to anon
  using (true)
  with check (true);

drop policy if exists "onetake_stats_anon_all" on public.onetake_stats;
create policy "onetake_stats_anon_all"
  on public.onetake_stats
  for all to anon
  using (true)
  with check (true);

grant select, insert, update, delete on public.onetake_progress to anon;
grant select, insert, update, delete on public.onetake_exams to anon;
grant select, insert, update, delete on public.onetake_stats to anon;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'onetake_progress'
  ) then
    alter publication supabase_realtime add table public.onetake_progress;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'onetake_exams'
  ) then
    alter publication supabase_realtime add table public.onetake_exams;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'onetake_stats'
  ) then
    alter publication supabase_realtime add table public.onetake_stats;
  end if;
end $$;

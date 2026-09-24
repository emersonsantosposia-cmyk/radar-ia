-- Radar de Casos de Uso de IA
-- Cole no SQL Editor do Supabase e clique em Run (uma vez).

create table if not exists public.casos_ia (
  id uuid primary key default gen_random_uuid(),
  aluno text not null,
  area text not null,
  problema text not null,
  solucao_ia text not null,
  created_at timestamptz not null default now()
);

alter table public.casos_ia enable row level security;

drop policy if exists "leitura_publica" on public.casos_ia;
drop policy if exists "insercao_publica" on public.casos_ia;

-- Aula: qualquer visitante lê e insere.
-- Não use este modelo com dado real de cliente.
create policy "leitura_publica"
on public.casos_ia
for select
to anon, authenticated
using (true);

create policy "insercao_publica"
on public.casos_ia
for insert
to anon, authenticated
with check (true);

comment on table public.casos_ia is 'Mural da turma — desafio 17/09/2026';

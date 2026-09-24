# Prompt para colar no Cursor

Copie o bloco abaixo **inteiro** e envie no Chat / Agent do Cursor, com a pasta do Next.js já aberta.

Se a IA perguntar se pode instalar pacotes, responda **sim**.

---

```
Quero que você construa, neste projeto Next.js, uma aplicação web chamada "Radar de Casos de Uso de IA".

## Objetivo
Página única em português (pt-BR) onde qualquer visitante:
1. preenche um formulário e grava um caso de uso no Supabase;
2. vê a lista dos casos já gravados, do mais recente para o mais antigo;
3. recarrega a página e os dados continuam lá.

## Stack (não troque)
- Next.js App Router (o que já existe neste repositório)
- JavaScript ou TypeScript, o que o projeto já usa
- Cliente @supabase/supabase-js
- Sem login, sem NextAuth, sem Prisma, sem backend extra
- Sem biblioteca de UI (sem shadcn, sem MUI, sem Chakra)
- CSS simples no próprio projeto (Tailwind só se o create-next-app já tiver instalado)

## Variáveis de ambiente (já vão existir em .env.local)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

Crie um cliente Supabase reutilizável (ex.: src/lib/supabase.js ou equivalente) lendo essas duas variáveis. Se alguma estiver faltando, mostre um aviso visível na página — não quebre com tela branca.

## Banco (já criado no Supabase — NÃO tente migrar nem criar tabela pelo código)
Tabela: casos_ia

Colunas:
- id (uuid, gerado pelo banco)
- aluno (text, obrigatório)
- area (text, obrigatório)
- problema (text, obrigatório)
- solucao_ia (text, obrigatório)
- created_at (timestamptz, default now())

Insert: aluno, area, problema, solucao_ia
Select: todas as colunas, order by created_at descending

## Formulário
Campos:
- Nome (aluno)
- Área: select com as opções Saúde, Educação, Jurídico, Gestão, Engenharia, Finanças, Marketing, Outra
- Problema do dia a dia (textarea, máx. 280 caracteres)
- Como a IA ajuda (textarea, máx. 280 caracteres)

Regras:
- Não enviar se algum campo estiver vazio
- Mostrar estado de "enviando..." no botão
- Depois do sucesso: limpar o formulário, recarregar a lista, mostrar confirmação discreta
- Se o insert falhar: mostrar a mensagem de erro de forma legível (não só console.log)

## Lista
Para cada caso mostre: nome, área (como etiqueta), problema, solução, data/hora em pt-BR.
Estado vazio: "Nenhum caso publicado ainda. Seja o primeiro."
No topo: contador "N casos publicados".

## Visual
- Interface em português
- Visual editorial e sóbrio (pós-graduação): fundo claro, papel, uma cor de destaque sóbria (azul-escuro + âmbar). Nada de gradiente roxo, neon, hero genérico de IA, emoji, nem texto em inglês
- Tipografia grande e legível
- Funciona em notebook e em celular (form em coluna única no mobile)
- Cabeçalho com título "Radar de Casos de Uso de IA" e subtítulo "Mural da turma — o que a inteligência artificial já resolve (ou pode resolver) no seu ofício"
- Rodapé curto: "Exercício de aula · Cursor + Supabase + Vercel"

## Arquivos
- Substitua a page inicial pelo mural
- Remova o boilerplate padrão do create-next-app (logos, "Get started")
- Não commite segredos
- Não use a chave service_role

## Quando terminar
1. Instale as dependências que faltar
2. Me diga exatamente o que testar em localhost:3000
3. Não explique teoria — só construa e, no final, liste os arquivos que criou ou alterou
```

---

## Se a IA travar, use estes puxões curtos

**Lista vazia depois de enviar:**

```
O insert parece funcionar, mas a lista não atualiza. Verifique o nome da tabela casos_ia, as colunas aluno/area/problema/solucao_ia e se o SELECT usa a chave anon. Mostre o erro na tela.
```

**Tela branca:**

```
A página está em branco. Encontre o erro de build ou de runtime, corrija e mantenha a mesma página única do Radar.
```

**Visual genérico:**

```
Refaça só o CSS: fundo off-white, título editorial, cards com borda fina, etiqueta âmbar para a área. Sem gradiente e sem estilo "startup de IA".
```

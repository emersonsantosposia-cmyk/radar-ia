# Radar de Casos de Uso de IA

**Turma:** Pós · Quintas ao vivo · 17/09/2026
**Duração:** 1h30
**Ferramentas:** Cursor (IDE + IA) · Supabase (banco) · Vercel (hospedagem)

---

## O que vocês vão entregar

Uma página pública na internet com:

1. Um **formulário** para registrar um caso de uso de IA.
2. Uma **lista** dos casos já gravados no banco.
3. Uma **URL da Vercel** que qualquer colega consiga abrir no celular.

Não é um sistema completo. É o caminho **ideia → dado salvo → app no ar**.

---

## O produto

**Radar de Casos de Uso de IA** — um mural da turma.

Cada registro tem:

| Campo | Exemplo |
|-------|---------|
| Nome | Ana Souza |
| Área | Educação |
| Problema do dia a dia | Corrigir 40 redações por semana |
| Como a IA ajuda | Gera rubrica e um primeiro parecer para eu revisar |

Quem entra no site vê os casos da turma e pode incluir o próprio.

---

## Regras da aula

- Trabalho **individual** (dupla só se faltar máquina).
- A IA escreve o código. Vocês **dirigem**: colam o prompt, testam, pedem correção.
- Não copiem o projeto pronto de outra pessoa. O exercício é o percurso.
- Segurança de sala de aula: a tabela fica **aberta para leitura e inserção**. Não usem senha real, dado clínico, dado de cliente nem chave de API paga.

---

## Versão mínima (vale a aula)

Se no final existir isto, o desafio está cumprido:

- [ ] Formulário com os 4 campos acima
- [ ] Ao enviar, o caso aparece na lista
- [ ] Os dados sobrevivem se a página for recarregada (estão no Supabase)
- [ ] A página abre em uma URL `*.vercel.app`

## Se sobrar tempo (opcional)

- Filtro por área
- Contador (“N casos publicados”)
- Mensagem de erro amigável se o banco não responder
- Layout melhor no celular

---

## Passo a passo (siga nesta ordem)

### 1. Criar o projeto no Cursor (cerca de 10 min)

No terminal do Cursor:

```bash
npx create-next-app@latest radar-ia --yes
cd radar-ia
```

Depois: **File → Open Folder** e abra a pasta `radar-ia`.

### 2. Criar o banco no Supabase (cerca de 10 min)

1. Acesse [supabase.com](https://supabase.com) → **New project**.
2. Nome: `radar-ia`. Senha do banco: anote em um bloco de notas (não compartilhe).
3. Região: a mais próxima (ex.: **South America** / São Paulo, se aparecer).
4. Espere o projeto ficar **Active**.
5. Menu **SQL Editor** → **New query** → cole o conteúdo de `supabase.sql` → **Run**.
6. Menu **Project Settings → API**:
   - copie **Project URL**
   - copie **anon public** (é a chave pública da aula; a `service_role` **não** se usa e **não** se cola no código)

Crie o arquivo `.env.local` na raiz do projeto:

```
NEXT_PUBLIC_SUPABASE_URL=cole_aqui_a_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=cole_aqui_a_chave_anon
```

### 3. Pedir à IA para construir o app (cerca de 30 min)

1. Abra o **Chat / Agent** do Cursor.
2. Cole o prompt de `PROMPT-CURSOR.md`.
3. Deixe a IA criar os arquivos.
4. No terminal: `npm run dev`.
5. Abra [http://localhost:3000](http://localhost:3000).
6. Cadastre **o seu** caso de uso. Recarregue a página. Se o caso continuar lá, o banco está funcionando.

Se algo quebrar: descreva o erro para o Cursor (“o formulário envia e some, mas a lista fica vazia”) em vez de recomeçar do zero.

### 4. Publicar na Vercel (cerca de 15 min)

1. Crie um repositório no GitHub e envie o código.

```bash
git init
git add .
git commit -m "Radar de casos de uso de IA"
```

Não versione o `.env.local`. Ele já deve estar no `.gitignore`.

2. Em [vercel.com](https://vercel.com) → **Add New → Project** → importe o repositório.
3. Em **Environment Variables**, cadastre as **mesmas duas** variáveis do `.env.local`.
4. **Deploy**.
5. Abra a URL `*.vercel.app`, cadastre um caso de teste e mande o link no chat da aula.

---

## Critério de aceite (um colega testa em 30 segundos)

1. A URL abre sem erro.
2. Existe um formulário visível.
3. Um envio novo aparece na lista.
4. Recarregar a página **não apaga** o registro.

---

## O que discutir no final (2 minutos por pessoa, se der tempo)

- O que a IA fez sozinha e o que você precisou corrigir?
- Onde o dado “mora” (navegador, banco, servidor da Vercel)?
- O que faltaria para isso virar um produto de verdade (login, permissões, edição)?

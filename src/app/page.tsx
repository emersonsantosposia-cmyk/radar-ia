"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { getSupabase, supabaseConfigError, type Caso } from "@/lib/supabase";

const AREAS = [
  "Saúde",
  "Educação",
  "Jurídico",
  "Gestão",
  "Engenharia",
  "Finanças",
  "Marketing",
  "Outra",
] as const;

const LIMITE = 280;

function formatarData(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default function Home() {
  const [casos, setCasos] = useState<Caso[]>([]);
  const [carregandoLista, setCarregandoLista] = useState(true);
  const [erroLista, setErroLista] = useState("");
  const [aluno, setAluno] = useState("");
  const [area, setArea] = useState("");
  const [problema, setProblema] = useState("");
  const [solucao, setSolucao] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erroForm, setErroForm] = useState("");
  const [confirmacao, setConfirmacao] = useState("");

  const carregarCasos = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) {
      setCarregandoLista(false);
      setErroLista(supabaseConfigError ?? "");
      return;
    }

    setErroLista("");
    const { data, error } = await supabase
      .from("casos_ia")
      .select("id, aluno, area, problema, solucao_ia, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      setErroLista(error.message);
      setCasos([]);
    } else {
      setCasos(data ?? []);
    }
    setCarregandoLista(false);
  }, []);

  useEffect(() => {
    void carregarCasos();
  }, [carregarCasos]);

  async function publicar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setConfirmacao("");
    setErroForm("");

    const nome = aluno.trim();
    const areaEscolhida = area.trim();
    const problemaTexto = problema.trim();
    const solucaoTexto = solucao.trim();

    if (!nome || !areaEscolhida || !problemaTexto || !solucaoTexto) {
      setErroForm("Preencha nome, área, problema e como a IA ajuda.");
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setErroForm(supabaseConfigError ?? "Supabase indisponível.");
      return;
    }

    setEnviando(true);
    const { error } = await supabase.from("casos_ia").insert({
      aluno: nome,
      area: areaEscolhida,
      problema: problemaTexto,
      solucao_ia: solucaoTexto,
    });
    setEnviando(false);

    if (error) {
      setErroForm(error.message);
      return;
    }

    setAluno("");
    setArea("");
    setProblema("");
    setSolucao("");
    setConfirmacao("Caso publicado no mural.");
    await carregarCasos();
  }

  const total = casos.length;

  return (
    <div className="wrap">
      <h1>Radar de Casos de Uso de IA</h1>
      <p className="lede">
        Mural da turma — o que a inteligência artificial já resolve (ou pode
        resolver) no seu ofício
      </p>

      {supabaseConfigError ? (
        <p className="aviso erro" role="alert">
          {supabaseConfigError}
        </p>
      ) : null}

      <div className="layout">
        <form onSubmit={publicar}>
          <h2>Publicar um caso</h2>

          {erroForm ? (
            <p className="aviso erro" role="alert">
              {erroForm}
            </p>
          ) : null}
          {confirmacao ? (
            <p className="aviso ok" role="status">
              {confirmacao}
            </p>
          ) : null}

          <label htmlFor="aluno">Nome</label>
          <input
            id="aluno"
            name="aluno"
            value={aluno}
            onChange={(event) => setAluno(event.target.value)}
            autoComplete="name"
            required
            disabled={enviando || Boolean(supabaseConfigError)}
          />

          <label htmlFor="area">Área</label>
          <select
            id="area"
            name="area"
            value={area}
            onChange={(event) => setArea(event.target.value)}
            required
            disabled={enviando || Boolean(supabaseConfigError)}
          >
            <option value="">Selecione a área</option>
            {AREAS.map((opcao) => (
              <option key={opcao} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>

          <label htmlFor="problema">Problema do dia a dia</label>
          <textarea
            id="problema"
            name="problema"
            value={problema}
            maxLength={LIMITE}
            onChange={(event) => setProblema(event.target.value)}
            required
            disabled={enviando || Boolean(supabaseConfigError)}
          />
          <p className="contador">
            {problema.length}/{LIMITE}
          </p>

          <label htmlFor="solucao">Como a IA ajuda</label>
          <textarea
            id="solucao"
            name="solucao"
            value={solucao}
            maxLength={LIMITE}
            onChange={(event) => setSolucao(event.target.value)}
            required
            disabled={enviando || Boolean(supabaseConfigError)}
          />
          <p className="contador">
            {solucao.length}/{LIMITE}
          </p>

          <button type="submit" disabled={enviando || Boolean(supabaseConfigError)}>
            {enviando ? "Enviando..." : "Publicar no mural"}
          </button>
        </form>

        <section className="list" aria-label="Casos publicados">
          <h2>Mural</h2>
          <p className="count">
            {total} {total === 1 ? "caso publicado" : "casos publicados"}
          </p>

          {erroLista && !supabaseConfigError ? (
            <p className="aviso erro" role="alert">
              {erroLista}
            </p>
          ) : null}

          {carregandoLista ? (
            <p className="vazio">Carregando casos...</p>
          ) : null}

          {!carregandoLista && !erroLista && total === 0 ? (
            <p className="vazio">Nenhum caso publicado ainda. Seja o primeiro.</p>
          ) : null}

          {casos.map((caso) => (
            <article key={caso.id}>
              <div className="meta">
                <span className="name">{caso.aluno}</span>
                <span className="tag">{caso.area}</span>
                <time className="when" dateTime={caso.created_at}>
                  {formatarData(caso.created_at)}
                </time>
              </div>
              <p className="q">
                <strong>Problema.</strong> {caso.problema}
              </p>
              <p className="a">
                <strong>IA.</strong> {caso.solucao_ia}
              </p>
            </article>
          ))}
        </section>
      </div>

      <footer>Exercício de aula · Cursor + Supabase + Vercel</footer>
    </div>
  );
}

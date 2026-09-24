import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type Caso = {
  id: string;
  aluno: string;
  area: string;
  problema: string;
  solucao_ia: string;
  created_at: string;
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

export const supabaseConfigError =
  !url || !anonKey
    ? "Faltam NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY. Coloque as duas no arquivo .env.local e reinicie o servidor."
    : null;

let client: SupabaseClient | null = null;

export function getSupabase() {
  if (supabaseConfigError) return null;
  if (!client) client = createClient(url, anonKey);
  return client;
}

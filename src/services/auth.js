import { supabase } from "./supabase";

export async function checkUserPlan() {
  // Pega o usuário logado
  const { data: { user } } = await supabase.auth.getUser();
  
  // Se não tiver usuário, retorna básico
  if (!user) return "basico";

  // Busca o plano na tabela 'profiles'
  const { data, error } = await supabase
    .from("profiles")
    .select("plano")
    .eq("id", user.id)
    .maybeSingle();

  // Se der erro ou não achar, assume básico por segurança
  if (error || !data) return "basico";
  
  return data.plano || "basico";
}
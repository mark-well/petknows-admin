import { supabase } from "../../../utils/supabase";

export async function getTotalUsers() {
  const { count, error } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  if (error) throw error;
  return count;
}

export async function getTotalAdmins() {
  const { count, error } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("role", "admin");

  if (error) throw error;
  return count;
}

import { supabase } from "../../../utils/supabase";

export async function getUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .neq("role", "admin")
    .neq("role", "super_admin")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getUsersAdmins() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

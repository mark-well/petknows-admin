import { supabase } from "../../../utils/supabase";

export default async function getUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
      id,
      public_id,
      first_name,
      last_name,
      email,
      role,
      created_at
    `,
    )
    .neq("role", "admin")
    .neq("role", "super_admin")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

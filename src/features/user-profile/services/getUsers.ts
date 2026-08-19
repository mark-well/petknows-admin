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
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

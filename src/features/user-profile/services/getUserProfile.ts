import { supabase } from "../../../utils/supabase";

export const getUserProfile = async (id: string) => {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();
  if (error) throw error;

  return data;
};

import { supabase } from "../../../utils/supabase";

export async function getMaoDetails(id: string | null) {
  if (!id) throw new Error("No mao id provided");

  const { data, error } = await supabase
    .from("mao")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getMaoName(id: string | null) {
  if (!id) throw new Error("No mao id provided");

  const { data, error } = await supabase
    .from("mao")
    .select("name")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

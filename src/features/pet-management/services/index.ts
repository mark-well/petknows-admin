import { supabase } from "../../../utils/supabase";

export async function getTotalPetCount() {
  const { count, error } = await supabase
    .from("pets")
    .select("*", { count: "exact", head: true });

  if (error) throw error;
  return count;
}

export async function getTotalPetCountFromMao(id: string | null) {
  if (!id) throw new Error("No mao id provided");
  const { count, error } = await supabase
    .from("pets")
    .select("*", { count: "exact", head: true })
    .eq("place_of_registration", id);

  if (error) throw error;
  return count;
}

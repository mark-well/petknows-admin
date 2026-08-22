import { supabase } from "../../../utils/supabase";
import { queryPet } from "../api/queries";

export default async function getSinglePet(petId: string | null) {
  if (!petId) throw new Error("No pet id provided");

  const { data, error } = await supabase
    .from("pets")
    .select(queryPet)
    .eq("public_id", petId)
    .single();

  if (error) throw error;
  return data;
}

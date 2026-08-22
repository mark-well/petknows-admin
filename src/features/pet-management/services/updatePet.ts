import { supabase } from "../../../utils/supabase";
import type { PetUpdateType } from "../types";

export default async function updatePet(petId: string, update: PetUpdateType) {
  const { data, error } = await supabase
    .from("pets")
    .update(update)
    .eq("id", petId)
    .select();

  if (error) throw error;
  return data;
}

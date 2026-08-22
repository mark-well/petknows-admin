import { supabase } from "../../../utils/supabase";
import { queryPet } from "../api/queries";

export default async function getMaoPets(maoId: string | null) {
  if (!maoId) throw new Error("No MAO id provided");

  const { data, error } = await supabase
    .from("pets")
    .select(queryPet)
    .eq("place_of_registration", maoId)
    .order("date_registered", { ascending: false });

  if (error) throw error;
  return data;
}

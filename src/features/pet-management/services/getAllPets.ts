import { supabase } from "../../../utils/supabase";
import { queryPet } from "../api/queries";

export default async function getAllPets() {
  const { data, error } = await supabase
    .from("pets")
    .select(queryPet)
    .order("date_registered", { ascending: false });

  if (error) throw error;
  return data;
}

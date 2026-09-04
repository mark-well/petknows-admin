import { supabase } from "../../../utils/supabase";

export default async function getPetImagesRecord(petId: string) {
  const {data, error} = await supabase.from("pet_images").select("*").eq("pet_id", petId);

  if(error) throw error;
  return data;
}
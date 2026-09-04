import { supabase } from "../../../utils/supabase";

export default async function deletePetImageService(urls: string[]) {
  if (!urls) return;

  const { data, error } = await supabase.storage.from("pet_avatars").remove(urls);
  if (error) throw error;
  return data;
}

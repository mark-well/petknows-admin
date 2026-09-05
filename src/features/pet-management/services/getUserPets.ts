import { supabase } from "../../../utils/supabase";
import { queryPet } from "../api/queries";

export default async function getUserPets(userId: string | null) {
  if (!userId) throw new Error("No user id provided");

  const { data, error } = await supabase.from("pets").select(queryPet).eq(
    "user_id",
    userId,
  ).order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

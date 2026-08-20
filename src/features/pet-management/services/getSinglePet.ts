import { supabase } from "../../../utils/supabase";

export default async function getSinglePet(petId: string | null) {
  if (!petId) throw new Error("No pet id provided");

  const { data, error } = await supabase
    .from("pets")
    .select(
      `
        id,
        public_id,
        name,
        pet_type,
        created_at,
        avatar_url,
        status:pet_status(name),
        profiles(public_id, first_name, last_name, email, user_contact(number))
      `,
    )
    .eq("public_id", petId)
    .single();

  if (error) throw error;
  return data;
}

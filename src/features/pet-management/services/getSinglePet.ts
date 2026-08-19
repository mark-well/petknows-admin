import { supabase } from "../../../utils/supabase";

export default async function getSinglePet(petId: string | null) {
  if (!petId) throw new Error("No pet id provided");

  const { data, error } = await supabase
    .from("pets")
    .select(
      `
        public_id,
        name,
        pet_type,
        created_at,
        status:pet_status(name),
        user_id
      `,
    )
    .eq("public_id", petId)
    .single();

  if (error) throw error;
  return data;
}

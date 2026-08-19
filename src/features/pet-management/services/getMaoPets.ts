import { supabase } from "../../../utils/supabase";

export default async function getMaoPets(maoId: string | null) {
  if (!maoId) throw new Error("No MAO id provided");

  const { data, error } = await supabase
    .from("pets")
    .select(
      `
      id,
      public_id,
      pet_name:name,
      pet_type,
      created_at,
      pet_status(
        name
      ),
      profiles(
        first_name,
        last_name
      )
    `,
    )
    .eq("place_of_registration", maoId)
    .order("date_registered", { ascending: false });

  if (error) throw error;
  const result = data.map((pet) => ({
    id: pet.id,
    public_id: pet.public_id,
    pet_name: pet.pet_name,
    pet_type: pet.pet_type,
    pet_status: pet.pet_status?.name,
    date_of_registration: pet.created_at,
    owner_firstname: pet.profiles?.first_name,
    owner_lastname: pet.profiles?.last_name,
  }));

  return result;
}

import { supabase } from "../../../utils/supabase";

export default async function getAge(dateOfBirth: string | null) {
  if (!dateOfBirth) throw new Error("No date of birth provided");
  const { data, error } = await supabase.rpc("calculate_age", {
    date_of_birth: dateOfBirth,
  });

  if (error) throw error;
  return data;
}

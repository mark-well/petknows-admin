import { supabase } from "../../../utils/supabase";

export const getUserProfile = async (
  id: string | null,
  publicId: string | null,
) => {
  if (id) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;

    return data;
  }

  if (publicId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("public_id", publicId)
      .single();
    if (error) throw error;

    return data;
  }
};

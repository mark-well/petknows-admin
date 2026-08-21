import deleteImageFromBucket from "../../../shared/services/deleteImageFromBucket";
import { supabase } from "../../../utils/supabase";
import type { Pet } from "../types";

export default async function (pets: Set<Pet>) {
  if (pets.size === 0) throw new Error("No pets to delete");

  const { data, error } = await supabase
    .from("pets")
    .delete()
    .in(
      "id",
      [...pets].map((pet) => pet.id),
    )
    .select();
  if (error) throw error;

  // Delete pet image
  try {
    deleteImageFromBucket(
      "pet_avatars",
      [...data]
        .map((pet) => pet.avatar_url)
        .filter((avatar_url) => avatar_url !== null),
    );
  } catch (e) {
    throw e;
  }
}

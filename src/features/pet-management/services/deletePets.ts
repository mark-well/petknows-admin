import { supabase } from "../../../utils/supabase";
import type { Pet } from "../types";
import deletePetImageService from "./deletePetImageService";
import getPetImagesRecord from "./getPetImagesRecord";

export default async function deletePets(pets: Set<Pet>) {
  if (pets.size === 0) throw new Error("No pets to delete");

  const petIds = [...pets].map(pet => pet.id);
  const petImagesRecord = await getPetImagesRecord(petIds);
  const imageUrls = petImagesRecord.map(record => record.image_url).filter((url): url is string => url !== null);

  // Delete the pet
  const {error} = await supabase.from("pets").delete().in("id", petIds);
  if(error) throw error;

  // Delete the pet images
  if(imageUrls.length > 0) {
    await deletePetImageService(imageUrls);
  }
}

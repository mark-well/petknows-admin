import { useMutation } from "@tanstack/react-query";
import deletePets from "../services/deletePets";
import type { Pet } from "../types";

export default function useDeletePets() {
  const {mutate, isPending} = useMutation({
      mutationFn: (selectedPet: Set<Pet>) => deletePets(selectedPet),
  });
  
  return {
    mutate, isPending
  }
}
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../auth/providers/useAuth";
import getMaoPets from "../services/getMaoPets";
import { useState } from "react";
import type { Pet } from "../types";

export default function usePetList() {
  const { userProfile } = useAuth();

  // Fetch all MAO specific pets
  const {
    data: allMaoPets,
    isPending: petsLoading,
    refetch,
  } = useQuery({
    queryKey: ["maoPets", userProfile?.id],
    queryFn: () => getMaoPets(userProfile?.admin_at ?? null),
  });

  const [selectedPets, setSelectedPets] = useState<Set<Pet>>(new Set());
  const allSelected =
    !!allMaoPets?.length && allMaoPets.every((pet) => selectedPets.has(pet));

  const togglePetSelection = (
    pet: NonNullable<typeof allMaoPets>[number],
    checked: boolean,
  ) => {
    setSelectedPets((prev) => {
      const next = new Set(prev);
      checked ? next.add(pet) : next.delete(pet);
      return next;
    });
  };

  const toggleSelectAll = (checked: boolean) => {
    setSelectedPets(
      checked ? new Set(allMaoPets?.map((pet) => pet)) : new Set(),
    );
  };

  const clearSelectedPetIds = () => {
    setSelectedPets(new Set());
  };

  const refreshPets = () => {
    refetch();
  };

  return {
    allMaoPets,
    petsLoading,
    allSelected,
    selectedPets,
    togglePetSelection,
    toggleSelectAll,
    clearSelectedPetIds,
    refreshPets,
  };
}

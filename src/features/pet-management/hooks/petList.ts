import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../auth/providers/useAuth";
import getMaoPets from "../services/getMaoPets";
import { useState } from "react";

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

  const [selectedPetIds, setSelectedPetIds] = useState<Set<string>>(new Set());
  const allSelected =
    !!allMaoPets?.length &&
    allMaoPets.every((pet) => selectedPetIds.has(pet.id));

  const togglePetSelection = (petId: string, checked: boolean) => {
    setSelectedPetIds((prev) => {
      const next = new Set(prev);
      checked ? next.add(petId) : next.delete(petId);
      return next;
    });
  };

  const toggleSelectAll = (checked: boolean) => {
    setSelectedPetIds(
      checked ? new Set(allMaoPets?.map((pet) => pet.id)) : new Set(),
    );
  };

  const clearSelectedPetIds = () => {
    setSelectedPetIds(new Set());
  };

  const refreshPets = () => {
    refetch();
  };

  return {
    allMaoPets,
    petsLoading,
    allSelected,
    selectedPetIds,
    togglePetSelection,
    toggleSelectAll,
    clearSelectedPetIds,
    refreshPets,
  };
}

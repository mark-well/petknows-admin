import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../auth/providers/useAuth";
import getMaoPets from "../services/getMaoPets";
import { useState } from "react";
import type { Pet } from "../types";
import getAllPets from "../services/getAllPets";

export default function usePetList() {
  const { userProfile, userRole } = useAuth();

  // Fetch all MAO specific pets
  const {
    data: allPets,
    isPending: petsLoading,
    refetch,
  } = useQuery({
    queryKey: ["maoPets", userProfile?.id],
    queryFn: () => {
      if (userRole === "super_admin") {
        return getAllPets();
      }
      {
        return getMaoPets(userProfile?.admin_at ?? null);
      }
    },
  });

  const [selectedPets, setSelectedPets] = useState<Set<Pet>>(new Set());
  const allSelected =
    !!allPets?.length && allPets.every((pet) => selectedPets.has(pet));

  const togglePetSelection = (
    pet: NonNullable<typeof allPets>[number],
    checked: boolean,
  ) => {
    setSelectedPets((prev) => {
      const next = new Set(prev);
      checked ? next.add(pet) : next.delete(pet);
      return next;
    });
  };

  const toggleSelectAll = (checked: boolean) => {
    setSelectedPets(checked ? new Set(allPets?.map((pet) => pet)) : new Set());
  };

  const clearSelectedPetIds = () => {
    setSelectedPets(new Set());
  };

  const refreshPets = () => {
    refetch();
  };

  return {
    allPets,
    petsLoading,
    allSelected,
    selectedPets,
    togglePetSelection,
    toggleSelectAll,
    clearSelectedPetIds,
    refreshPets,
  };
}

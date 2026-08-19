import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../auth/providers/useAuth";
import getMaoPets from "../services/getMaoPets";
import Checkbox from "../../../shared/components/Checkbox";
import formatJoinedDate from "../../../shared/services/formatJoinedDate";
import { useState } from "react";
import { useNavigate } from "react-router";

function PetTable() {
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  // Fetch all MAO specific pets
  const { data: allMaoPets, isPending: petsLoading } = useQuery({
    queryKey: ["maoPets", userProfile?.id],
    queryFn: () => getMaoPets(userProfile?.admin_at ?? null),
  });

  const [selectedPetIds, setSelectedPetIds] = useState<Set<string>>(new Set());
  const allSelected =
    !!allMaoPets?.length &&
    allMaoPets.every((pet) => selectedPetIds.has(pet.public_id));

  const handlePetCheckd = (petId: string, checked: boolean) => {
    setSelectedPetIds((prev) => {
      const next = new Set(prev);
      checked ? next.add(petId) : next.delete(petId);
      return next;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedPetIds(
      checked ? new Set(allMaoPets?.map((pet) => pet.public_id)) : new Set(),
    );
  };

  const tableHeaders = [
    "Name",
    "Species",
    "Status",
    "Date Registered",
    "Owner",
  ];

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="rounded-sm bg-gray-200">
            <th className="flex gap-x-2 px-4 py-2 text-left">
              <Checkbox
                checked={allSelected}
                partial={selectedPetIds.size > 0}
                onChange={handleSelectAll}
              />
              ID
            </th>
            {tableHeaders.map((head) => (
              <th key={head} className="text-left">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {petsLoading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : (
            allMaoPets?.map((pet) => (
              <tr
                onClick={() => {
                  navigate(`/pet-management/${pet.public_id}`);
                }}
                key={pet.public_id}
                className="cursor-pointer border-b border-gray-300 px-4 transition-colors duration-75 hover:bg-gray-100"
              >
                <td className="flex gap-x-2 px-4 py-2">
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0"
                  >
                    <Checkbox
                      checked={selectedPetIds.has(pet.public_id)}
                      onChange={(checked) =>
                        handlePetCheckd(pet.public_id, checked)
                      }
                    />
                  </div>{" "}
                  {pet.public_id}
                </td>
                <td>{pet.pet_name}</td>
                <td className="capitalize">{pet.pet_type}</td>
                <td>{pet.pet_status}</td>
                <td>{formatJoinedDate(new Date(pet.date_of_registration))}</td>
                <td>{`${pet.owner_firstname} ${pet.owner_lastname}`}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default PetTable;

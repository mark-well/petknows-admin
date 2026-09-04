import { Helmet } from "react-helmet-async";
import IconButton from "../../../shared/components/IconButton";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import PetTable from "../components/PetTable";
import usePetList from "../hooks/petList";
import { useQueryClient } from "@tanstack/react-query";
import type { Pet } from "../types";
import { useEffect, useState } from "react";
import useDeletePets from "../hooks/useDeletePets";

function PetManagementPage() {
  const petList = usePetList();
  const queryClient = useQueryClient();
  const [filteredPets, setFilteredPets] = useState<Pet[] | undefined>();
  const deletePetMutation = useDeletePets();

  useEffect(() => {
    setFilteredPets(petList.allPets ?? undefined);
  }, [petList.allPets]);

  const handleDeletePet = () => {
    if (petList.selectedPets.size === 0) {
      alert("No pets selected");
      return;
    }

    const confirmed = confirm("Are you sure you want to delete the pets?");
    if (!confirmed) return;

    deletePetMutation.mutate(petList.selectedPets, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["maoPets"] });
        alert("Delete success");
      },
      onError: (e) => {
        alert(e.message);
      },
    });
  };

  const handlePetSearch = (
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const value = event.target.value.toLowerCase().trim();

    const filtered = petList.allPets?.filter(
      (pet) =>
        pet.public_id.toLowerCase().includes(value) ||
        pet.name?.toLowerCase().includes(value) ||
        pet.pet_type?.toLowerCase().includes(value) ||
        pet.status?.name?.toLowerCase().includes(value) ||
        pet.profiles?.first_name?.toLowerCase().includes(value) ||
        pet.profiles?.last_name?.toLowerCase().includes(value),
    );

    setFilteredPets(filtered);
  };

  return (
    <>
      <Helmet>
        <title>Pet Management</title>
      </Helmet>
      <div className="font-inter text-text flex w-full flex-col gap-y-4 p-4">
        <h2 className="font-sora text-2xl font-semibold">Manage Pets</h2>
        <div className="top-toolbar flex justify-between">
          <div className="flex items-center gap-x-2">
            <IconButton
              icon={faTrash}
              variant="danger"
              onClick={handleDeletePet}
              className="h-full"
            >
              Delete
            </IconButton>
            <p className="text-xl font-semibold">{`${petList.selectedPets.size}/${petList.allPets?.length}`}</p>
          </div>
          <div className="flex gap-x-4">
            <input
              type="text"
              placeholder="Search here..."
              className="focus:border-secondary rounded-sm border border-gray-300 px-4 outline-none"
              onChange={(e) => handlePetSearch(e)}
            />
            <IconButton icon={faPlus}>Add New</IconButton>
          </div>
        </div>

        <div>
          <PetTable usePetList={petList} filteredPets={filteredPets ?? null} />
        </div>
      </div>
    </>
  );
}

export default PetManagementPage;

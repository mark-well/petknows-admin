import { Helmet } from "react-helmet-async";
import IconButton from "../../../shared/components/IconButton";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import PetTable from "../components/PetTable";
import usePetList from "../hooks/petList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deletePets from "../services/deletePets";

function PetManagementPage() {
  const petList = usePetList();
  const queryClient = useQueryClient();

  const deletePetMutation = useMutation({
    mutationFn: (selectedPetIds: Set<string>) => deletePets(selectedPetIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maoPets"] });
      alert("Delete success");
      petList.refreshPets();
      petList.clearSelectedPetIds();
    },
    onError: (e) => {
      alert(e.message);
    },
  });

  const handleDeletePet = () => {
    if (petList.selectedPetIds.size === 0) {
      alert("No pets selected");
      return;
    }

    const confirmed = confirm("Are you sure you want to delete the pets?");
    if (!confirmed) return;

    deletePetMutation.mutate(petList.selectedPetIds);
  };

  return (
    <>
      <Helmet>
        <title>Pet Management</title>
      </Helmet>
      <div className="font-inter text-text flex w-full flex-col gap-y-4 p-4">
        <h2 className="font-sora text-2xl font-semibold">Manage Pets</h2>
        <div className="top-toolbar flex justify-between">
          <IconButton icon={faTrash} variant="danger" onClick={handleDeletePet}>
            Delete
          </IconButton>
          <div className="flex gap-x-4">
            <input
              type="text"
              placeholder="Search here..."
              className="focus:border-secondary rounded-sm border border-gray-300 px-4 outline-none"
            />
            <IconButton icon={faPlus}>Add New</IconButton>
          </div>
        </div>

        <div>
          <PetTable usePetList={petList} />
        </div>
      </div>
    </>
  );
}

export default PetManagementPage;

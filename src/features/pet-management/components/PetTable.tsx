import Checkbox from "../../../shared/components/Checkbox";
import formatJoinedDate from "../../../shared/services/formatJoinedDate";
import { useNavigate } from "react-router";
import usePetList from "../hooks/petList";
import StatusBadge from "./StatusBadge";

interface Props {
  usePetList: ReturnType<typeof usePetList>;
}

function PetTable({ usePetList }: Props) {
  const navigate = useNavigate();
  const {
    allMaoPets,
    petsLoading,
    allSelected,
    selectedPets,
    togglePetSelection,
    toggleSelectAll,
  } = usePetList;

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
          <tr className="w-full rounded-sm bg-gray-200">
            <th className="flex gap-2 px-4 py-2 text-left">
              <Checkbox
                checked={allSelected}
                partial={selectedPets.size > 0}
                onChange={toggleSelectAll}
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
                <td className="flex gap-2 px-4 py-2">
                  <div onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedPets.has(pet)}
                      onChange={(checked) => togglePetSelection(pet, checked)}
                    />
                  </div>{" "}
                  {pet.public_id}
                </td>
                <td>{pet.pet_name}</td>
                <td className="capitalize">{pet.pet_type}</td>
                <td>
                  <div className="flex">
                    <StatusBadge status={pet.pet_status}>
                      {pet.pet_status}
                    </StatusBadge>
                  </div>
                </td>
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

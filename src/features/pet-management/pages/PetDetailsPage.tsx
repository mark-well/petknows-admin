import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import getSinglePet from "../services/getSinglePet";
import formatJoinedDate from "../../../shared/services/formatJoinedDate";

function PetDetailsPage() {
  const params = useParams();
  const petId = params.petId;

  const { data: pet, isPending } = useQuery({
    queryKey: ["singlePet", petId],
    queryFn: () => getSinglePet(petId ?? null),
    enabled: !!petId,
  });

  if (isPending || !pet) return <div>Loading...</div>;
  return (
    <>
      <div className="p-4">
        <p>ID: {pet?.public_id}</p>
        <p>Name: {pet?.name}</p>
        <p>Species: {pet?.pet_type}</p>
        <p>Status: {pet?.status?.name}</p>
        <p>Date Registered: {formatJoinedDate(new Date(pet.created_at))}</p>
        <p>Owner: {pet?.user_id}</p>
      </div>
    </>
  );
}

export default PetDetailsPage;

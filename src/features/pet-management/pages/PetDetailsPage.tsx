import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import getSinglePet from "../services/getSinglePet";
import formatJoinedDate from "../../../shared/services/formatJoinedDate";
import { getPetImage } from "../services";

function PetDetailsPage() {
  const params = useParams();
  const petId = params.petId;

  const { data: pet, isPending } = useQuery({
    queryKey: ["singlePet", petId],
    queryFn: () => getSinglePet(petId ?? null),
    enabled: !!petId,
  });

  const { data: petImageUrl } = useQuery({
    queryKey: ["petImage", petId],
    queryFn: () => getPetImage(pet?.avatar_url ?? null),
    enabled: !!pet,
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
        <img
          src={petImageUrl?.publicUrl}
          alt="Pet Image"
          width="350"
          height="350"
        />
      </div>
    </>
  );
}

export default PetDetailsPage;

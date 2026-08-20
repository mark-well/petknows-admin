import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import getSinglePet from "../services/getSinglePet";
import formatJoinedDate from "../../../shared/services/formatJoinedDate";
import { getPetImage } from "../services";
import IconButton from "../../../shared/components/IconButton";
import {
  faChevronRight,
  faCopy,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StatusBadge from "../components/StatusBadge";

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
      <div className="font-inter flex w-full flex-col items-start p-4 text-base">
        <div className="flex w-full items-start gap-16">
          <img
            src={petImageUrl?.publicUrl}
            alt="Pet Image"
            width="416"
            height="416"
            className="aspect-square rounded-md object-cover shadow-md"
          />

          <div className="flex flex-1 flex-col gap-8">
            <div className="flex flex-col items-end gap-4">
              <div className="w-full overflow-hidden rounded-md border border-gray-300">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        colSpan={2}
                        className="font-sora rounded-md border-b border-gray-300 px-4 py-2 text-left font-semibold text-gray-700"
                      >
                        Pet Details
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="px-4 py-2 text-gray-500">ID:</td>
                      <td className="px-4 text-gray-700">
                        <div className="flex">
                          <p className="grow">{pet.public_id}</p>
                          <FontAwesomeIcon
                            icon={faCopy}
                            size="lg"
                            onClick={() => alert("Not yet implemented")}
                          />
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="px-4 py-2 text-gray-500">Name:</td>
                      <td className="px-4 text-gray-700">{pet.name}</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="px-4 py-2 text-gray-500">Species:</td>
                      <td className="px-4 text-gray-700 capitalize">
                        {pet.pet_type}
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="px-4 py-2 text-gray-500">Status:</td>
                      <td className="px-4 text-gray-700 capitalize">
                        <div className="flex">
                          <StatusBadge status={pet.status?.name}>
                            {pet.status?.name}
                          </StatusBadge>
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="px-4 py-2 text-gray-500">Breed:</td>
                      <td className="px-4 text-gray-700 capitalize">N/A</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="px-4 py-2 text-gray-500">Color:</td>
                      <td className="px-4 text-gray-700 capitalize">N/A</td>
                    </tr>

                    <tr className="border-b border-gray-300">
                      <td className="px-4 py-2 text-gray-500">
                        Date Registered:
                      </td>
                      <td className="px-4 text-gray-700 capitalize">
                        {formatJoinedDate(new Date(pet.created_at))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <IconButton
                icon={faPen}
                onClick={() => alert("This feature is not yet implemented.")}
              >
                Update
              </IconButton>
            </div>

            <div className="w-full overflow-hidden rounded-md border border-gray-300">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      colSpan={2}
                      className="font-sora rounded-md border-b border-gray-300 px-4 py-2 text-left font-semibold text-gray-700"
                    >
                      <div className="flex justify-between">
                        User Details
                        <FontAwesomeIcon icon={faChevronRight} size="lg" />
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-2 text-gray-500">ID:</td>
                    <td className="px-4 text-gray-700">
                      <div className="flex">
                        <p className="grow">{pet.profiles?.public_id}</p>
                        <FontAwesomeIcon
                          icon={faCopy}
                          size="lg"
                          onClick={() => alert("Not yet implemented")}
                        />
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-2 text-gray-500">Full Name:</td>
                    <td className="px-4 text-gray-700">{`${pet.profiles?.first_name} ${pet.profiles?.last_name}`}</td>
                  </tr>

                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-2 text-gray-500">Email:</td>
                    <td className="px-4 text-gray-700">
                      {pet.profiles?.email}
                    </td>
                  </tr>

                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-2 text-gray-500">Contact:</td>
                    <td className="px-4 text-gray-700 capitalize">
                      {pet.profiles?.user_contact[0]
                        ? "+63" + pet.profiles?.user_contact[0].number
                        : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PetDetailsPage;

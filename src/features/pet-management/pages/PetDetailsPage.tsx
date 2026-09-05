import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import getSinglePet from "../services/getSinglePet";
import formatJoinedDate from "../../../shared/services/formatJoinedDate";
import IconButton from "../../../shared/components/IconButton";
import {
  faChevronRight,
  faCopy,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StatusBadge from "../components/StatusBadge";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { Pet, PetUpdateType } from "../types";
import updatePet from "../services/updatePet";
import { queryClient } from "../../../app/queryClient";
import copyText from "../../../utils/copyText";
import PetImages from "../components/PetImages";
import useDeletePets from "../hooks/useDeletePets";

function PetDetailsPage() {
  const params = useParams();
  const petId = params.petId;
  const { register, handleSubmit, reset } = useForm<Pet>();
  const navigate = useNavigate();
  const deletePetMutation = useDeletePets();

  const { data: pet, isPending } = useQuery({
    queryKey: ["singlePet", petId],
    queryFn: () => getSinglePet(petId ?? null),
    enabled: !!petId,
  });

  useEffect(() => {
    if (pet) {
      reset(pet);
    }
  }, [pet]);

  const updatePetMutation = useMutation({
    mutationFn: ({
      petId,
      updated,
    }: {
      petId: string;
      updated: PetUpdateType;
    }) => updatePet(petId, updated),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["singlePet"] });
      alert("Pet successfully updated");
    },
    onError: () => alert("Update failed"),
  });

  const onSubmitUpdate = (data: Pet) => {
    if (!pet?.id) throw new Error("No id");
    const updatedData: PetUpdateType = {
      name: data.name,
      pet_type: data.pet_type,
      breed: data.breed,
      color: data.color,
    };
    updatePetMutation.mutate({ petId: pet?.id, updated: updatedData });
  };

  const resetValueToDefault = (
    e: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    if (e.target.value.trim() === "") {
      reset();
    }
  };

  const navigateToUser = (userId: string) => {
    navigate(`/user-management/${userId}`);
  };

  const handleDeletePet = () => {
    const confirmed = confirm("Are you sure you want to delete the pets?");
    if (!confirmed) return;
    if (!pet) return;

    deletePetMutation.mutate(new Set<Pet>([pet]), {
      onSuccess: () => {
        alert("Delete success");
        navigate(-1);
      },
      onError: () => alert("There was an error deleting the pet"),
    });
  };

  if (isPending) return <div>Loading...</div>;
  if (!pet) return <div>Pet not found</div>;
  return (
    <>
      <div className="font-inter flex w-full flex-col items-start p-4 text-base">
        <div className="flex w-full items-start gap-4">
          <div className="flex min-w-0 flex-1 flex-row flex-wrap justify-center gap-4">
            <PetImages petId={pet.id} petAvatarUrl={pet.avatar_url ?? ""} />
            <div className="flex w-full flex-row items-center gap-2">
              <div className="h-px w-full bg-gray-300" />
              <span className="text-base text-gray-700">Description</span>
              <div className="h-px w-full bg-gray-300" />
            </div>
            {pet.description ? (
              <div>
                <div>
                  <p className="text-justify indent-4 text-base text-gray-700">
                    {pet.description}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-lg font-semibold text-gray-500">
                No Description
              </p>
            )}
          </div>

          <div className="flex min-w-0 flex-2 flex-col gap-8">
            {/* Pet Details */}
            <div className="flex flex-col items-end gap-4">
              <div className="w-full overflow-hidden rounded-md border border-gray-300">
                <form>
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
                              onClick={() => copyText(pet.public_id)}
                            />
                          </div>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">Name:</td>
                        <td className="px-4 text-gray-700">
                          <input
                            {...register("name", { required: true })}
                            className="w-full"
                            onBlur={(e) => resetValueToDefault(e)}
                          />
                        </td>
                      </tr>

                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">Species:</td>
                        <td className="px-4 text-gray-700">
                          <input
                            {...register("pet_type", { required: true })}
                            className="w-full capitalize"
                            onBlur={(e) => resetValueToDefault(e)}
                            placeholder="dog, cat, etc."
                          />
                        </td>
                      </tr>

                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">Status:</td>
                        <td className="px-4 text-gray-700 capitalize">
                          <div className="flex">
                            <StatusBadge status={pet.status ?? "registered"} />
                          </div>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">Breed:</td>
                        <td className="px-4 text-gray-700 capitalize">
                          <input
                            {...register("breed", { required: true })}
                            className="w-full"
                            onBlur={(e) => resetValueToDefault(e)}
                          />
                        </td>
                      </tr>

                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">Color:</td>
                        <td className="px-4 text-gray-700 capitalize">
                          <input
                            {...register("color", { required: true })}
                            className="w-full"
                            onBlur={(e) => resetValueToDefault(e)}
                          />
                        </td>
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
                </form>
              </div>
              <div className="flex gap-4">
                <IconButton
                  icon={faTrash}
                  variant="danger"
                  onClick={handleDeletePet}
                  disabled={deletePetMutation.isPending}
                >
                  Delete
                </IconButton>
                <IconButton
                  icon={faPen}
                  onClick={handleSubmit(onSubmitUpdate)}
                  disabled={updatePetMutation.isPending}
                >
                  Update
                </IconButton>
              </div>
            </div>

            {/* User Details */}
            <div className="w-full overflow-hidden rounded-md border border-gray-300">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th
                      colSpan={2}
                      className="font-sora rounded-md border-b border-gray-300 px-4 py-2 text-left font-semibold text-gray-700"
                    >
                      <div className="flex items-center justify-between">
                        Owner Details
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          size="lg"
                          className="rounded-sm p-1 transition-colors duration-75 hover:bg-gray-300"
                          onClick={() =>
                            navigateToUser(pet.profiles?.public_id ?? "")
                          }
                        />
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
                          onClick={() =>
                            copyText(pet.profiles?.public_id ?? null)
                          }
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

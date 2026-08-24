import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { getUserProfile } from "../../user-profile/services/getUserProfile";
import { getUserAvatar } from "../../user-profile/services";
import IconButton from "../../../shared/components/IconButton";
import {
  faCopy,
  faPaw,
  faPen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import formatJoinedDate from "../../../shared/services/formatJoinedDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import copyText from "../../../utils/copyText";
import { useForm } from "react-hook-form";
import type { UserProfile } from "../../user-profile/types";
import { useEffect } from "react";
import getUserAddress from "../../user-profile/services/getUserAddress";
import getUserPets from "../../pet-management/services/getUserPets";
import StatusBadge from "../../pet-management/components/StatusBadge";

function UserDetailsPage() {
  const params = useParams();
  const userPublicId = params.userId;
  const { register, reset } = useForm<UserProfile>();
  const navigate = useNavigate();

  const { data: user, isPending } = useQuery({
    queryKey: ["singleUser", userPublicId],
    queryFn: () => getUserProfile(null, userPublicId ?? null),
  });

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user]);

  const { data: userAvatar } = useQuery({
    queryKey: ["userAvatar", userPublicId],
    queryFn: () => getUserAvatar(user?.avatar_url ?? null),
  });

  const { data: userAddress, isPending: isUserAddressLoading } = useQuery({
    queryKey: ["userAddress", user?.id],
    queryFn: () => getUserAddress(user?.id ?? null),
    enabled: !!user?.id,
  });

  const resetValueToDefault = (
    e: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    if (e.target.value.trim() === "") {
      reset();
    }
  };

  const { data: userPets, isPending: petsLoading } = useQuery({
    queryKey: ["userPets", user?.id],
    queryFn: () => getUserPets(user?.id ?? null),
  });

  if (isPending || !user) return <div>Loading...</div>;
  return (
    <>
      <div className="font-inter flex w-full flex-col items-start gap-4 p-4 text-base">
        <div className="flex w-full items-start gap-16">
          {userAvatar ? (
            <img
              src={userAvatar?.publicUrl}
              alt="User Profile Pic"
              width="416"
              height="416"
              className="aspect-square rounded-md object-cover shadow-md"
            />
          ) : (
            <div className="flex aspect-square h-104.5 w-104.5 items-center justify-center rounded-md border border-gray-300 object-cover shadow-md">
              <p className="font-sora text-3xl text-gray-400">No Profile</p>
            </div>
          )}

          <div className="flex flex-1 flex-col gap-8">
            {/* User Details */}
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
                          <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faUser} />
                            Details
                          </div>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">ID:</td>
                        <td className="px-4 text-gray-700">
                          <div className="flex">
                            <p className="grow">{user.public_id}</p>
                            <FontAwesomeIcon
                              icon={faCopy}
                              size="lg"
                              onClick={() => copyText(user.public_id)}
                            />
                          </div>
                        </td>
                      </tr>

                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">First Name:</td>
                        <td className="px-4 text-gray-700">
                          <input
                            {...register("first_name", { required: true })}
                            className="w-full"
                            onBlur={(e) => resetValueToDefault(e)}
                          />
                        </td>
                      </tr>

                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">Last Name:</td>
                        <td className="px-4 text-gray-700">
                          <input
                            {...register("last_name", { required: true })}
                            className="w-full capitalize"
                            onBlur={(e) => resetValueToDefault(e)}
                          />
                        </td>
                      </tr>

                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">Birth Date:</td>
                        <td className="px-4 text-gray-700">
                          <input
                            {...register("birth_date", { required: true })}
                            className="w-full capitalize"
                            onBlur={(e) => resetValueToDefault(e)}
                            placeholder="YYYY-MM-DD"
                          />
                        </td>
                      </tr>

                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">Sex:</td>
                        <td className="px-4 text-gray-700">
                          <input
                            {...register("sex", { required: true })}
                            className="w-full capitalize"
                            onBlur={(e) => resetValueToDefault(e)}
                          />
                        </td>
                      </tr>

                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">
                          Full Address:
                        </td>
                        <td className="px-4 text-gray-700 capitalize">
                          {isUserAddressLoading
                            ? "Loading..."
                            : `Brgy.${userAddress?.address_barangay?.name}, ${userAddress?.address_city?.name}, ${userAddress?.address_province?.name}`}
                        </td>
                      </tr>

                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">Brangay:</td>
                        <td className="px-4 text-gray-700 capitalize">
                          {isUserAddressLoading
                            ? "Loading..."
                            : `${userAddress?.address_barangay?.name}`}
                        </td>
                      </tr>

                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">Role:</td>
                        <td className="px-4 text-gray-700">{user.role}</td>
                      </tr>

                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">Email:</td>
                        <td className="px-4 text-gray-700">
                          <input
                            {...register("email", { required: true })}
                            className="w-full"
                            onBlur={(e) => resetValueToDefault(e)}
                          />
                        </td>
                      </tr>

                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">Joined:</td>
                        <td className="px-4 text-gray-700 capitalize">
                          {formatJoinedDate(new Date(user.created_at))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
              <IconButton
                icon={faPen}
                onClick={() => alert("Not yet implemented")}
              >
                Update
              </IconButton>
            </div>
          </div>
        </div>

        <div className="w-full rounded-md border border-gray-300">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-100">
                <td
                  colSpan={5}
                  className="font-sora px-4 py-2 text-xl font-semibold text-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faPaw} className="-rotate-12" />
                    Pets
                  </div>
                </td>
              </tr>
              <tr className="w-full rounded-sm bg-gray-100">
                <th className="px-4 text-left">ID</th>
                <th className="text-left">Name</th>
                <th className="text-left">Species</th>
                <th className="text-left">Status</th>
                <th className="text-left">Date Registered</th>
              </tr>
            </thead>
            <tbody>
              {petsLoading ? (
                <tr>
                  <td>Loading...</td>
                </tr>
              ) : (
                userPets?.map((pet) => (
                  <tr
                    onClick={() => {
                      navigate(`/pet-management/${pet.public_id}`);
                    }}
                    key={pet.public_id}
                    className="cursor-pointer border-b border-gray-300 px-4 transition-colors duration-75 hover:bg-gray-100"
                  >
                    <td className="flex gap-2 px-4 py-2">{pet.public_id}</td>
                    <td>{pet.name}</td>
                    <td className="capitalize">{pet.pet_type}</td>
                    <td>
                      <div className="flex">
                        <StatusBadge status={pet.status?.name}>
                          {pet.status?.name}
                        </StatusBadge>
                      </div>
                    </td>
                    <td>{formatJoinedDate(new Date(pet.created_at))}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UserDetailsPage;

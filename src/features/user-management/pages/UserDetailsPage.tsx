import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { getUserProfile } from "../../user-profile/services/getUserProfile";
import { getUserAvatar } from "../../user-profile/services";
import IconButton from "../../../shared/components/IconButton";
import {
  faClose,
  faCopy,
  faPaw,
  faPen,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import formatJoinedDate from "../../../shared/services/formatJoinedDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import copyText from "../../../utils/copyText";
import { useEffect, useState } from "react";
import getUserAddress from "../../user-profile/services/getUserAddress";
import getUserPets from "../../pet-management/services/getUserPets";
import StatusBadge from "../../pet-management/components/StatusBadge";
import useUpdateUser from "../../user-profile/hooks/useUpdateUser";
import type { UserSex } from "../../user-profile/types";
import useDeleteAccount from "../hooks/useDeleteAccount";

function UserDetailsPage() {
  const params = useParams();
  const userPublicId = params.userId;
  const { setUserId, register, handleSubmit, submit, reset, updating } =
    useUpdateUser();
  const deleteAccount = useDeleteAccount();
  const navigate = useNavigate();
  const userSex: UserSex[] = ["Male", "Female", "Other"];
  const [editDetails, setEditDetails] = useState<boolean>(false);

  const { data: user, isPending } = useQuery({
    queryKey: ["singleUser", userPublicId],
    queryFn: () => getUserProfile(null, userPublicId ?? null),
  });

  useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name,
        last_name: user.last_name,
        birth_date: user.birth_date,
        email: user.email,
        contact_number: user.contact_number,
        sex: user.sex,
      });

      setUserId(user.id);
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

  const toggleEditDetails = () => {
    if (editDetails) {
      setEditDetails(false);
    } else {
      setEditDetails(true);
    }
  };

  const handleUpdate = () => {
    handleSubmit((data) => submit(data))();
  };

  const handleDeleteUser = () => {
    const conf = confirm("Are you sure you want to delete this account?");
    if (!conf) return;

    if (!user) throw new Error("No user id");
    deleteAccount.mutate(new Set([user.id]), {
      onSuccess: () => alert("Account successfully deleted!"),
      onError: (e) => alert("Failed to delete account!: " + e),
    });
  };

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
                          <div className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FontAwesomeIcon icon={faUser} />
                              Details
                            </div>
                            {editDetails ? (
                              <FontAwesomeIcon
                                icon={faClose}
                                size="lg"
                                onClick={() => toggleEditDetails()}
                                className="text-accent rounded-sm p-1 transition-colors duration-100 hover:bg-red-200"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faPen}
                                size="lg"
                                onClick={() => toggleEditDetails()}
                                className="rounded-sm p-1 transition-colors duration-100 hover:bg-gray-300"
                              />
                            )}
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
                            className="w-full outline-hidden"
                            onBlur={(e) => resetValueToDefault(e)}
                            readOnly={!editDetails}
                          />
                        </td>
                      </tr>

                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">Last Name:</td>
                        <td className="px-4 text-gray-700">
                          <input
                            {...register("last_name", { required: true })}
                            className="w-full capitalize outline-hidden"
                            onBlur={(e) => resetValueToDefault(e)}
                            readOnly={!editDetails}
                          />
                        </td>
                      </tr>

                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">Birth Date:</td>
                        <td className="px-4 text-gray-700">
                          <input
                            {...register("birth_date")}
                            className="w-full outline-hidden"
                            onBlur={(e) => resetValueToDefault(e)}
                            placeholder="YYYY-MM-DD"
                            type="date"
                            readOnly={!editDetails}
                          />
                        </td>
                      </tr>

                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">Sex:</td>
                        <td className="px-4 text-gray-700">
                          {editDetails ? (
                            <select {...register("sex")}>
                              <option value={""}>
                                -- Please select your sex --
                              </option>
                              {userSex.map((sex) => (
                                <option key={sex} value={sex}>
                                  {sex}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              {...register("sex")}
                              className="w-full outline-hidden"
                              onBlur={(e) => resetValueToDefault(e)}
                              readOnly={!editDetails}
                            />
                          )}
                        </td>
                      </tr>

                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">Email:</td>
                        <td className="px-4 text-gray-700">
                          <input
                            {...register("email", { required: true })}
                            className="w-full outline-hidden"
                            onBlur={(e) => resetValueToDefault(e)}
                          />
                        </td>
                      </tr>

                      <tr className="border-b border-gray-300">
                        <td className="px-4 py-2 text-gray-500">Phone:</td>
                        <td className="px-4 text-gray-700">
                          <input
                            {...register("contact_number")}
                            className="w-full outline-hidden"
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
                        <td className="px-4 py-2 text-gray-500">Role:</td>
                        <td className="px-4 text-gray-700">{user.role}</td>
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

              <div className="flex gap-4">
                <IconButton
                  icon={faTrash}
                  variant="danger"
                  onClick={handleDeleteUser}
                  disabled={deleteAccount.isPending}
                >
                  Delete
                </IconButton>
                <IconButton
                  icon={faPen}
                  onClick={handleUpdate}
                  disabled={!editDetails || updating}
                >
                  Update
                </IconButton>
              </div>
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
                        <StatusBadge status={pet.status ?? "registered"} />
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

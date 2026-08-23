import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getUserProfile } from "../../user-profile/services/getUserProfile";
import { getUserAvatar } from "../../user-profile/services";
import IconButton from "../../../shared/components/IconButton";
import { faCopy, faPen } from "@fortawesome/free-solid-svg-icons";
import formatJoinedDate from "../../../shared/services/formatJoinedDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import copyText from "../../../utils/copyText";
import { useForm } from "react-hook-form";
import type { UserProfile } from "../../user-profile/types";
import { useEffect } from "react";
import getUserAddress from "../../user-profile/services/getUserAddress";

function UserDetailsPage() {
  const params = useParams();
  const userPublicId = params.userId;
  const { register, reset } = useForm<UserProfile>();

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

  if (isPending || !user) return <div>Loading...</div>;
  return (
    <>
      <div className="font-inter flex w-full flex-col items-start p-4 text-base">
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
                          Details
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
      </div>
    </>
  );
}

export default UserDetailsPage;

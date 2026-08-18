import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileIcon from "../../user-profile/components/ProfileIcon";
import { cn } from "../../../utils/cn";
import type { Database } from "../../../shared/types/database.types";
import { useQuery } from "@tanstack/react-query";
import getUserAddress from "../../user-profile/services/getUserAddress";
import getAge from "../../user-profile/services/getAge";
import formatJoinedDate from "../../user-profile/services/formatJoinedDate";

interface Props extends React.HTMLAttributes<HTMLElement> {
  userProfile: Database["public"]["Tables"]["profiles"]["Row"];
}

function UserCard({ userProfile, className }: Props) {
  const { data: userAddress, isPending: isUserAddressLoading } = useQuery({
    queryKey: ["userAddress", userProfile.id],
    queryFn: () => getUserAddress(userProfile.id),
    enabled: !!userProfile.id,
  });

  const { data: userAge } = useQuery({
    queryKey: ["userAge", userProfile.id],
    queryFn: () => getAge(userProfile.birth_date),
    enabled: !!userProfile.id,
  });

  if (!userProfile) return <div>No User Profile</div>;
  return (
    <>
      <div
        className={cn(
          "flex items-center gap-x-12 rounded-sm border-2 border-gray-300 px-12 py-8 text-base",
          className,
        )}
      >
        <ProfileIcon className="h-24 w-24" iconSize="3x" />
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col items-start">
            <h2 className="font-sora text-2xl font-semibold">
              {userProfile.first_name + " " + userProfile.last_name}
            </h2>
            <span className="bg-secondary flex items-center justify-center rounded-sm px-4 py-1 text-white capitalize">
              {userProfile.role}
            </span>
          </div>
          <div className="flex items-center justify-start gap-x-4 text-gray-600 capitalize">
            <div className="flex items-center gap-x-2">
              <FontAwesomeIcon
                icon={faLocationDot}
                size="lg"
                className="text-secondary"
              />
              <p>
                {!isUserAddressLoading
                  ? `Brgy. ${userAddress?.address_barangay?.name || "\x2d"}, ${userAddress?.address_city?.name || "\x2d"} ${userAddress?.address_province?.name || "\x2d"}`
                  : "Loading..."}
              </p>
            </div>
            <p>•</p>
            <p>Joined: {formatJoinedDate(new Date(userProfile.created_at))}</p>
            <p>•</p>
            <p>{userProfile.sex || "\x2d"}</p>
            <p>•</p>
            <p>{userAge || "\x2d"} Years Old</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCard;

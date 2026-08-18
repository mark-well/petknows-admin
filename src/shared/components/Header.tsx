import { useState } from "react";
import ProfileDropdown from "../../features/user-profile/components/ProfileDropdown";
import ProfileIcon from "../../features/user-profile/components/ProfileIcon";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../auth/providers/useAuth";
import { getMaoName } from "../../features/mao/services";

function Header() {
  const { userProfile } = useAuth();
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
    useState<boolean>(false);
  const { data: maoName, isPending: isMaoNamePending } = useQuery({
    queryKey: ["maoName", userProfile?.id],
    queryFn: () => getMaoName(userProfile?.admin_at ?? null),
    enabled: !!userProfile?.id,
  });

  const toggleProfileDropdown = () => {
    if (isProfileDropdownVisible) {
      setIsProfileDropdownVisible(false);
    } else {
      setIsProfileDropdownVisible(true);
    }
  };

  return (
    <>
      <div className="font-inter flex items-center justify-between border-b-2 border-gray-300 px-12 py-2 text-base">
        <div className="flex items-center gap-x-4">
          <img src="/logo.png" alt="PetKnows logob" width="48" height="48" />
          <div className="flex flex-col gap-0">
            <div className="flex items-center gap-x-2">
              <p className="font-sora text-secondary text-xl">PetKnows</p>
              <p className="text-sm text-gray-600">Admin</p>
            </div>
            <h1 className="font-sora text-text text-base">
              {isMaoNamePending ? "Loading..." : maoName?.name} &#45; Municipal
              Agriculture Office
            </h1>
          </div>
        </div>
        <ProfileIcon
          onClick={toggleProfileDropdown}
          className="h-8 w-8 cursor-pointer"
        />
      </div>
      {isProfileDropdownVisible && (
        <ProfileDropdown onClose={() => setIsProfileDropdownVisible(false)} />
      )}
    </>
  );
}

export default Header;

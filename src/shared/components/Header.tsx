import { useState } from "react";
import ProfileDropdown from "../../features/user-profile/components/ProfileDropdown";
import ProfileIcon from "../../features/user-profile/components/ProfileIcon";

function Header() {
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState<boolean>(false);

  const toggleProfileDropdown = () => {
    if (isProfileDropdownVisible) {
      setIsProfileDropdownVisible(false);
    } else {
      setIsProfileDropdownVisible(true);
    }
  };

  return (
    <>
      <div className="flex justify-between px-12 text-base font-inter py-2 items-center border-b-2 border-gray-300">
        <div className="flex items-center gap-x-4">
          <img src="/logo.png" alt="PetKnows logob" width="48" height="48" />
          <div className="flex flex-col gap-0">
            <div className="flex gap-x-2 items-center">
              <p className="font-sora text-xl text-secondary">PetKnows</p>
              <p className="text-sm text-gray-600">Admin</p>
            </div>
            <h1 className="font-sora text-base text-text">Mabitac - Municipal Agriculture Office</h1>
          </div>
        </div>
        <ProfileIcon onClick={toggleProfileDropdown} />
      </div>
      {isProfileDropdownVisible && <ProfileDropdown onClose={() => setIsProfileDropdownVisible(false)} />}
    </>
  );
}

export default Header;

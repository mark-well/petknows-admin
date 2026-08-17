import { useEffect, useRef } from "react";
import ProfileIcon from "./ProfileIcon";
import { faArrowRightFromBracket, faGear } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../auth/providers/useAuth";
import { useNavigate } from "react-router";
import PdIconButton from "./PdIconButton";

type Props = {
  onClose: () => void;
};

function ProfileDropdown({ onClose }: Props) {
  const { signOut, userProfile } = useAuth();
  const navigate = useNavigate();
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Sign the user out
  const handleSignout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div
        ref={dropDownRef}
        className="w-64 p-4 flex flex-col gap-2 bg-primary border-gray-300 border-2 absolute rounded-sm right-12 top-14 z-20 shadow-sm animate-in fade-in slide-in-from-top-5 duration-200"
      >
        <div className="flex gap-x-2 items-center">
          <ProfileIcon size="w-8 h-8" />
          <div className="flex flex-col">
            <p className="text-text text-sm">{userProfile?.first_name + " " + userProfile?.last_name}</p>
            <p className="text-xs text-gray-600">{userProfile?.email}</p>
          </div>
        </div>
        <div className="h-px w-full bg-gray-300" />
        <PdIconButton text="Settings" icon={faGear} />
        <PdIconButton text="Log Out" icon={faArrowRightFromBracket} onClick={handleSignout} />
      </div>
    </>
  );
}

export default ProfileDropdown;

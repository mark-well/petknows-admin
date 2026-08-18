import { useEffect, useRef } from "react";
import ProfileIcon from "./ProfileIcon";
import {
  faArrowRightFromBracket,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
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
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
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
        className="bg-primary animate-in fade-in slide-in-from-top-5 absolute top-14 right-12 z-20 flex w-64 flex-col gap-2 rounded-sm border-2 border-gray-300 p-4 shadow-sm duration-200"
      >
        <div className="flex items-center gap-x-2">
          <ProfileIcon className="h-8 w-8" />
          <div className="flex flex-col">
            <p className="text-text text-sm">
              {userProfile?.first_name + " " + userProfile?.last_name}
            </p>
            <p className="text-xs text-gray-600">{userProfile?.email}</p>
          </div>
        </div>
        <div className="h-px w-full bg-gray-300" />
        <PdIconButton text="Settings" icon={faGear} />
        <PdIconButton
          text="Log Out"
          icon={faArrowRightFromBracket}
          onClick={handleSignout}
        />
      </div>
    </>
  );
}

export default ProfileDropdown;

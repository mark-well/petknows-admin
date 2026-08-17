import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

type Props = {
  size?: "w-12 h-12" | "w-8 h-8" | "w-6 h-6";
  onClick?: () => void;
};

function ProfileIcon({ size, onClick }: Props) {
  return (
    <span
      onClick={onClick}
      className={`rounded-full flex justify-center items-center ${size || "w-8 h-8"} bg-gray-300 border-2 border-secondary`}
    >
      <FontAwesomeIcon icon={faUser} color="#A3A3A3" size="sm" />
    </span>
  );
}

export default ProfileIcon;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { cn } from "../../../utils/cn";

interface Props extends React.HTMLAttributes<HTMLElement> {
  size?: "w-12 h-12" | "w-8 h-8" | "w-6 h-6";
  onClick?: () => void;
}

function ProfileIcon({ size, onClick, className }: Props) {
  return (
    <span
      onClick={onClick}
      className={cn(
        `flex items-center justify-center rounded-full ${size || "h-8 w-8"} border-secondary border-2 bg-gray-300`,
        className,
      )}
    >
      <FontAwesomeIcon icon={faUser} color="#A3A3A3" size="sm" />
    </span>
  );
}

export default ProfileIcon;

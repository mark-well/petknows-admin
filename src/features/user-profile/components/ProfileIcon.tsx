import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { cn } from "../../../utils/cn";
import type { SizeProp } from "@fortawesome/fontawesome-svg-core";

interface Props extends React.HTMLAttributes<HTMLElement> {
  iconSize?: SizeProp;
  onClick?: () => void;
}

function ProfileIcon({ iconSize = "sm", onClick, className }: Props) {
  return (
    <span
      onClick={onClick}
      className={cn(
        `border-secondary flex aspect-square items-center justify-center rounded-full border-2 bg-gray-300`,
        className,
      )}
    >
      <FontAwesomeIcon icon={faUser} color="#A3A3A3" size={iconSize} />
    </span>
  );
}

export default ProfileIcon;

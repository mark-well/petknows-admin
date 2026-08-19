import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "../../utils/cn";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props extends React.HTMLAttributes<HTMLElement> {
  icon: IconProp;
  variant?: "primary" | "danger";
  onClick?: () => void;
}

function IconButton({
  icon,
  variant = "primary",
  onClick,
  children,
  className,
}: Props) {
  if (variant === "danger") {
    return (
      <>
        <button
          className={cn(
            "flex items-center justify-center gap-x-2 rounded-md bg-red-400 px-3 text-base text-white transition-colors duration-75 hover:bg-red-300",
            className,
          )}
          onClick={onClick}
        >
          <FontAwesomeIcon icon={icon} size="sm" />
          {children}
        </button>
      </>
    );
  }

  return (
    <>
      <button
        className={cn(
          "bg-accent flex items-center justify-center gap-x-2 rounded-md px-3 py-2 text-base text-white transition-colors duration-75 hover:bg-[hsl(0_88%_40%)]",
          className,
        )}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={icon} size="sm" />
        {children}
      </button>
    </>
  );
}

export default IconButton;

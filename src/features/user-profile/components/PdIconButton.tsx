import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  text?: string;
  icon?: IconProp;
  onClick?: () => void;
};

function PdIconButton({ text = "Text", icon = faGear, onClick }: Props) {
  return (
    <>
      <div
        onClick={onClick}
        className="flex gap-x-2 px-3 py-2 items-center justify-start border border-transparent rounded-sm hover:border-secondary hover:bg-[hsl(19_100_94)] transition-colors duration-75 group cursor-pointer"
      >
        <FontAwesomeIcon icon={icon} className="group-hover:text-secondary" />
        <p className="text-text text-sm group-hover:text-secondary">{text}</p>
      </div>
    </>
  );
}

export default PdIconButton;

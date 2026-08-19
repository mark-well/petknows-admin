import { faCheck, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  checked?: boolean;
  partial?: boolean;
  onChange?: (checked: boolean) => void;
}

export default function Checkbox({
  checked = false,
  partial = false,
  onChange,
}: Props) {
  return (
    <>
      <label className="group h-6 w-6 shrink-0 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={`border-text ${checked || partial ? "bg-text" : ""} flex h-6 w-6 shrink-0 rounded-sm border p-1`}
        >
          {checked && (
            <FontAwesomeIcon icon={faCheck} className="text-white" size="sm" />
          )}

          {partial && !checked && (
            <FontAwesomeIcon icon={faMinus} className="text-white" size="sm" />
          )}
        </span>
      </label>
    </>
  );
}

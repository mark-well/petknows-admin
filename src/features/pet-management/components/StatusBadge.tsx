import type { Database } from "../../../shared/types/database.types";

type PetStatus = Database["public"]["Enums"]["pet_status"];
const statusConfig = {
  registered: {
    label: "Registered",
    backgroundColor: "hsl(133 66% 82%)",
    color: "hsl(133 66% 32%)",
  },

  missing: {
    label: "Missing",
    backgroundColor: "hsl(0 89% 82%)",
    color: "hsl(0 89% 32%)",
  },
};

interface Props {
  status: PetStatus;
}

function StatusBadge({ status }: Props) {
  const config = statusConfig[status];

  return (
    <div
      className={`rounded-md px-2 py-1 text-center capitalize`}
      style={{ backgroundColor: config.backgroundColor }}
    >
      <p style={{ color: config.color }}>{config.label}</p>
    </div>
  );
}

export default StatusBadge;

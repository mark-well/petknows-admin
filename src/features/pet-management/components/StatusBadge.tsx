import type React from "react";

interface Props {
  children?: React.ReactNode;
  status?: string | null;
}

function StatusBadge({ status = "registered", children }: Props) {
  const normalizedStatus = status?.toLowerCase() ?? "unknown";

  if (normalizedStatus === "missing") {
    return (
      <div
        className={`rounded-sm bg-red-100 px-2 py-1 text-center text-red-700 capitalize`}
      >
        {children}
      </div>
    );
  }
  return (
    <div
      className={`rounded-sm bg-green-100 px-2 py-1 text-center text-green-700 capitalize`}
    >
      {children}
    </div>
  );
}

export default StatusBadge;

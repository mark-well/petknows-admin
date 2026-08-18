import { cn } from "../../../utils/cn";

interface Props extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  value?: number | string;
}

function StatCard({ title = "Title", value = "Value", className }: Props) {
  return (
    <>
      <div
        className={cn(
          "bg-primary w-66 flex-1 rounded-sm border-2 border-gray-300",
          className,
        )}
      >
        <div className="rounded-t-sm border-b-2 border-gray-300 bg-gray-100 px-4 py-2">
          <p className="font-sora text-lg">{title}</p>
        </div>
        <div className="p-4">
          <p className="font-sora text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </>
  );
}

export default StatCard;

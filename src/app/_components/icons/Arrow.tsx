import cn from "@/utils/cn";

const Arrow = ({
  className,
  direction = "right",
}: {
  className?: string;
  direction?: "right" | "left" | "up" | "down";
}) => {
  return (
    <svg
      className={cn(
        {
          "rotate-0": direction === "right",
          "-rotate-90": direction === "up",
          "rotate-90": direction === "down",
          "rotate-180": direction === "left",
        },
        className,
      )}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
};

export default Arrow;

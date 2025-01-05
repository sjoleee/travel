import cn from "@/utils/cn";

const Title = ({
  description,
  className,
  children,
}: {
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="flex flex-col gap-0.5">
      <h1 className={cn("whitespace-pre-wrap text-xl font-bold", className)}>{children}</h1>
      {description && <span className="text-xs text-gray-500">{description}</span>}
    </div>
  );
};

export default Title;

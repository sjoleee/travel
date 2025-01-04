import { Button, type ButtonProps } from "../Button";

import cn from "@/utils/cn";

const CTA = ({ className, size = "lg", ...props }: ButtonProps) => {
  return <Button className={cn("w-full", className)} size={size} {...props} />;
};

export default CTA;

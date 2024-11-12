import { cn } from "@/lib/cn";
import { ComponentPropsWithoutRef } from "react";

export const Label = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"label">) => {
  return (
    <label
      className={cn(
        " mb-[4px] text-gray font-medium text-[14px] leading-[17px] capitalize ",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
};

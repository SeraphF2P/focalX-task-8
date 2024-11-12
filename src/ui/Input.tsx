import { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../lib/cn";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  label?: ReactNode;
};

export const Input = ({ label, className, ...props }: InputProps) => {
  return (
    <div className=" flex   flex-col justify-end gap-[6px]  w-full ">
      {label ? label : <></>}
      <input
        className={cn(
          " px-2 placeholder:text-[12px] max-md:text-[14px]  max-md:h-[33px] max-md:placeholder:text-[10px]  placeholder:text-gray-placeholder leading-[15px] rounded h-[44px] w-full border border-gray-border ",
          className
        )}
        {...props}
      />
    </div>
  );
};

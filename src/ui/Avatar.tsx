import { ComponentPropsWithoutRef } from "react";
import { cn } from "../lib/cn";

type AvatarProps = ComponentPropsWithoutRef<"img"> & {};

export const Avatar = ({ className, ...props }: AvatarProps) => {
  return (
    <div className={cn("relative overflow-hidden rounded-full", className)}>
      <img
        className=" inset-0 absolute size-full object-cover"
        alt="user profile's picture"
        {...props}
      />
    </div>
  );
};

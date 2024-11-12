import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { cn } from "../lib/cn";

type BtnProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary";
};

export const Btn = forwardRef<ElementRef<"button">, BtnProps>(
  ({ className, variant = "primary", ...props }, forwardedRef) => {
    return (
      <button
        ref={forwardedRef}
        {...props}
        className={cn(
          " bg-primary disabled:opacity-30   disabled:cursor-not-allowed  hover:bg-primary-accent transition-colors  text-white rounded h-11 ",
          {
            " bg-primary hover:bg-primary-accent transition-colors  text-white rounded  uppercase":
              variant === "primary",
            " bg-secondary hover:bg-[rgb(234,0,0)] transition-colors  text-white rounded  ":
              variant === "secondary",
          },
          className
        )}
      >
        {props.children}
      </button>
    );
  }
);

import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";
import { twMerge as tw } from "tailwind-merge";

interface InputPropTypes extends ComponentPropsWithRef<"input"> {
  label: string;
  errorMessage: string | undefined;
}

export const Input = forwardRef<HTMLInputElement, InputPropTypes>(
  ({ label, id, placeholder = "", className, errorMessage, ...props }, ref) => {
    return (
      <div className={tw("gap flex w-full flex-col justify-end", className)}>
        <label htmlFor={id} className="px-2 py-1.5 font-semibold">
          {label}
        </label>
        <input
          placeholder={placeholder}
          className={tw(
            "bg-white rounded-lg border p-4 no-spinners",
            errorMessage && "border-red-600",
          )}
          id={id}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";

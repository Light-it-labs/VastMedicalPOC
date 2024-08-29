import React from "react";
import { twMerge as tw } from "tailwind-merge";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, children, ...otherProps }: ButtonProps) => {
  return (
    <button
      className={tw(
        "rounded-md border-2 border-[#07284A] px-8 py-2 text-center font-bold text-[#07284A] transition-all hover:bg-[#07284A] hover:font-normal hover:text-[white]",
        className,
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
};
export { Button };

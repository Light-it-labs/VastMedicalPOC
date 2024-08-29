import React from "react";
import { twMerge as tw } from "tailwind-merge";
import Spinner from "~/ui/Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  isLoading?: boolean;
}

const Button = ({ className, children, variant, isLoading = false, ...otherProps }: ButtonProps) => {
  const getClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-[#0B406F] border-[#0B406F] text-white hover:bg-white hover:font-normal hover:text-[#0B406F]";
      case "secondary":
        return "border-[#07284A] text-[#07284A]  hover:bg-[#07284A] hover:font-normal hover:text-[white]";
      default:
        return "";
    }
  }
  return (
    <button
      className={tw(
        "rounded-md border-2  px-8 py-2 text-center font-bold transition-all disabled:border-[#6B7280] disabled:bg-[#6B7280] disabled:text-white disabled:font-bold",
        getClasses(),
        className,
      )}
      {...otherProps}
    >
      {!isLoading ? children : <Spinner className="h-6" />}
    </button>
  );
};
export { Button };

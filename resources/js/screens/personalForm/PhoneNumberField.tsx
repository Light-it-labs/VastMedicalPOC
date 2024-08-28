import { forwardRef } from "react";
import { FlagImage, usePhoneInput } from "react-international-phone";
import { twMerge as tw } from "tailwind-merge";

interface InputPropTypes extends React.ComponentPropsWithRef<"input"> {
  label: string;
  errorMessage: string | undefined;
  value: string;
}

export const PhoneNumberField = forwardRef<HTMLInputElement, InputPropTypes>(
  (
    { label, id, placeholder = "", className, errorMessage, value, ...props },
    ref,
  ) => {
    const { inputRef, country, inputValue, handlePhoneValueChange } =
      usePhoneInput({
        value: value,
        defaultCountry: "us",
      });

    const combinedRef = (el: HTMLInputElement) => {
      inputRef.current = el;
      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    };

    return (
      <div className={tw("gap flex w-full flex-col", className)}>
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center pr-3">
            <FlagImage iso2={country.iso2} />
          </div>
          <input
            type="tel"
            placeholder={placeholder}
            className={tw(
              "w-full rounded-lg border bg-white p-4 pl-16 no-spinners",
              errorMessage && "border-red-600",
            )}
            id={id}
            ref={combinedRef}
            value={inputValue}
            onChange={handlePhoneValueChange}
            {...props}
          />
        </div>
      </div>
    );
  },
);

PhoneNumberField.displayName = "PhoneNumberField";

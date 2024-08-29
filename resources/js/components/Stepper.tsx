import React from "react";
import { twMerge as tw } from "tailwind-merge";

interface StepperPropType {
  steps: number[];
  currentStep: number;
}

const Stepper = ({ steps, currentStep }: StepperPropType) => {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <div
              className={tw(
                " flex-auto border transition duration-500 ease-in-out",
                currentStep >= step && "border-[#B9DFFE]",
              )}
            />
          )}
          <div
            className={tw(
              "flex h-8 w-8 items-center justify-center rounded-full text-sm text-[#07284A]",
              currentStep >= step ? "bg-[#B9DFFE]" : "bg-gray-200",
            )}
          >
            {step}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;

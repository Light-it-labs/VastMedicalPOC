import type { ComponentType } from "react";
import Stepper from "~/components/Stepper";
import { useMultiStepFormStore } from "~/stores";

import { InsuranceForm } from "./insuranceForm/InsuranceForm";
import { MedicalInformationForm } from "./MedicalInformationForm";
import { PersonalForm } from "./personalForm";

const stepComponents: Record<number, ComponentType> = {
  1: MedicalInformationForm,
  2: InsuranceForm,
  3: PersonalForm,
};

const MultiStepForm = () => {
  const { currentFormStep } = useMultiStepFormStore();

  const steps = Object.keys(stepComponents).map(Number);
  const StepComponent = stepComponents[currentFormStep];

  return (
    <div className="mx-auto mt-8 flex w-2/3 flex-col gap-12">
      <div className="flex flex-col gap-5 text-center">
        <h1 className="text-3xl  text-[#07284A] ">
          Get started with your{" "}
          <b className="text-[#0C8FEB]">Freestyle Libre CGM System</b> today.
        </h1>
        <p className="text-[#07284A]">
          Complete the form to help us determine if the Freestyle Libre CGM
          System is suitable for you or your loved one.
        </p>
      </div>
      <Stepper steps={steps} currentStep={currentFormStep} />
      {StepComponent ? <StepComponent /> : <div>Step not found</div>}
    </div>
  );
};

export default MultiStepForm;

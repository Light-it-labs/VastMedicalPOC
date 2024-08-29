import { zodResolver } from "@hookform/resolvers/zod";
import { StethoscopeIcon } from "~/components/icons/StethoscopeIcon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/Select";
import { useMultiStepFormStore } from "~/stores";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { twMerge as tw } from "tailwind-merge";
import { z } from "zod";

const DIABETES_TYPES = [
  { id: 1, value: "none", label: "None" },
  { id: 1, value: "type-1", label: "Type 1" },
  { id: 1, value: "type-2", label: "Type 2" },
  { id: 1, value: "type-3", label: "Gestational" },
];

const DIABETES_MANAGEMENT = [
  { id: 1, value: "none", label: "None" },
  { id: 1, value: "po", label: "Pills only" },
  { id: 1, value: "mi", label: "Multiple insulin injections" },
  { id: 1, value: "pt", label: "Insulin using pump therapy" },
  { id: 1, value: "om", label: "Oral medication" },
];

const MedicalInformationFormSchema = z.object({
  diabetesType: z.string().min(1, { message: "Diabetes type is required" }),
  diabetesTreatment: z
    .string()
    .min(1, { message: "Diabetes treatment is required" }),
});

export type MedicalInformationFormInputType = z.infer<
  typeof MedicalInformationFormSchema
>;

export const MedicalInformationForm = () => {
  const { setMultiStepFormData, multiStepFormData, goToNextFormStep } =
    useMultiStepFormStore();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MedicalInformationFormInputType>({
    resolver: zodResolver(MedicalInformationFormSchema),
    defaultValues: {
      diabetesType: multiStepFormData?.medicalInformationFormData?.diabetesType,
      diabetesTreatment:
        multiStepFormData?.medicalInformationFormData?.diabetesTreatment,
    },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<MedicalInformationFormInputType> = (data) => {
    setMultiStepFormData({ medicalInformationFormData: data });
    goToNextFormStep();
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-52">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 ">
              <StethoscopeIcon />
              <p className=" font-extrabold">Medical information</p>
            </div>
            <p className="text-sm font-extrabold text-[#6B7280]">
              All fields are required
            </p>
          </div>
          <p className="text-[#6B7280]">
            Do you currently treat your diabetes with any type of insulin?
          </p>
          <div className="flex justify-between gap-4">
            <Controller
              control={control}
              name="diabetesTreatment"
              render={({ field }) => (
                <SelectGroup className="w-full">
                  <SelectLabel className="mb-1 font-semibold">
                    Diabetes treatment
                  </SelectLabel>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select diabetes treatment" />
                    </SelectTrigger>
                    <SelectContent>
                      {DIABETES_MANAGEMENT.map(({ id, label, value }) => {
                        return (
                          <SelectItem key={`${id}${value}`} value={value}>
                            {label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </SelectGroup>
              )}
            />
            <Controller
              control={control}
              name="diabetesType"
              render={({ field }) => (
                <SelectGroup className="w-full">
                  <SelectLabel className="mb-1 font-semibold">
                    Diabetes type
                  </SelectLabel>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select diabetes type" />
                    </SelectTrigger>
                    <SelectContent>
                      {DIABETES_TYPES.map(({ id, label, value }) => {
                        return (
                          <SelectItem key={`${id}${value}`} value={value}>
                            {label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </SelectGroup>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className={tw(
              "w-1/4 rounded-md bg-[#0B406F]  px-8 py-2 text-center text-white",
            )}
            type="submit"
            onClick={() => {
              console.log(errors);
            }}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

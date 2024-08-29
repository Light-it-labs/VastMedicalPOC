import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldIcon } from "~/components/icons/ShieldIcon";
import { Input } from "~/components/Input";
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

const PLAN_TYPE = [
  {
    id: 1,
    value: "medicare",
    label: "Medicare (I have a red, white and blue card only)",
  },
  {
    id: 2,
    value: "medicare-advantage",
    label: "Medicare Advantage (Medicare with and Advantage plan)",
  },
  { id: 3, value: "medicaid", label: "Medicaid" },
  {
    id: 4,
    value: "private-insurance",
    label: "Private insurance (ie UHC, BCBS, Humana, etc.)",
  },
];

const InsuranceFormSchema = z.object({
  insuranceType: z.string().min(1, { message: "Insurance plan is required" }),
  insuranceProvider: z.string().optional(),
  rxNumber: z.string().optional(),
  binNumber: z.string().optional(),
});

export type InsuranceFormInputType = z.infer<typeof InsuranceFormSchema>;

export const InsuranceForm = () => {
  const {
    goToPreviousFormStep,
    setMultiStepFormData,
    multiStepFormData,
    goToNextFormStep,
  } = useMultiStepFormStore();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    watch,
  } = useForm<InsuranceFormInputType>({
    resolver: zodResolver(InsuranceFormSchema),
    defaultValues: {
      insuranceType: multiStepFormData?.insuranceFormData?.insuranceType,
      insuranceProvider:
        multiStepFormData?.insuranceFormData?.insuranceProvider,
      rxNumber: multiStepFormData?.insuranceFormData?.rxNumber,
      binNumber: multiStepFormData?.insuranceFormData?.binNumber,
    },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<InsuranceFormInputType> = (data) => {
    setMultiStepFormData({ insuranceFormData: data });
    goToNextFormStep();
  };
  const isPrivateInsurance = watch("insuranceType") === "private-insurance";
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <ShieldIcon />
          <p className=" font-extrabold">Insurance information</p>
        </div>
        <p className="text-sm font-extrabold text-[#6B7280]">
          All fields are required
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        <div className="flex justify-between gap-4">
          <Controller
            control={control}
            name="insuranceType"
            render={({ field }) => (
              <SelectGroup className="w-full">
                <SelectLabel className=" font-semibold">
                  Insurance type
                </SelectLabel>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your insurance type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PLAN_TYPE.map(({ id, label, value }) => {
                      return (
                        <SelectItem
                          {...field}
                          key={`${id}${value}`}
                          value={value}
                        >
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
        {isPrivateInsurance && (
          <div>
            <Controller
              control={control}
              name="insuranceProvider"
              render={({ field }) => (
                <SelectGroup className="w-full">
                  <SelectLabel className=" font-semibold">
                    Insurance provider
                  </SelectLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your insurance provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {PLAN_TYPE.map(({ id, label, value }) => {
                        return (
                          <SelectItem
                            {...field}
                            key={`${id}${value}`}
                            value={value}
                          >
                            {label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </SelectGroup>
              )}
            />
            <div className="flex gap-6">
              <Input
                id="rxNumber"
                label="RX Number"
                {...register("rxNumber")}
                errorMessage={errors.rxNumber?.message}
                className="w-1/2"
              />
              <Input
                id="binNumber"
                label="BIN Number"
                {...register("binNumber")}
                errorMessage={errors.binNumber?.message}
                className="w-1/2"
              />
            </div>
          </div>
        )}
        <div className="flex justify-between">
          <button
            className={tw(
              "w-1/4 rounded-md  border border-[#07284A] px-8 py-2 text-center text-[#07284A]",
            )}
            onClick={() => goToPreviousFormStep()}
          >
            Back
          </button>
          <button
            className={tw(
              "text-white w-1/4 rounded-md  bg-[#0B406F] px-8 py-2 text-center",
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

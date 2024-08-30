import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/Button";
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
import Spinner from "~/ui/Spinner";
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

const INSURANCE_PROVIDER = [
  {
    id: 1,
    value: "cigna",
    label: "Cigna",
  },
  {
    id: 2,
    value: "bcbs",
    label: "Blue Cross Blue Shield of Texas",
  },
  { id: 3, value: "uhc", label: "UHC" },
  { id: 3, value: "florida-blue", label: "Florida Blue" },
  {
    id: 4,
    value: "humana",
    label: "Humana",
  },
];

const baseSchema = z.object({
  insuranceType: z.string().min(1, { message: "Insurance plan is required" }),
});

const privateInsuranceSchema = baseSchema.extend({
  insuranceProvider: z
    .string()
    .min(1, { message: "Insurance plan is required" }),
  rxNumber: z.string().min(1, { message: "Insurance plan is required" }),
  binNumber: z.string().min(1, { message: "Insurance plan is required" }),
});

export type InsuranceFormInputType = z.infer<typeof baseSchema>;
export type PrivateInsuranceFormInputType = z.infer<
  typeof privateInsuranceSchema
>;

export const InsuranceForm = () => {
  const [showPrivateInsuranceFields, setShowPrivateInsuranceFields] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    formState: { errors, isValid },
    watch,
  } = useForm<InsuranceFormInputType & PrivateInsuranceFormInputType>({
    resolver: (values, context, options) => {
      const isPrivateInsurance = values.insuranceType === "private-insurance";

      const createResolver = zodResolver(
        isPrivateInsurance ? privateInsuranceSchema : baseSchema,
      );
      return createResolver(values, context, options);
    },
    defaultValues: {
      insuranceType:
        multiStepFormData?.insuranceFormData?.insuranceType ?? undefined,
      insuranceProvider:
        multiStepFormData?.insuranceFormData?.insuranceProvider ?? undefined,
      rxNumber: multiStepFormData?.insuranceFormData?.rxNumber ?? undefined,
      binNumber: multiStepFormData?.insuranceFormData?.binNumber ?? undefined,
    },
    mode: "onSubmit",
  });

  const insuranceType = watch("insuranceType");

  useEffect(() => {
    if (insuranceType === "private-insurance") {
      setIsLoading(true);
      setShowPrivateInsuranceFields(false);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setShowPrivateInsuranceFields(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      setShowPrivateInsuranceFields(false);
    }
  }, [insuranceType]);

  const onSubmit: SubmitHandler<
    InsuranceFormInputType | PrivateInsuranceFormInputType
  > = (data) => {
    setMultiStepFormData({ insuranceFormData: data });
    goToNextFormStep();
  };

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={tw("flex flex-col gap-4")}
      >
        <div className="flex justify-between gap-4">
          <Controller
            control={control}
            name="insuranceType"
            render={({ field }) => (
              <SelectGroup className="w-full">
                <SelectLabel className=" font-semibold">
                  Insurance type
                </SelectLabel>
                <Select {...field} onValueChange={field.onChange}>
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
        {isLoading && (
          <Spinner
            className="h-32 w-32 text-[#0B406F] "
            containerClassName="w-full h-48 flex justify-center"
          />
        )}
        {!isLoading && !showPrivateInsuranceFields && (
          <div className="h-48 w-full"></div>
        )}

        {showPrivateInsuranceFields && (
          <div
            className={tw(
              "flex flex-col gap-4",
              !showPrivateInsuranceFields && "pointer-events-none opacity-0",
            )}
          >
            <Controller
              control={control}
              name="insuranceProvider"
              render={({ field }) => (
                <SelectGroup className="w-full">
                  <SelectLabel className=" font-semibold">
                    Insurance provider
                  </SelectLabel>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your insurance provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {INSURANCE_PROVIDER.map(({ id, label, value }) => {
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
          <Button
            variant="secondary"
            className={tw("w-1/4")}
            onClick={() => goToPreviousFormStep()}
          >
            Back
          </Button>
          <Button
            variant="primary"
            disabled={!isValid}
            className={tw("w-1/4")}
            type="submit"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

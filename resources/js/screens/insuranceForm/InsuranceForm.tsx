import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { checkBenefitsEligibilityQuery } from "~/api/insurance";
import { ShieldIcon } from "~/components/icons/ShieldIcon";
import { StethoscopeIcon } from "~/components/icons/StethoscopeIcon";
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
import { useNavigate } from "react-router-dom";
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
  { id: 1, value: "ni", label: "Non-insulin injections" },
  { id: 1, value: "ii", label: "Insulin injections" },
  { id: 1, value: "ip", label: "Insulin using pump therapy" },
  { id: 1, value: "de", label: " Diet and exercise" },
];

const PLAN_TYPE = [
  { id: 1, value: "medicare", label: "Medicare" },
  { id: 2, value: "medicaid", label: "Medicaid" },
  { id: 3, value: "cigna", label: "Cigna" },
  { id: 4, value: "humana", label: "Humana" },
];

const InsuranceFormSchema = z.object({
  insurancePlan: z.string().min(1, { message: "Insurance plan is required" }),
  memberId: z.string().min(1, { message: "Member Id is required" }),
  diabetesType: z.string().min(1, { message: "Diabetes type is required" }),
  diabetesManagement: z
    .string()
    .min(1, { message: "Diabetes management is required" }),
});

export type InsuranceFormInputType = z.infer<typeof InsuranceFormSchema>;

export const InsuranceForm = () => {
  const { goToPreviousFormStep, setMultiStepFormData, multiStepFormData } =
    useMultiStepFormStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    control,
  } = useForm<InsuranceFormInputType>({
    resolver: zodResolver(InsuranceFormSchema),
    defaultValues: {
      insurancePlan: multiStepFormData?.insuranceFormData?.insurancePlan,
      memberId: multiStepFormData?.insuranceFormData?.memberId,
      diabetesType: multiStepFormData?.insuranceFormData?.diabetesType,
      diabetesManagement:
        multiStepFormData?.insuranceFormData?.diabetesManagement,
    },
    mode: "onSubmit",
  });

  const { mutate: getEligibilityMutation, isPending } = useMutation({
    mutationFn: checkBenefitsEligibilityQuery.mutation,
    onSuccess: (response) => {
      if (!response.is_eligible) {
        return navigate("/discount");
      }
      if (response.benefit === "pharmacy") {
        navigate("/pharmacyBenefit");
      } else {
        navigate("/providersList");
      }
    },
  });

  const onSubmit: SubmitHandler<InsuranceFormInputType> = (data) => {
    setMultiStepFormData({ insuranceFormData: data });
    if (multiStepFormData) {
      getEligibilityMutation({
        firstName: "John",
        lastName: "Doe",
        dob: "02-12-1950",
        memberId: "A234",
      });
    }
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        <div className="flex justify-between gap-4">
          <Controller
            control={control}
            name="insurancePlan"
            render={({ field }) => (
              <SelectGroup className="w-full">
                <SelectLabel className=" font-semibold">
                  Plan name/type
                </SelectLabel>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan" />
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
          <Input
            id="memberId"
            label="Member ID"
            {...register("memberId")}
            errorMessage={errors.memberId?.message}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 ">
              <StethoscopeIcon />
              <p className=" font-extrabold">Medical information</p>
            </div>
            <p className="text-sm font-extrabold text-[#6B7280]">
              All fields are required
            </p>
          </div>
          <div className="flex justify-between gap-4">
            <Controller
              control={control}
              name="diabetesType"
              render={({ field }) => (
                <SelectGroup className="w-full">
                  <SelectLabel className="mb-1 font-semibold">
                    Diabetes type
                  </SelectLabel>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {DIABETES_TYPES.map(({ id, label, value }) => {
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
            <Controller
              control={control}
              name="diabetesManagement"
              render={({ field }) => (
                <SelectGroup className="w-full">
                  <SelectLabel className="mb-1 font-semibold">
                    Current Diabetes management
                  </SelectLabel>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {DIABETES_MANAGEMENT.map(({ id, label, value }) => {
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
        </div>
        <p className="text-sm text-[#6B7280]">
          By continuing, you agree with the{" "}
          <a href="google.com" className="underline">
            Terms & Conditions
          </a>
        </p>
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
              "w-1/4 rounded-md  px-8 py-2 text-center text-white",
              isValid ? "bg-[#0B406F]" : "bg-[#6B7280]",
            )}
            type="submit"
          >
            {isPending ? <Spinner /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

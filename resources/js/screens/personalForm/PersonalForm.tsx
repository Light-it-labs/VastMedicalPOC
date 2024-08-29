import { zodResolver } from "@hookform/resolvers/zod";
import { UserIcon } from "~/components/icons/UserIcon";
import { Input } from "~/components/Input";
import { useMultiStepFormStore } from "~/stores";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { twMerge as tw } from "tailwind-merge";
import { z } from "zod";

import "react-international-phone/style.css";

import { useMutation } from "@tanstack/react-query";
import { checkBenefitsEligibilityQuery } from "~/api/insurance";
import Spinner from "~/ui/Spinner";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  month: z
    .number()
    .min(1, { message: "Month must be between 1 and 12" })
    .max(12, { message: "Month must be between 1 and 12" }),
  day: z
    .number()
    .min(1, { message: "Day must be between 1 and 31" })
    .max(31, { message: "Day must be between 1 and 31" }),
  year: z.number().min(1900, { message: "Year must be after 1900" }).max(2000, {
    message: `Year must be before 2000`,
  }),
  zipCode: z.string().min(1, { message: "Zip code is required" }),
});

export type FormInputType = z.infer<typeof formSchema>;

export const PersonalForm = () => {
  const { setMultiStepFormData, multiStepFormData, goToPreviousFormStep } =
    useMultiStepFormStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: multiStepFormData?.personalFormData?.firstName,
      lastName: multiStepFormData?.personalFormData?.lastName,
      month: multiStepFormData?.personalFormData?.dateOfBirth?.month,
      day: multiStepFormData?.personalFormData?.dateOfBirth?.day,
      year: multiStepFormData?.personalFormData?.dateOfBirth?.year,
      zipCode: multiStepFormData?.personalFormData?.zipCode,
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

  const onSubmit: SubmitHandler<FormInputType> = (data) => {
    if (Object.keys(errors).length === 0) {
      setMultiStepFormData({
        personalFormData: {
          ...data,
          dateOfBirth: { month: data.month, day: data.day, year: data.year },
        },
      });
      if (multiStepFormData) {
        getEligibilityMutation({
          firstName: "John",
          lastName: "Doe",
          dob: "02-12-1950",
          memberId: "A234",
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <UserIcon />
          <p className=" font-extrabold">Patient information</p>
        </div>
        <p className="text-sm font-extrabold text-[#6B7280]">
          All fields are required
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        <div className="flex justify-between gap-4">
          <Input
            id="firstName"
            label="First name"
            {...register("firstName")}
            errorMessage={errors.firstName?.message}
          />

          <Input
            id="lastName"
            label="Last name"
            {...register("lastName")}
            errorMessage={errors.lastName?.message}
          />
        </div>
        <div>
          <p className="italic">Date of birth</p>
          <div className="flex justify-between gap-4">
            <div className="gap flex w-full flex-col">
              <div className="flex gap-2">
                <Input
                  id="month"
                  label="Month"
                  {...register("month", {
                    setValueAs: (v: string) => parseInt(v, 10),
                  })}
                  placeholder="MM"
                  className="w-16"
                  maxLength={2}
                  errorMessage={errors.month?.message}
                  type="number"
                />

                <Input
                  id="day"
                  label="Day"
                  {...register("day", {
                    setValueAs: (v: string) => parseInt(v, 10),
                  })}
                  placeholder="DD"
                  className="w-16"
                  maxLength={2}
                  errorMessage={errors.day?.message}
                  type="number"
                />
                <Input
                  id="year"
                  label="Year"
                  {...register("year", {
                    setValueAs: (v: string) => parseInt(v, 10),
                  })}
                  placeholder="YYYY"
                  className="w-24"
                  maxLength={4}
                  errorMessage={errors.year?.message}
                  type="number"
                />
              </div>
            </div>

            <Input
              id="zipCode"
              label="Zip code"
              {...register("zipCode")}
              errorMessage={errors.zipCode?.message}
            />
          </div>
        </div>

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
              "w-1/4 self-end  rounded-md px-8 py-2 text-center text-white",
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

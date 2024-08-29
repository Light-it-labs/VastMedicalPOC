import type { MultiStepFormData } from "~/stores";

export interface EligibilityResponseType {
  benefit: "pharmacy" | "dme" | null;
  is_eligible: boolean;
  member_id: string;
  payer: string;
  state: string;
}

export interface EligibilityParamsRequestType {
  firstName: string;
  lastName: string;
  dob: string;
  memberId: string;
}

const PLAN_TYPES = {
  medicare: "medicare",
  medicareAdv: "medicare-advantage",
  medicaid: "medicaid",
  private: "private-insurance",
} as const;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const checkBenefitsEligibilityQuery = {
  mutation: async ({
    insuranceFormData,
    medicalInformationFormData,
  }: MultiStepFormData) => {
    await delay(2000);
    console.log({ insuranceFormData });
    //Medicare
    if (insuranceFormData?.insuranceType === PLAN_TYPES.medicare) {
      return "dme";
    }

    //Cigna
    if (insuranceFormData?.insuranceProvider === "cigna") {
      return "pharmacy";
    }

    //bcbs
    if (insuranceFormData?.insuranceProvider === "bcbs") {
      return "dme";
    }

    //type 2 and oral medication
    if (
      medicalInformationFormData?.diabetesTreatment === "om" &&
      medicalInformationFormData.diabetesType === "type-2"
    ) {
      return "non-eligible";
    }

    return "non-eligible";
  },
};

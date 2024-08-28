import type { ServiceResponse } from "./axios";
import { api } from "./axios";

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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const checkBenefitsEligibilityQuery = {
  mutation: async ({
    firstName,
    lastName,
    dob,
    memberId,
  }: EligibilityParamsRequestType) => {
    await delay(2000);
    const response = await api.post<ServiceResponse<EligibilityResponseType>>(
      "/medicare/eligibility-check",
      {
        first_name: firstName,
        last_name: lastName,
        dob,
        member_id: memberId,
      },
    );

    return response.data.data;
  },
};

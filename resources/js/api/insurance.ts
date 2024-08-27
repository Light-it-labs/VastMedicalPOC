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
export const checkBenefitsEligibilityQuery = {
  mutation: async ({
    firstName,
    lastName,
    dob,
    memberId,
  }: EligibilityParamsRequestType) => {
    const {
      data: { data },
    } = await api.post<ServiceResponse<EligibilityResponseType>>(
      "/medicare/eligibility-check",
      {
        first_name: firstName,
        last_name: lastName,
        dob,
        member_id: memberId,
      },
    );

    return data;
  },
};

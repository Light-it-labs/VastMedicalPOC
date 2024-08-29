import { create } from "zustand";

export interface MultiStepFormData {
  personalFormData?: {
    firstName: string;
    lastName: string;
    dateOfBirth: { month: number; day: number; year: number };
    zipCode: string;
  };
  addressFormData?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  insuranceFormData?: {
    insuranceType: string;
    insuranceProvider?: string;
    rxNumber?: string;
    binNumber?: string;
  };
  medicalInformationFormData?: {
    diabetesType: string;
    diabetesTreatment: string;
  };
}

export interface MultiStepFormState {
  currentFormStep: number;
  multiStepFormData: MultiStepFormData | undefined;
  goToNextFormStep(): void;
  goToPreviousFormStep(): void;
  setMultiStepFormData(multiStepFormData: MultiStepFormData): void;
}

export const useMultiStepFormStore = create<MultiStepFormState>()((set) => ({
  currentFormStep: 1,
  multiStepFormData: undefined,
  goToNextFormStep: () => {
    set(({ currentFormStep }) => ({
      currentFormStep: currentFormStep + 1,
    }));
  },
  goToPreviousFormStep: () => {
    set(({ currentFormStep }) => ({
      currentFormStep: currentFormStep - 1,
    }));
  },
  setMultiStepFormData: (update: Partial<MultiStepFormData>) => {
    set((prevState) => ({
      multiStepFormData: {
        ...prevState.multiStepFormData,
        ...update,
      },
    }));
  },
}));

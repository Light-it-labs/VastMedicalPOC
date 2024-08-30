import { useMultiStepFormStore } from "~/stores";

interface ProviderType {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

const medicareDmeProviders: Record<
  string,
  {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
  }[]
> = {
  medicare: [
    {
      id: 1,
      name: "Quest Health Solutions",
      email: "info@questhealthsolutions.com",
      phoneNumber: "877-270-7050",
    },
    {
      id: 2,
      name: "United States Medical Supplies",
      email: "abbott@usmed.com",
      phoneNumber: "877-270-6508",
    },
    {
      id: 3,
      name: "Better Living Now",
      email: "libre@betterlivingnow.com",
      phoneNumber: "800-854-5729",
    },
    {
      id: 4,
      name: "Advanced Diabetes Supply",
      email: "libreintakes@northcoastmed.com",
      phoneNumber: "866-976-9110",
    },
    {
      id: 5,
      name: "Edgepark Medical Supplies",
      email: "diabetesreferrals@cardinalhealth.com",
      phoneNumber: "844-619-4650",
    },
    {
      id: 6,
      name: "CCS Medical",
      email: "libre@ccsmed.com",
      phoneNumber: "800-951-1725",
    },
    {
      id: 7,
      name: "Byram Healthcare/Apria",
      email: "Byram Healthcare/Apria",
      phoneNumber: "Byram Healthcare/Apria",
    },
    {
      id: 8,
      name: "Byram Healthcare/Apria",
      email: "providerservices@jandbmedical.com",
      phoneNumber: "800-737-0045",
    },
    {
      id: 9,
      name: "Total Medical Supply",
      email: "cgm@tmscares.com",
      phoneNumber: "877-670-1120",
    },
    {
      id: 10,
      name: "US HealthLink",
      email: "customerservice@ushealthlink.com",
      phoneNumber: "855-421-2732",
    },
    {
      id: 11,
      name: "Bridgewater Health Supplies",
      email: "info@bridgewaterhealthsupplies.com",
      phoneNumber: "800-974-2055",
    },
    {
      id: 12,
      name: "Mini Pharmacy",
      email: "info@minipharmacy.com",
      phoneNumber: "info@minipharmacy.com",
    },
  ],
  ["private-insurance"]: [
    {
      id: 3,
      name: "Advanced Diabetes Supply",
      email: "libreintakes@northcoastmed.com",
      phoneNumber: "866-976-9110",
    },
    {
      id: 4,
      name: "United States Medical Supply",
      email: "abbott@usmed.com",
      phoneNumber: "877-814-5459",
    },
    {
      id: 1,
      name: "Edwards Health Care Services",
      email: "customerservice@myehcs.com",
      phoneNumber: "855-421-2732",
    },
    {
      id: 2,
      name: "Byram Healthcare/Apria",
      email: "abbotreferrals@byramhealthcare.com",
      phoneNumber: "800-974-2055",
    },

    {
      id: 5,
      name: "Edgepark Medical Supplies",
      email: "edgeparkcareteam@edgepark.com",
      phoneNumber: "844-619-4650",
    },

    {
      id: 6,
      name: "Total Medical Supply",
      email: "cgm@tmscares.com",
      phoneNumber: "877-670-1120",
    },
  ],
};

const ProviderCard = ({ name, email, phoneNumber }: ProviderType) => {
  return (
    <div className="w-[30%] rounded-lg border border-[#F0F7FF] text-center shadow ">
      <div className="bg-[#F0F7FF] p-4 font-bold text-[#07284A]">
        <h1>{name}</h1>
      </div>
      <div className="flex flex-col gap-2 p-4 text-[#6B7280] ">
        <p>{email}</p>
        <p>{phoneNumber}</p>
      </div>
    </div>
  );
};

export const ProvidersList = () => {
  const { multiStepFormData } = useMultiStepFormStore();

  const insuranceKey =
    multiStepFormData?.insuranceFormData?.insuranceType ?? "medicare";
  return (
    <div className="mx-auto flex w-11/12 flex-col gap-12 pb-16">
      <div className="flex flex-col gap-12 text-center">
        <h1 className="pt-8  text-3xl text-[#07284A]">
          Your <b className="text-[#0C8FEB]">Freestyle Libre CGM System</b> is
          covered as a Medical Benefit.
        </h1>
        <p className="text-[#07284A]">
          Great news! Here is a list of Durable Medical Equipment (DME)
          providers you can contact to get your device.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {medicareDmeProviders[insuranceKey]?.map((provider) => {
          return <ProviderCard key={provider.id} {...provider} />;
        })}
      </div>
    </div>
  );
};

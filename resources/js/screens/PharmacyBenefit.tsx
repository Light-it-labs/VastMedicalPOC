import { useState } from "react";
import { ChevronRightIcon } from "~/components/icons/ChevronRightIcon";
import { MapPinIcon } from "~/components/icons/MapPinIcon";
import { FreestyleLogo } from "~/components/logos/FreestyleLogo";
import { twMerge as tw } from "tailwind-merge";

interface PharmacyPromotion {
  id: number;
  pharmacyName: string;
  price: string;
  bin: string;
  productName: string;
  address: string;
}

const pharmacyPromotions: PharmacyPromotion[] = [
  {
    id: 1,
    pharmacyName: "Rite Aid",
    price: "$15.27",
    bin: "273829",
    productName: "Freestyle Libre 3",
    address: "303 Elm Avenue, GA 30506",
  },
  {
    id: 2,
    pharmacyName: "Walgreens",
    price: "$12.84",
    bin: "879820",
    productName: "Freestyle Libre 3",
    address: " 3964 Peachtree Road, GA 30506",
  },
];

export const PharmacyBenefit = () => {
  const [selectedPromotion, setSelectedPromotion] = useState<PharmacyPromotion>(
    {
      id: 1,
      pharmacyName: "Rite Aid",
      price: "$15.27",
      bin: "273829",
      productName: "Freestyle Libre 3",
      address: "303 Elm Avenue, GA 30506",
    },
  );

  const { price, pharmacyName, productName, bin, address } = selectedPromotion;
  return (
    <div className="mx-auto flex w-3/4 flex-col gap-12">
      <div className="flex flex-col gap-12 text-center">
        <h1 className="pt-8  text-3xl text-[#07284A]">
          Your <b className="text-[#0C8FEB]">Freestyle Libre CGM System</b> is
          covered as a Pharmacy benefit.
        </h1>
        <p className="text-[#07284A]">
          You can pick it up at any of the following pharmacies:
        </p>
      </div>
      <div className="flex justify-center gap-8">
        <div className="flex w-5/12 flex-col gap-4">
          {pharmacyPromotions.map((promotion) => {
            const { id, pharmacyName, price, address } = promotion;
            return (
              <button
                key={id}
                className={tw(
                  "flex w-full items-center justify-between rounded-md border border-[#F0F7FF] px-4 py-6 shadow-md hover:border-[#bed4ee] hover:bg-[#bed4ee]",
                  selectedPromotion?.id === id
                    ? "border-[#E0EFFE] bg-[#E0EFFE]"
                    : "border-[#F0F7FF]",
                )}
                onClick={() => setSelectedPromotion(promotion)}
              >
                <div className="flex flex-col  text-start">
                  <p className="text-xl font-bold text-[#051E38]">
                    {pharmacyName}
                  </p>
                  <p className="text-[#6B7280]">{address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-[#064C86]">{price}</p>
                  <ChevronRightIcon />
                </div>
              </button>
            );
          })}
        </div>
        <div className="flex w-5/12 flex-col items-center gap-8 rounded-lg border pb-4 ">
          <div className="flex w-full justify-center rounded-t-lg rounded-bl-3xl bg-[#E0EFFE] p-8 ">
            <FreestyleLogo />
          </div>
          <div className="flex w-2/3 flex-col items-center gap-12 text-center ">
            <div className="flex flex-col gap-2">
              <p className="text-4xl font-bold text-[#0B406F]">{price}</p>
              <p className="text-[#6B7280]">{productName}</p>
            </div>
            <p className="text-[#051E38] ">
              Show this coupon at the <b>{pharmacyName}</b> Pharmacy.
            </p>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />
              <p className=" text-[#6B7280]">{address}</p>
            </div>
            <div className="flex  w-full justify-between text-[#6B7280]">
              <p>BIN</p>
              <p>{bin}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

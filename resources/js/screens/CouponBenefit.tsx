import { InfoIcon } from "~/components/icons/InfoIcon";
import { FreestyleLogo } from "~/components/logos/FreestyleLogo";

export const CouponBenefit = () => {
  return (
    <div className="mx-auto flex w-3/4 flex-col gap-12">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-2xl text-blue">
          Sorry, it seems your coverage is not eligible for a{" "}
          <span className="font-bold text-blue-lighter">
            Freestyle Libre CGM System
          </span>
          .
        </h1>
        <p className="text-sm text-blue">
          We still want to help you with your diabetes management,{" "}
          <span className="font-bold">so we want you to have a $75 coupon</span>{" "}
          to get your sensor with a discounted price.
        </p>
      </div>
      <div className="m-auto flex w-5/6 flex-col gap-8">
        <div className="flex justify-center gap-8">
          <div className="flex max-w-sm flex-col items-center justify-start gap-4 overflow-hidden rounded-2xl border-2 border-[#F0F7FF] bg-[white] pb-8">
            <div className="w-full rounded-bl-3xl bg-[#F0F7FF] px-8 py-4">
              <FreestyleLogo className="w-full" />
            </div>
            <div className="py-8p flex flex-col items-center justify-start gap-3 px-8 text-center text-blue-dark">
              <div className="text-4xl font-bold text-freestyle-libre-red">
                $75
              </div>
              <div className="text-xl font-bold">Freestyle Libre 3</div>
              <div className="w-2/3">
                Use this coupon at your local Pharmacy.
              </div>
              <div className="pt-12 text-blue underline">
                <a href="/pharmacies"> Find pharmacies near me</a>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex gap-4 rounded border border-warning-200 bg-warning-50 px-4 py-3 text-sm text-warning-900">
          <InfoIcon />
          If you think there might be a mistake, please contact us by calling
          877-888-7050.
        </div>
      </div>
    </div>
  );
};

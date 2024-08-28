import Spinner from "~/ui/Spinner";
import { twMerge } from "tailwind-merge";

export const LoadingState = ({ className }: { className?: string }) => (
  <div
    className={twMerge("flex size-full items-center justify-center", className)}
  >
    <Spinner />
  </div>
);

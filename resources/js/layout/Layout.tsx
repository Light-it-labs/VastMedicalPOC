import { LibreHeaderLogo } from "~/components/logos/LibreHeaderLogo";
import { VmgHeaderLogo } from "~/components/logos/VmgHeaderLogo";
import { useOutlet } from "react-router-dom";
import { twMerge as tw } from "tailwind-merge";

export const Layout = ({ isHome }: { isHome: boolean }) => {
  const outlet = useOutlet();
  return (
    <div
      className={tw(
        `flex h-screen flex-col overflow-hidden bg-[#FCFCFC]`,
        isHome &&
        "bg-gradient-to-br from-[#FCFCFC] from-30% to-[#FFD100] to-80% ",
        !isHome && "bg-gradient-to-r from-[#FFFFC199] to-[#FFD100]",
      )}
    >
      <header
        className={tw(
          "flex items-center justify-between px-16 py-8 ",
        )}
      >
        <a href="/">
          <LibreHeaderLogo className="w-40 cursor-pointer" />
        </a>
        <a href="/">
          <VmgHeaderLogo className="w-20 cursor-pointer" />
        </a>
      </header>
      <main className={tw("grid h-full px-16 py-8 flex-grow overflow-auto pb-0", !isHome && "bg-white rounded-tr-[5rem]")}>{outlet}</main>
    </div>
  );
};

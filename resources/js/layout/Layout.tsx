import { LibreHeaderLogo } from "~/components/logos/LibreHeaderLogo";
import { VmgHeaderLogo } from "~/components/logos/VmgHeaderLogo";
import { useOutlet } from "react-router-dom";
import { twMerge as tw } from "tailwind-merge";

export const Layout = ({ isHome }: { isHome: boolean }) => {
  const outlet = useOutlet();

  return (
    <div
      className={tw(
        `flex min-h-screen flex-col bg-[#FCFCFC]`,
        isHome &&
          "bg-gradient-to-br from-[#FFFFFF] from-15% to-[#FFD100] to-90% ",
      )}
    >
      <header
        className={tw(
          "flex items-center justify-between px-16 py-8 ",
          !isHome && "bg-gradient-to-r from-[#FFFFFF]  to-[#FFD100] ",
        )}
      >
        <LibreHeaderLogo />
        <VmgHeaderLogo />
      </header>
      <main>
        <div className="grid min-h-screen px-16">{outlet}</div>
      </main>
      <footer className=" p-4 text-center"></footer>
    </div>
  );
};

import { Link } from "react-router-dom";

import FreestyleLibre from "./freestyle.png";
import { Button } from "~/components/Button";

export const Home = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex w-[40%] flex-col gap-12 self-center">
        <div className="flex flex-col gap-8">
          <h3 className="text-2xl font-bold text-freestyle-libre-red">
            FreeStyle Libre 3 system
          </h3>
          <h1 className="text-6xl text-blue">
            Designed with <b>you</b> in mind
          </h1>

          <p className="text-[#051E38]">
            The world&lsquo;s smallest sensor streams readings directly to your
            smartphone* so you can know your glucose levels with just a quick
            glance.
          </p>
        </div>
        <Link to="/stepForm">
          <Button
            variant="primary"
            className="w-2/3 text-center hover:font-bold"
          >
            Get started
          </Button>
        </Link>
      </div>
      <div className="mr-24 w-1/3 pr-24">
        <img src={FreestyleLibre} alt="ProfilePicture" />
      </div>
    </div>
  );
};

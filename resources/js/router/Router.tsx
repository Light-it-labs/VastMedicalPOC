import { Layout } from "~/layout";
import { Home, Login, NotFound } from "~/screens";
import MultipleChoiceForm from "~/screens/MultipleChoiceForm";
import MultiStepForm from "~/screens/MultiStepForm";
import { PharmacyBenefit } from "~/screens/PharmacyBenefit";
import { ProvidersList } from "~/screens/ProvidersList";
import { useUserStore } from "~/stores";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";

import { ROUTES } from "./routes";

export const Router = () => {
  const location = useLocation();
  const { previousLocation } = (location.state ?? {}) as {
    previousLocation?: Location;
  };

  const userState = useUserStore((state) =>
    state.token ? "loggedIn" : "loggedOut",
  );

  return (
    <Routes location={previousLocation ?? location}>
      {/* PUBLIC ONLY ROUTES */}s
      {userState === "loggedOut" && (
        <>
          <Route element={<Navigate to={ROUTES.login} replace />} path={"*"} />
          <Route element={<Login />} path={ROUTES.login} />
        </>
      )}
      {/* PRIVATE ONLY ROUTES */}
      {userState === "loggedIn" && (
        <>
          <Route
            element={<Layout isHome={location.pathname === ROUTES.home} />}
          >
            <Route element={<Home />} path={ROUTES.home} />
            <Route element={<MultiStepForm />} path={ROUTES.multiStepForm} />
            <Route
              element={<MultipleChoiceForm />}
              path={ROUTES.multipleChoiceForm}
            />
            <Route
              element={<PharmacyBenefit />}
              path={ROUTES.pharmacyBenefit}
            />
            <Route element={<ProvidersList />} path={ROUTES.providersList} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </>
      )}
    </Routes>
  );
};

import { APP_ROUTES } from "@/configs";
import { Home, Login, Register } from "@/features";
import { Travel, TravelDetails } from "@/features/Travel/pages";

import { AuthLayout, HomeLayout, RouteLayout } from "@/layouts";
import { Navigate, Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route path={APP_ROUTES.ROOT.PATH} element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path={APP_ROUTES.TRAVEL.NAME} element={<Home />} />
      </Route>

      <Route path={APP_ROUTES.AVAILABLE.PATH} element={<RouteLayout />}>
        <Route index element={<Travel />} />
        <Route path=":id" element={<TravelDetails />} />
      </Route>
      
      <Route path={APP_ROUTES.AUTH.ROOT.NAME} element={<AuthLayout />}>
        <Route path={APP_ROUTES.AUTH.LOGIN.PATH} element={<Login />} />
         <Route path={APP_ROUTES.AUTH.REGISTER.PATH} element={<Register />} />
      </Route>

      <Route path="*" element={<Navigate to={APP_ROUTES.ROOT.PATH} />} />
    </Routes>
  );
}

import { APP_ROUTES } from "@/configs";
import {
  Login,
  BookingsPage,
  BoxePage,
  LinesPage,
  DriversPage,
  StaffsPage,
  Dashboard,
  VehiclesPage,
  Companies,
  CompanieDetails,
  CompanieDetailsUpdate,
  Users,
} from "@/features";
import AddLinePage from "@/features/Lines/components/AddLine";
import UpdateLinePage from "@/features/Lines/components/UpdateLine";
import { AuthLayout, PrivateOutlet, RouteLayout } from "@/layouts";
import { Navigate, Route, Routes } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route path={APP_ROUTES.ROOT.PATH} element={<PrivateOutlet />}>
        <Route path={APP_ROUTES.ROOT.PATH} element={<RouteLayout />}>
          <Route index element={<Navigate to={APP_ROUTES.USERS.PATH} />} />
          
           <Route path={APP_ROUTES.COMPANIES.NAME} >
            <Route index element={<Companies />} />
            <Route path=":id" element={<CompanieDetails />} />
            <Route path="update/:id" element={<CompanieDetailsUpdate />} />
          </Route>

          <Route path={APP_ROUTES.BOOKINGS.PATH} element={<BookingsPage />} />
          <Route path={APP_ROUTES.USERS.PATH} element={<Users />} />
          <Route path={APP_ROUTES.BOXES.PATH} element={<BoxePage />} />
          <Route path={APP_ROUTES.LINES.PATH}>
          <Route index element = {<LinesPage/>}/>
          <Route path="addline" element={<AddLinePage/>}/>
          <Route path="updateline" element={<UpdateLinePage/>}/>
          </Route>
          
          <Route path={APP_ROUTES.DRIVERS.PATH} element={<DriversPage />} />
          <Route path={APP_ROUTES.STAFFS.PATH} element={<StaffsPage />} />
          <Route path={APP_ROUTES.DASHBOARD.PATH} element={<Dashboard />} />
          <Route path={APP_ROUTES.BUS.PATH} element={<VehiclesPage />} />
        </Route>
      </Route>

      <Route path={APP_ROUTES.AUTH.ROOT.NAME} element={<AuthLayout />}>
        <Route path={APP_ROUTES.AUTH.LOGIN.PATH} element={<Login />} />
      </Route>

      <Route path="*" element={<Navigate to={APP_ROUTES.ROOT.PATH} />} />
    </Routes>
  );
}

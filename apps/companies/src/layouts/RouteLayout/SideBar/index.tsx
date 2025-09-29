import { APP_ROUTES } from "@/configs";
import { SidebarLink } from "./SideBarLink";
import {
  Bus,
  CalendarTick,
  Profile2User,
  Logout,
  Warning2,
  Building, // <-- added icon import for agences
  Driving
} from "iconsax-react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PersistentStorage, StorageKeys } from "@/utils";

export default function SideBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    PersistentStorage.remove(StorageKeys.ESAY_TOKEN_KEY);
    PersistentStorage.remove(StorageKeys.ESAY_STORAGE_KEY);
    navigate(APP_ROUTES.AUTH.LOGIN.PATH);
  };

  return (
    <div className="h-screen flex flex-col w-2xs border-r-[1px] border-[#3D3D3D33] p-5">
      <div className="pb-9">
        <img src="/assets/images/logo-esay-travel.svg" />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="pt-4 flex flex-col relative transition-all duration-300">
          <div className="space-y-2">
             <SidebarLink
              to={APP_ROUTES.USERS.PATH}
              icon={<Profile2User className="w-5 h-5" />}
              labelKey="Gestion des utilisateurs"
            />

           
            <SidebarLink
              to={APP_ROUTES.TRAVEL.PATH}
              icon={<Bus className="w-5 h-5" />}
              labelKey="Gestion des voyages"
            />
            <SidebarLink
              to={APP_ROUTES.BOOKINGS.PATH}
              icon={<CalendarTick className="w-5 h-5" />}
              labelKey="Gestion des réservations"
            />
            {/* <SidebarLink
            to={APP_ROUTES.BOXES.PATH}
            icon={<I3Dcube className="w-5 h-5" />}
            labelKey="Gestion des colis"
          /> */}

            {/* <SidebarLink
              to={APP_ROUTES.DRIVERS.PATH}
              icon={<People className="w-5 h-5" />}
              labelKey="Gestion des chauffeurs"
            /> */}

            <SidebarLink
              to={APP_ROUTES.BUS.PATH}
              icon={<Bus className="w-5 h-5" />}
              labelKey="Gestion des véhicules"
            />
            <SidebarLink
              to={APP_ROUTES.STAFFS.PATH}
              icon={<Profile2User className="w-5 h-5" />}
              labelKey="Gestion des employés"
            />
             <SidebarLink
              to={APP_ROUTES.COMPANIES.PATH}
              icon={<Driving className="w-5 h-5" />}
              labelKey="Gestion des agences"
            />
          </div>
        </div>
        <div>
          <Button
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            onClick={() => console.log("hello!")}
            className="text-secondary-bleu-100 text-sm leading-md font-chakra font-medium normal-case mb-2"
            startIcon={<Warning2 color="#0A1952" className="w-5 h-5" />}
          >
            Support Technique
          </Button>
          <Button
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            onClick={handleLogout}
            className="text-red-100 text-sm leading-md font-chakra font-medium normal-case hover:bg"
            startIcon={<Logout color="#B02A1E" className="w-5 h-5" />}
          >
            Déconnexion
          </Button>
        </div>
      </div>
    </div>
  );
}

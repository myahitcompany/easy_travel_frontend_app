import { Header } from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

export function RouteLayout() {
  return (
    <div className="fixed w-full h-full">
      <div className="grid h-full bg-neutral grid-cols-[minmax(250px,_288px)_1fr]">
        <SideBar />

        <div className="overflow-y-auto relative">
          <Header />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

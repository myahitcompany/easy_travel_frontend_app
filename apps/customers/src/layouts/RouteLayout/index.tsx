import { Outlet } from "react-router-dom";
import { ResultHeader } from "./ResultHeader";
import { Footer } from "@/components";

export function RouteLayout() {
  return (
    <div className="w-full">
      <ResultHeader />
      <Outlet />
      <Footer />
    </div>
  );
}

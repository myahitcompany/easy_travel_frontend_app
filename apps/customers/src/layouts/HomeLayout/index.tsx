import { Outlet } from "react-router-dom";
import { Footer } from "@/components";
import { Header } from "./Header";

export function HomeLayout() {
  return (
    <div className="">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
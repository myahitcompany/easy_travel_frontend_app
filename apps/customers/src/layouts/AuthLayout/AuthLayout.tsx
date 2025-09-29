import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className=" min-h-screen w-full flex flex-col items-center justify-center place-content-center py-16 px-4">
      <div className="flex justify-center mb-6 md:mb-16">
      </div>
      <div className="max-w-2xl mx-auto px-4 py-8 md:p-16 w-full ">
        <Outlet />
      </div>
    </div>
  );
}

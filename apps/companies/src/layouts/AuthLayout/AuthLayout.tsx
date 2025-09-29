import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-screen w-full overflow-y-auto flex flex-col items-center justify-center place-content-center py-16 px-4">
      <div className="flex justify-center mb-6 md:mb-16">
        <img src="/assets/images/logo-esay-travel.svg" alt="esay-travel" />
      </div>
      <div className="max-w-xl mx-auto px-4 py-8 md:p-16 w-full rounded-2xl bg-[#f2f4f7]">
        <Outlet />
      </div>
    </div>
  );
}

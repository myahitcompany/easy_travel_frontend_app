import { Divider } from "@mui/material";
import { Bus, Monitor, Ram2, Routing, Wifi, Wind } from "iconsax-react";

export function TravelDetails() {
  return (
    <div className="pt-12 mb-96 max-w-7xl mx-auto">
      <div className="px-6 mb-7 text-[#3D3D3D]">
        Bus #32453 | Cotonou - Parakou
      </div>

      <div className="flex md:flex-row flex-col-reverse md:space-x-10 gap-10 md:gap-0  md:space-y-0 px-6 md:px-0">
        <div className="md:w-2/3 md:h-72 shadow-lg rounded-[10px] flex flex-col px-6 pt-8">
          <div className="flex flex-row items-center justify-between mb-6">
            <p className="text-[#112211] text-2xl font-bold font-chakra">
              Bus #32453
            </p>
            <p className="text-[#FF8682] text-3xl font-chakra">$240</p>
          </div>

          <div className="flex flex-row items-center justify-between mb-6">
            <p className="text-[#112211] text-sm font-chakra">
              Cotonou - Parakou
            </p>
            <p className=" text-[#3D3D3D] text-lg font-chakra">22 Mars 2025</p>
          </div>

          <div className="flex md:flex-row flex-col items-center justify-between mb-6">
            <div className="p-4 flex justify-center items-center rounded-[10px] border border-primary-orange-100 w-52 mb-4 md:mb-0">
              Compagnie
            </div>
            <div className="flex space-x-12">
              <Wifi size={24} color="#0A1952" />

              <Monitor size={24} color="#0A1952" />

              <Ram2 size={24} color="#0A1952" />

              <Wind size={24} color="#0A1952" />
            </div>
          </div>

          <div className="flex flex-row items-center justify-between pb-6 md:pb-0">
            <p className="text-[#3D3D3D] text-2xl font-chakra">Cotonou</p>
            <Routing size={48} color="#0A1952" />
            <p className="text-[#3D3D3D] text-2xl font-chakra">Parakou</p>
          </div>
        </div>
        <div className="md:w-1/3 shadow-lg rounded-[10px] px-6 pb-8">
          <div className="flex space-x-6 items-center">
            <Bus size={100} />
            <div>
              <p className="text-[#112211] text-2xl font-bold font-chakra">
                Bus #32453
              </p>
              <p className=" text-primary-orange-100 text-xs font-bold font-chakra">
                Compagnie
              </p>
            </div>
          </div>

          <div className="w-full mt-4 mb-4">
            <Divider />
          </div>
          <p className="text-sm text-[#112211] font-chakra font-bold mb-4">
            Détails du prix
          </p>

          <div className="flex flex-row justify-between mb-4">
            <p className="text-sm text-[#112211] font-chakra">Option 1</p>
            <p className="text-sm text-[#112211] font-chakra">1200 FCFA</p>
          </div>
          <div className="flex  flex-row justify-between mb-4">
            <p className="text-sm text-[#112211] font-chakra">Option 2</p>
            <p className="text-sm text-[#112211] font-chakra">1200 FCFA</p>
          </div>
          <div className="flex  flex-row justify-between mb-4">
            <p className="text-sm text-[#112211] font-chakra">Option 3</p>
            <p className="text-sm text-[#112211] font-chakra">1200 FCFA</p>
          </div>
          <div className="w-full mb-4">
            <Divider />
          </div>
          <div className="flex  flex-row justify-between">
            <p className="text-sm text-[#112211] font-chakra font-bold">
              Total
            </p>
            <p className="text-sm text-[#112211] font-chakra font-bold">
              1200 FCFA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

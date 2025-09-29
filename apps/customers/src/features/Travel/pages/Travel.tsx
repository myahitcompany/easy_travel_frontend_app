import { Search, TravelInformationsCard } from "@/components";

export function Travel() {
  return (
    <div>
      <div className="max-w-7xl mx-auto shadow-lg px-6 pt-8 mb-8 mt-11 rounded-[10px]">
        <Search />
      </div>
      <div className="grid h-full md:grid-cols-[minmax(250px,_288px)_1fr] max-w-7xl mx-auto mb-96">
        <div className="md:flex flex-col  border-r-[1px] border-[#3D3D3D33] h-full hidden">
          Filtres
        </div>
        <div className="flex flex-col space-y-8">
          <TravelInformationsCard />
          <TravelInformationsCard />
        </div>
      </div>
    </div>
  );
}

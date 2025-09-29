import { Button } from "@mui/material";
import { TravelCard } from "./TravelCard";

export function TravelList() {
  return (
    <div className="max-w-7xl mx-auto mb-20 px-6 lg:px-0">
      <div className="flex justify-between items-center mb-16">
        <p className="context md:text-3xl text-xl">
          Découvrez toutes les destinations
        </p>
        <Button
          className="bg-primary-orange-100 rounded-[10px] normal-case h-12 font-chakra text-nowrap"
          variant="contained"
        >
          Voir tout
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 grid-cols-1">
        <TravelCard />
        <TravelCard />
        <TravelCard />
        <TravelCard />
        <TravelCard />
        <TravelCard />
      </div>
    </div>
  );
}

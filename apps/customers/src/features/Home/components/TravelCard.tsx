import { Location } from "iconsax-react";

export function TravelCard() {
  return (
    <div className="flex flex-row  items-center gap-4 rounded-[10px] p-5 border border-neutral-20 ">
      <div className="rounded-full w-20 h-20 bg-[#0A195233] flex justify-center items-center">
        <Location size="40" color="#0A1952" />
      </div>
      <div>
        <p className="text-secondary-bleu-100 font-chakra text-lg leading-md">
          COTONOU - PARAKOU
        </p>
      </div>
    </div>
  );
}

import { Button, Divider } from "@mui/material";
import { Bus, Monitor, Ram2, Wifi, Wind } from "iconsax-react";
import { Link } from "react-router-dom";

export function TravelInformationsCard() {
  return (
    <div className="w-full px-4">
      <div className="w-full shadow-lg rounded-[10px] pt-6 pb-6 px-4 flex flex-row space-x-6 ">
        <div className=" flex flex-col space-y-2 items-center">
          <Bus size={100} />
          <p className="text-secondary-bleu-100 text-sm font-chakra font-bold">
            Compagnie
          </p>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex md:flex-row flex-col justify-between mb-4">
            <div className="flex flex-col space-y-4">
              <div className="flex md:flex-row flex-col md:space-x-10 ">
                <p className="text-secondary-bleu-100 text-sm font-chakra font-bold">
                  Cotonou - Parakou
                </p>
                <p className="text-secondary-bleu-100 text-sm font-chakra">
                  22 Mars 2025
                </p>
              </div>
              <div className="flex space-x-2">
                <Wifi size={15} color="#0A1952" />

                <Monitor size={15} color="#0A1952" />

                <Ram2 size={15} color="#0A1952" />

                <Wind size={15} color="#0A1952" />
              </div>
            </div>

            <div className="flex flex-col mt-5 md:mt-0">
              <p className="text-secondary-bleu-100 text-sm font-chakra">
                Prix
              </p>
              <p className="text-[#FF8682] text-2xl font-chakra">1500 FCFA</p>
            </div>
          </div>
          <div className="w-full mb-4">
            <Divider />
          </div>
          <Link to="/travels-availables/1">
            <Button
              className="bg-primary-orange-100 rounded-[10px] h-10 normal-case font-chakra w-full"
              variant="contained"
            >
              Réserver
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@mui/material";
import { Bus } from "iconsax-react";

export function CallToAction() {
  return (
    <div className="max-w-7xl mx-auto md:mb-64 mb-10 flex md:flex-row flex-col md:space-x-6 space-y-6 md:space-y-0 lg:px-0 px-6">
      <div className="max-w-xl bg-secondary-bleu-100 rounded-[10px] flex justify-start items-center">
        <div className="px-6 lg:pt-0 lg:pb-0 pt-16 pb-16">
          <p className="text-white md:text-3xl text-2xl font-bold context mb-6">
            Voyager
          </p>
          <p className="md:text-2xl text-white font-chakra mb-6">
            En toute confiance avec des compagnies partenanires fiables et
            vérifiées.
          </p>
          <Button
            className="bg-primary-orange-100 rounded-[10px] h-10 normal-case font-chakra"
            variant="contained"
            startIcon={<Bus className="w-5 h-5" />}
          >
            Trouver un bus
          </Button>
        </div>
      </div>

      <div className="w-full">
        <img
          src="/assets/images/call-to-action.png"
          className="w-full"
          height={414}
          width={656}
          alt="action-image"
        />
      </div>
    </div>
  );
}

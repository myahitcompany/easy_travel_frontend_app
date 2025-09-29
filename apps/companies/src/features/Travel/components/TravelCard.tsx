import { Routing, Edit, Trash } from "iconsax-react";
import React from "react";
import { Trip } from "utilities";
import DeleteTravel from "./DeleteTravel";
import UpdateTravel from "./UpdateTravel";

interface CardProps {
  trip: Trip;
}

export default function TravelCard({ trip }: CardProps) {
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const [openTrash, setOpenTrash] = React.useState(false);

  return (
    <div className="flex flex-row justify-between gap-4 rounded-[10px] p-5 border border-neutral-20 w-full items-center">
      <div className="rounded-full w-20 h-20 bg-[#0A195233] flex justify-center items-center">
        <Routing size="40" color="#0A1952" />
      </div>
      <div className="flex flex-col space-y-1">
        <p className="text-[#0A1952] font-chakra font-bold text-sm leading-md pt-3">
          {trip.starting_point.toUpperCase()} -{" "}
          {trip.arrival_point.toUpperCase()}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-secondary-bleu-100 font-chakra leading-md">
            {}
          </p>
          <p className="text-xs text-secondary-bleu-100 font-chakra leading-md">
            {trip.duration}
          </p>
          <p className="text-xs text-secondary-bleu-100 font-chakra leading-md">
            {trip.price} FCFA
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-secondary-bleu-100 font-chakra leading-xs">
            {new Date(trip.departure).toLocaleString("fr-FR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <div className="text-xs text-secondary-bleu-100 font-chakra leading-xs">
            {"N/A"}
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-5">
        <Edit
          size="24"
          color="gray"
          className="cursor-pointer"
          onClick={() => setOpenUpdate(true)}
        />
        <Trash
          size="24"
          color="gray"
          className="cursor-pointer"
          onClick={() => setOpenTrash(true)}
        />

        <DeleteTravel
          open={openTrash}
          handleClose={() => setOpenTrash(false)}
          trip={trip}
        />
        <UpdateTravel
          open={openUpdate}
          handleClose={() => setOpenUpdate(false)}
          trip={trip}
        />
      </div>
    </div>
  );
}

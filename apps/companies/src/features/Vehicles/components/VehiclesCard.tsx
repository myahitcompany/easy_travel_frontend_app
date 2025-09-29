import {
  Bus,
  Eye,
  Edit,
  Trash,
  Wifi,
  Wind,
  Monitor,
  Ram2,
  People,
} from "iconsax-react";
import { Vehicle } from "utilities";
import { UpdateVehicles } from "./UpdateVehicles";
import { DeleteVehicles } from "./DeleteVehicles";
import React from "react";

export function VehiclesCard({ vehicle }: { vehicle: Vehicle }) {
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpendDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  return (
    <div className="flex flex-row justify-between gap-4 rounded-[10px] p-5 border border-neutral-20 w-full">
      <div className="flex items-center space-x-2">
        <div className="rounded-full w-20 h-20 bg-[#0A195233] flex justify-center items-center">
          <Bus size="50" color="#0A1952" />
        </div>
        <div className="flex flex-col space-y-3">
          <p className="text-[#0A1952] font-chakra text-lg leading-md pt-3">
            {vehicle.license_plate}
          </p>

          <div className="flex space-x-2">
            {vehicle.options.wifi && <Wifi size={15} color="#0A1952" />}

            {vehicle.options.tv && <Monitor size={15} color="#0A1952" />}

            {vehicle.options.usb && <Ram2 size={15} color="#0A1952" />}

            {vehicle.options.air_conditioning && (
              <Wind size={15} color="#0A1952" />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row space-x-3">
        <div className="pt-12 flex items-center space-x-1">
          <p className="text-xs">{vehicle.capacity}</p>
          <People size={15} />
        </div>

        <div className="flex flex-col space-y-2">
          <Eye size="24" className="cursor-pointer hidden" color="gray" />
          <Edit
            size="24"
            color="gray"
            className="cursor-pointer"
            onClick={() => handleOpenUpdateModal()}
          />
          <Trash
            size="24"
            color="gray"
            className="cursor-pointer"
            onClick={() => handleOpendDeleteModal()}
          />
          <div>
            <UpdateVehicles
              openUpdateModal={openUpdateModal}
              handleCloseUpdateModal={handleCloseUpdateModal}
              vehicle={vehicle}
            />
            <DeleteVehicles
              openDeleteModal={openDeleteModal}
              handleCloseDeleteModal={handleCloseDeleteModal}
              vehicle={vehicle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

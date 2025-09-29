import { DeleteBooking, UpdateBooking } from "@/features";
import { TableRow, TableCell } from "@mui/material";
import { Ticket, Edit, Trash } from "iconsax-react";
import React from "react";
import { Booking } from "utilities";

export function BookingsListRow({ booking }: { booking: Booking }) {
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleOpenUpdateModal = () => setOpenUpdateModal(true);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);
  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      className=""
      key={booking.pk}
    >
      <TableCell className="p-4" component="th" scope="row">
        <div className="flex flex-row items-center space-x-3.5">
          <Ticket className="w-5 h-5" />
          <p className="text-sm text-seondary-bleu-100 leading-sm font-medium font-chakra">
            #001234{booking.passenger_count}
          </p>
        </div>
      </TableCell>
      <TableCell
        align="right"
        className="p-4 text-sm text-seondary-bleu-100 leading-sm font-medium font-chakra"
      >
        COTONOU
      </TableCell>
      <TableCell
        align="right"
        className="p-4 text-sm text-seondary-bleu-100 leading-sm font-medium font-chakra"
      >
        PARAKOU
      </TableCell>
      <TableCell
        align="right"
        className="p-4 text-sm text-seondary-bleu-100 leading-sm font-medium font-chakra"
      >
        CALAVI, GODOMEY
      </TableCell>
      <TableCell
        align="right"
        className="p-4 text-sm text-seondary-bleu-100 leading-sm font-medium font-chakra"
      >
        NINTOMEY Felix
      </TableCell>
      <TableCell
        align="right"
        className="p-4 text-sm text-seondary-bleu-100 leading-sm font-medium font-chakra"
      >
        #001
      </TableCell>
      <TableCell align="right" className="p-4">
        <div className="flex justify-end space-x-3 cursor-pointer">
          <Edit onClick={handleOpenUpdateModal} size={24} color="#0A1952" />
          <Trash onClick={handleDeleteModal} size={24} color="#0A1952" />

          <div>
            <UpdateBooking
              openUpdateModal={openUpdateModal}
              handleCloseUpdateModal={handleCloseUpdateModal}
              booking={booking}
            />
            <DeleteBooking
              openDeleteModal={openDeleteModal}
              handleCloseDeleteModal={handleCloseDeleteModal}
              booking={booking}
            />
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}

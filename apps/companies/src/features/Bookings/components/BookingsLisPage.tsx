import React, { useState } from "react";
import { AddSquare } from "iconsax-react";
import { Button, Stack, Pagination } from "@mui/material";
import { AddBooking } from "../components";
import { useGetBookings } from "../services";
import { BookingsListTable } from "./BookingsListTable";

export function BookingsListPage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [page, setPage] = useState(1);

  const { data: bookings } = useGetBookings(page);

const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
  setPage(value);
};

  return (
    <div className="pt-24 px-10 ">
      <div className="flex justify-end mb-9">
        <Button
          onClick={handleOpen}
          className="bg-primary-orange-100 rounded-[10px] h-10 normal-case"
          startIcon={<AddSquare className="w-5 h-5" />}
          variant="contained"
        >
          Ajouter une réservation
        </Button>
        <AddBooking open={open} handleClose={handleClose} />
      </div>

      {bookings && (
        <>
          <BookingsListTable bookings={bookings} />

          <Stack spacing={2} className="flex justify-center items-center pt-5">
            <Pagination
              count={Math.ceil(bookings.count / bookings.results.length)}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </>
      )}
    </div>
  );
}

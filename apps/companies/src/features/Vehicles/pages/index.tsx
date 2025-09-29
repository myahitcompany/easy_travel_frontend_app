import React, { useState } from "react";
import { useSetPageMeta } from "@/hooks";
import { AddSquare } from "iconsax-react";
import { Button, Stack, Pagination } from "@mui/material";
import { AddVehicles, VehiclesCard } from "../components";
import { Loading } from "@/components";
import { useGetVehicles } from "../services";

function VehiclesPageRenderer() {
  useSetPageMeta({
    title: "Véhicules",
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [page, setPage] = useState(1);

  const { data: vehicles } = useGetVehicles(page);

const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
  setPage(value);
};

  return (
    <div className="pt-24 px-10 ">
      <div className="mb-9 flex justify-end">
        <Button
          onClick={handleOpen}
          className="bg-primary-orange-100 rounded-[10px] h-10 normal-case"
          startIcon={<AddSquare className="w-5 h-5" />}
          variant="contained"
        >
          Ajouter un véhicule
        </Button>
      </div>

      <div className="grid grid-cols-3 max-w-7xl mx-auto gap-8">
        {vehicles?.results?.map((vehicle) => (
          <VehiclesCard vehicle={vehicle} key={vehicle.pk} />
        ))}
      </div>
      {vehicles && (
        <Stack spacing={2} className="flex justify-center items-center pt-5">
          <Pagination
            count={Math.ceil(vehicles.count / vehicles.results.length)}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      )}

      <div>
        <AddVehicles open={open} handleClose={handleClose} />
      </div>
    </div>
  );
}

export function VehiclesPage() {
  useSetPageMeta({
    title: "Véhicules",
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: vehicles, isLoading } = useGetVehicles();
  if (isLoading) return <Loading />;

  if (vehicles && vehicles.results.length > 0) return <VehiclesPageRenderer />;

  return (
    <div className="flex flex-col w-full h-screen gap-2 items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
        />
      </svg>
      <p>Rien à afficher pour le moment.</p>
      <Button
        onClick={handleOpen}
        className="bg-primary-orange-100 rounded-[10px] h-10 normal-case"
        startIcon={<AddSquare className="w-5 h-5" />}
        variant="contained"
      >
        Ajouter un véhicule
      </Button>
      <AddVehicles open={open} handleClose={handleClose} />
    </div>
  );
}

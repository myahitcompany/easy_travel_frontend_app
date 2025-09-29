import { useState } from "react";
import { AddSquare } from "iconsax-react";
import { Stack, Pagination, Button, CircularProgress } from "@mui/material";
import TravelCard from "../components/TravelCard";
import { useGetTrips } from "../services";
import { AddTravel } from "../components";

export function TravelPage() {
  const [openEdit, setOpenEdit] = useState(false);
  const [page, setPage] = useState(1);

  const { data: tripsData, isLoading, isError } = useGetTrips(page);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <div className="pt-24 px-10">
      <div className="flex justify-end mb-9">
        <Button
          className="bg-primary-orange-100 rounded-[10px] h-10 normal-case"
          startIcon={<AddSquare />}
          variant="contained"
          onClick={() => setOpenEdit(true)}
        >
          Publier un voyage
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">
            Une erreur s'est produite lors du chargement des voyages.
          </p>
        </div>
      ) : tripsData ? (
        <>
          <div className="grid grid-cols-3 max-w-7xl mx-auto gap-8">
            {tripsData.results.map((trip) => (
              <TravelCard key={trip.pk} trip={trip} />
            ))}
          </div>
          <Stack spacing={2} className="flex justify-center items-center pt-5">
            <Pagination
              count={Math.ceil(tripsData.count / tripsData.results.length)}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Aucun voyage disponible.</p>
        </div>
      )}
      <AddTravel open={openEdit} handleClose={() => setOpenEdit(false)} />
    </div>
  );
}

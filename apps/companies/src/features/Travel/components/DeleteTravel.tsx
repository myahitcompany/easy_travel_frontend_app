import React from "react";
import { Modal, Fade, Box, Typography, Divider, Button } from "@mui/material";
import { useDeleteTrip } from "../services";
import { Trip } from "utilities";

interface TrashModalProps {
  open: boolean;
  handleClose: () => void;
  trip: Trip;
}

const DeleteTravel: React.FC<TrashModalProps> = ({
  open,
  handleClose,
  trip,
}) => {
  const { mutate: deleteTrip, isLoading } = useDeleteTrip();

  const handleDelete = () => {
    if (trip) {
      deleteTrip(trip.pk, {
        onSuccess: () => {
          handleClose();
        },
        onError: (error) => {
          console.error("Erreur lors de la suppression du voyage", error);
        },
      });
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open}>
        <Box
          className="shadow-2xl !rounded-2xl"
          sx={{
            width: 600,
            height: 300,
            bgcolor: "background.paper",
            borderRadius: "16px",
            boxShadow: 24,
            p: 4,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography sx={{ color: "#B02A1E", fontSize: 32, fontWeight: 700 }}>
            Suppression de voyage
          </Typography>
          <Divider sx={{ mb: 3, mt: 3 }} />

          <Typography sx={{ color: "#0A1952", fontSize: 18, mb: 3 }}>
            Êtes-vous sûr de vouloir supprimer ce voyage ?
          </Typography>

          {trip && (
            <Typography
              sx={{ color: "#0A1952", fontSize: 16, mb: 3, fontWeight: "bold" }}
            >
              {trip.starting_point} - {trip.arrival_point}
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={handleClose}
              sx={{
                borderRadius: "10px",
                color: "#D63A1E",
                border: "2px solid #D63A1E",
                width: "45%",
              }}
              variant="outlined"
              disabled={isLoading}
            >
              Non
            </Button>
            <Button
              onClick={handleDelete}
              sx={{
                borderRadius: "10px",
                bgcolor: "#D63A1E",
                color: "white",
                width: "45%",
              }}
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? "Suppression en cours..." : "Oui"}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteTravel;

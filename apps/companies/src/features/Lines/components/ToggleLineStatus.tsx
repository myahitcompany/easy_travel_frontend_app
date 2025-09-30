import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { Line } from "../types";
import { linesApi } from "../services";
import { toast } from "react-toastify";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

interface ToggleLineStatusProps {
  open: boolean;
  handleClose: () => void;
  line: Line | null;
  onStatusToggled?: () => void;
}

export function ToggleLineStatus({ open, handleClose, line, onStatusToggled }: ToggleLineStatusProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async () => {
    if (!line) return;

    setLoading(true);
    setError(null);

    try {
      await linesApi.toggleLineStatus(line.id);
      const action = line.is_active === "1" ? "désactivée" : "activée";
      toast.success(`Ligne ${action} avec succès !`, {
        position: "top-right",
        autoClose: 3000,
      });
      handleClose();
      onStatusToggled?.();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Erreur lors du changement de statut";
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    handleClose();
    setError(null);
  };

  if (!line) return null;

  const isActive = line.is_active === "1";
  const action = isActive ? "désactiver" : "activer";
  const actionCapitalized = isActive ? "Désactiver" : "Activer";

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="!text-[#0A1952] !font-semibold !mb-4"
        >
          Confirmer le changement de statut
        </Typography>

        {error && (
          <Alert severity="error" className="!mb-4">
            {error}
          </Alert>
        )}

        <Typography className="!text-gray-600 !mb-6">
          Êtes-vous sûr de vouloir {action} la ligne{" "}
          <strong>{line.name}</strong> ?
        </Typography>

        {isActive && (
          <Typography className="!text-orange-600 !text-sm !mb-6">
            La désactivation rendra cette ligne indisponible pour les nouvelles réservations.
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            onClick={handleModalClose}
            variant="outlined"
            disabled={loading}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleToggle}
            variant="contained"
            color={isActive ? "warning" : "success"}
            disabled={loading}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
            }}
          >
            {loading ? `${actionCapitalized}...` : actionCapitalized}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
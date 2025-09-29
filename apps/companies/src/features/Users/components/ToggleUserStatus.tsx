import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { User } from "../types";
import { usersApi } from "../services";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

interface ToggleUserStatusProps {
  open: boolean;
  handleClose: () => void;
  user: User | null;
  onStatusToggled?: () => void;
}

export function ToggleUserStatus({ open, handleClose, user, onStatusToggled }: ToggleUserStatusProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      await usersApi.toggleUserStatus(user.id);
      handleClose();
      onStatusToggled?.();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors du changement de statut");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    handleClose();
    setError(null);
  };

  if (!user) return null;

  const isActive = user.is_active === "1";
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
          Êtes-vous sûr de vouloir {action} l'utilisateur{" "}
          <strong>{user.first_name} {user.last_name}</strong> ({user.email}) ?
        </Typography>

        {isActive && (
          <Typography className="!text-orange-600 !text-sm !mb-6">
            La désactivation empêchera cet utilisateur de se connecter à l'application.
          </Typography>
        )}

        <div className="flex justify-end space-x-2">
          <Button
            onClick={handleModalClose}
            variant="outlined"
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            onClick={handleToggle}
            variant="contained"
            color={isActive ? "warning" : "success"}
            disabled={loading}
          >
            {loading ? `${actionCapitalized}...` : actionCapitalized}
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
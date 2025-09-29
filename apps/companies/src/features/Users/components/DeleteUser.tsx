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

interface DeleteUserProps {
  open: boolean;
  handleClose: () => void;
  user: User | null;
  onUserDeleted?: () => void;
}

export function DeleteUser({ open, handleClose, user, onUserDeleted }: DeleteUserProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      await usersApi.deleteUser(user.id);
      handleClose();
      onUserDeleted?.();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la suppression de l'utilisateur");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    handleClose();
    setError(null);
  };

  if (!user) return null;

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
          Confirmer la suppression
        </Typography>

        {error && (
          <Alert severity="error" className="!mb-4">
            {error}
          </Alert>
        )}

        <Typography className="!text-gray-600 !mb-6">
          Êtes-vous sûr de vouloir supprimer l'utilisateur{" "}
          <strong>{user.first_name} {user.last_name}</strong> ({user.email}) ?
        </Typography>

        <Typography className="!text-red-600 !text-sm !mb-6">
          Cette action est irréversible et supprimera définitivement toutes les données
          associées à cet utilisateur.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            onClick={handleModalClose}
            variant="outlined"
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            disabled={loading}
          >
            {loading ? "Suppression..." : "Supprimer"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
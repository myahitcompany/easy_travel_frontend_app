import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { UpdateUserPayload, USER_GROUPS, User } from "../types";
import { usersApi } from "../services";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

interface UpdateUserProps {
  open: boolean;
  handleClose: () => void;
  user: User | null;
  onUserUpdated?: () => void;
}

export function UpdateUser({ open, handleClose, user, onUserUpdated }: UpdateUserProps) {
  const [formData, setFormData] = useState<UpdateUserPayload>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    group: "administrator",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        group: user.groups[0] as any,
      });
    }
  }, [user]);

  const handleInputChange = (field: keyof UpdateUserPayload) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSelectChange = (event: any) => {
    setFormData({ ...formData, group: event.target.value });
  };

  const validateForm = (): boolean => {
    if (!formData.username || !formData.first_name || !formData.last_name || !formData.email) {
      setError("Tous les champs obligatoires doivent être remplis");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email!)) {
      setError("Format d'email invalide");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm() || !user) return;

    setLoading(true);
    try {
      await usersApi.updateUser(user.id, formData);
      handleClose();
      onUserUpdated?.();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la mise à jour de l'utilisateur");
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
          Modifier l'utilisateur
        </Typography>

        {error && (
          <Alert severity="error" className="!mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Nom d'utilisateur"
            value={formData.username}
            onChange={handleInputChange("username")}
            required
            size="small"
          />

          <div className="flex gap-2">
            <TextField
              fullWidth
              label="Prénom"
              value={formData.first_name}
              onChange={handleInputChange("first_name")}
              required
              size="small"
            />
            <TextField
              fullWidth
              label="Nom"
              value={formData.last_name}
              onChange={handleInputChange("last_name")}
              required
              size="small"
            />
          </div>

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            required
            size="small"
          />

          <FormControl fullWidth size="small">
            <InputLabel>Groupe</InputLabel>
            <Select
              value={formData.group}
              label="Groupe"
              onChange={handleSelectChange}
            >
              {USER_GROUPS.map((group) => (
                <MenuItem key={group.value} value={group.value}>
                  {group.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="flex justify-end space-x-2 !mt-6">
            <Button
              onClick={handleModalClose}
              variant="outlined"
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              className="!bg-primary-orange-100"
            >
              {loading ? "Modification..." : "Modifier l'utilisateur"}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
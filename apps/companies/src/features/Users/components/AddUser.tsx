import React, { useState } from "react";
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
import { CreateUserPayload, USER_GROUPS } from "../types";
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

interface AddUserProps {
  open: boolean;
  handleClose: () => void;
  onUserCreated?: () => void;
}

export function AddUser({ open, handleClose, onUserCreated }: AddUserProps) {
  const [formData, setFormData] = useState<CreateUserPayload>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    group: "administrator",
    phone: "",
    company_id: 1, // Vous pouvez ajuster selon votre logique
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof CreateUserPayload) => (
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

    if (formData.password !== formData.confirm_password) {
      setError("Les mots de passe ne correspondent pas");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Format d'email invalide");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      await usersApi.createUser(formData);
      handleClose();
      onUserCreated?.();
      resetForm();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la création de l'utilisateur");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      group: "administrator",
      phone: "",
      company_id: 1,
    });
    setError(null);
  };

  const handleModalClose = () => {
    handleClose();
    resetForm();
  };

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
          Ajouter un nouvel utilisateur
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

          <TextField
            fullWidth
            label="Téléphone"
            value={formData.phone}
            onChange={handleInputChange("phone")}
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

          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            value={formData.password}
            onChange={handleInputChange("password")}
            required
            size="small"
          />

          <TextField
            fullWidth
            label="Confirmer le mot de passe"
            type="password"
            value={formData.confirm_password}
            onChange={handleInputChange("confirm_password")}
            required
            size="small"
          />

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
              {loading ? "Création..." : "Créer l'utilisateur"}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Switch, FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export function CompanieDetailsUpdate() {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 5, background: "#fff", borderRadius: 3, maxWidth: 900, margin: "40px auto" }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: "#0A1952" }}>
        Mettre à jour les informations d'une agence
      </Typography>
      <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
        <TextField fullWidth label="Nom de la compagnie" placeholder="Nom de la compagnie" />
        <TextField fullWidth label="Numéro de téléphone" placeholder="Votre numéro de téléphone" />
      </Box>
      <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
        <TextField fullWidth label="Adresse Géographique" placeholder="St Michel, Cotonou, Bénin" />
        <TextField fullWidth label="Adresse Google Map" placeholder="St Michel, Cotonou, Bénin" />
      </Box>
      <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
        <FormControl fullWidth>
          <Select displayEmpty defaultValue="">
            <MenuItem value="" disabled>Sélectionner la ville d’intervention</MenuItem>
            <MenuItem value="Cotonou">Cotonou</MenuItem>
            <MenuItem value="Parakou">Parakou</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Switch checked={status} onChange={() => setStatus(!status)} />
          <Typography>Actif/Non actif</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <Select displayEmpty defaultValue="Lundi">
            <MenuItem value="Lundi">Lundi</MenuItem>
            <MenuItem value="Mardi">Mardi</MenuItem>
            <MenuItem value="Mercredi">Mercredi</MenuItem>
            <MenuItem value="Jeudi">Jeudi</MenuItem>
            <MenuItem value="Vendredi">Vendredi</MenuItem>
            <MenuItem value="Samedi">Samedi</MenuItem>
            <MenuItem value="Dimanche">Dimanche</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Select displayEmpty defaultValue="Ouverture">
            {Array.from({ length: 24 }, (_, i) => (
              <MenuItem key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                {`${i.toString().padStart(2, "0")}:00`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Select displayEmpty defaultValue="Fermeture">
            {Array.from({ length: 24 }, (_, i) => (
              <MenuItem key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                {`${i.toString().padStart(2, "0")}:00`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          sx={{
            minWidth: 40,
            px: 0,
            borderColor: "#E6E8F0",
            color: "#0A1952",
            fontWeight: 700,
            fontSize: 24,
            lineHeight: 1,
          }}
        >
          +
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 3, mt: 4 }}>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          onClick={() => navigate(-1)}
        >
          Annuler
        </Button>
        <Button
          variant="contained"
          sx={{ background: "#D63A00" }}
          fullWidth
        >
          Mettre à jour
        </Button>
      </Box>
    </Box>
  );
}

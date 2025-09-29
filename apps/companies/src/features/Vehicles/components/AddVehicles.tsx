import { useCreateVehicle } from "@/features";
import { useForm } from "@mantine/form";
import {
  Box,
  Modal,
  Fade,
  Typography,
  Divider,
  Select,
  Button,
  Backdrop,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Routing } from "iconsax-react";
import { Vehicle } from "utilities";

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 610,
  bgcolor: "background.paper",
  border: "2px solid #fff ",
  borderRadius: "10px",
  boxShadow: 30,
};

export function AddVehicles({ open, handleClose }: ModalProps) {
  const createVehicleMutation = useCreateVehicle();

  const categories = [
    { value: "MB", label: "Mini-bus" },
    { value: "SD", label: "Berline" },
    { value: "BS", label: "Bus" },
  ];

  const statesOptions = [
    { value: "NEW", label: "Neuf" },
    { value: "GOOD", label: "Bon" },
    { value: "MEDIUM", label: "Moyen" },
    { value: "BAD", label: "Mauvais" },
    { value: "OUT_OF_SERVICE", label: "Hors service" },
  ];

  const vehicleForm = useForm<Vehicle>({
    initialValues: {
      category: "",
      state: "",
      capacity: undefined,
      options: {
        air_conditioning: false,
        tv: false,
        wifi: false,
        usb: false,
      },
      license_plate: "",
      pk: "",
    },

    validate: {
      category: (value) =>
        !value ? "Veuillez sélectionner une catégorie" : null,
      state: (value) => (!value ? "Veuillez sélectionner un état" : null),
      capacity: (value) =>
        typeof value !== "number" ? "Capacité invalide" : undefined,
      license_plate: (value) =>
        !value ? "Numéro d'immatriculation requis" : null,
    },
  });

  const handleSubmit = (values: Vehicle) => {
    try {
      createVehicleMutation.mutate(values);
      handleClose();
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    vehicleForm.setFieldValue("options", {
      ...vehicleForm.values.options,
      [name]: checked,
    });
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} slots={{ backdrop: Backdrop }}>
        <Fade in={open} className="shadow-2xl !rounded-2xl">
          <Box sx={style}>
            <Typography
              sx={{
                color: "#0A1952",
                fontSize: 32,
                lineHeight: "41.8px",
                paddingLeft: "41px",
                paddingTop: "27px",
                paddingBottom: "25px",
              }}
              id="transition-modal-title"
            >
              Ajouter un véhicule
            </Typography>

            <Divider
              sx={{ width: "100%", marginBottom: "10px" }}
              aria-hidden="true"
            />
            <form onSubmit={vehicleForm.onSubmit(handleSubmit)}>
              <Box
                sx={{
                  width: "100%",
                  mt: 3,
                  px: "41px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <FormControl sx={{ width: "48%" }}>
                    <Typography
                      sx={{
                        marginBottom: "5px",
                        lineHeight: "20.8px",
                        fontSize: "16px",
                        color: "#0A195299",
                        fontFamily: "Chakra Petch",
                      }}
                    >
                      Catégorie de véhicule
                    </Typography>
                    <Select
                      sx={{
                        borderRadius: "10px",
                        height: "36px",
                        width: "100%",
                        fontSize: "16px",
                        color: "#0A195299",
                        fontFamily: "Chakra Petch",
                      }}
                      value={vehicleForm.values.category}
                      onChange={(e) =>
                        vehicleForm.setFieldValue("category", e.target.value)
                      }
                      displayEmpty
                      startAdornment={
                        <Routing style={{ marginRight: "8px" }} size={19} />
                      }
                    >
                      <MenuItem value="" disabled>
                        Sélectionner une catégorie
                      </MenuItem>
                      {categories.map((item) => (
                        <MenuItem
                          key={item.value}
                          value={item.value}
                          sx={{ fontSize: "12px", color: "#0A195299" }}
                        >
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl sx={{ width: "48%" }}>
                    <Typography
                      sx={{
                        marginBottom: "5px",
                        lineHeight: "20.8px",
                        fontSize: "16px",
                        color: "#0A195299",
                        fontFamily: "Chakra Petch",
                      }}
                    >
                      État du véhicule
                    </Typography>
                    <Select
                      sx={{
                        borderRadius: "10px",
                        height: "36px",
                        width: "100%",
                        fontSize: "16px",
                        color: "#0A195299",
                        fontFamily: "Chakra Petch",
                      }}
                      value={vehicleForm.values.state}
                      onChange={(e) =>
                        vehicleForm.setFieldValue("state", e.target.value)
                      }
                      displayEmpty
                      startAdornment={
                        <Routing style={{ marginRight: "8px" }} size={19} />
                      }
                    >
                      <MenuItem value="" disabled>
                        Sélectionner un état
                      </MenuItem>
                      {statesOptions.map((item) => (
                        <MenuItem
                          key={item.value}
                          value={item.value}
                          sx={{ fontSize: "12px", color: "#0A195299" }}
                        >
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Box
                    sx={{
                      width: "48%",
                    }}
                  >
                    <Typography
                      sx={{
                        marginBottom: "5px",
                        fontSize: "16px",
                        color: "#0A195299",
                        lineHeight: "20.8px",
                        fontFamily: "Chakra Petch",
                      }}
                    >
                      Capacité
                    </Typography>
                    <TextField
                      fullWidth
                      id="input-with-icon-adornment"
                      type="number"
                      placeholder="Ex: 89"
                      value={vehicleForm.values.capacity}
                      sx={{
                        borderColor: "#0A1952",
                        textTransform: "none",
                        borderRadius: "10px",
                        fontFamily: "Chakra Petch",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          height: "36px",
                          color: "#0A195299",
                          fontFamily: "Chakra Petch",
                        },
                      }}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numberValue =
                          value === "" ? undefined : Number(value);
                        vehicleForm.setFieldValue("capacity", numberValue);
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Routing size={15} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      width: "48%",
                    }}
                  >
                    <Typography
                      sx={{
                        marginBottom: "5px",
                        fontSize: "16px",
                        color: "#0A195299",
                        lineHeight: "20.8px",
                        fontFamily: "Chakra Petch",
                      }}
                    >
                      Numéro d'immatriculation
                    </Typography>
                    <TextField
                      {...vehicleForm.getInputProps("license_plate")}
                      fullWidth
                      placeholder="Ex: RB QWE456AZ"
                      id="input-with-icon-adornment"
                      sx={{
                        borderColor: "#0A1952",
                        textTransform: "none",
                        borderRadius: "10px",
                        fontFamily: "Chakra Petch",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          height: "36px",
                          color: "#0A195299",
                          fontFamily: "Chakra Petch",
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Routing size={15} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Box
                      sx={{
                        fontSize: "16px",
                        color: "#0A195299",
                        marginBottom: "5px",
                        fontFamily: "Chakra Petch",
                      }}
                    >
                      Cocher tous les services à bord du bus
                    </Box>
                    <FormGroup sx={{ marginBottom: "20px" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={vehicleForm.values.options.wifi}
                            onChange={handleCheckboxChange}
                            name="wifi"
                          />
                        }
                        label="WiFi"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              vehicleForm.values.options.air_conditioning
                            }
                            onChange={handleCheckboxChange}
                            name="air_conditioning"
                          />
                        }
                        label="Climatiseur"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={vehicleForm.values.options.tv}
                            onChange={handleCheckboxChange}
                            name="tv"
                          />
                        }
                        label="Écran TV"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={vehicleForm.values.options.usb}
                            onChange={handleCheckboxChange}
                            name="usb"
                          />
                        }
                        label="Port USB"
                      />
                    </FormGroup>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  paddingLeft: "41px",
                  paddingRight: "41px",
                  paddingBottom: "39px",
                  marginTop: "39px",
                }}
                className="w-full flex justify-between items-center space-x-5"
              >
                <Button
                  onClick={handleClose}
                  sx={{
                    marginRight: "29px",
                    textTransform: "none",
                    borderRadius: "10px",
                  }}
                  fullWidth
                  color="error"
                  className="bg-primary-orange-100 rounded-[10px] h-10 normal-case"
                  variant="outlined"
                >
                  Annuler
                </Button>
                <Button
                  fullWidth
                  type="submit"
                  loading={createVehicleMutation.isLoading}
                  sx={{ textTransform: "none", borderRadius: "10px" }}
                  color="error"
                  className="bg-primary-orange-100 rounded-[10px] h-10 normal-case"
                  variant="contained"
                >
                  Ajouter
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

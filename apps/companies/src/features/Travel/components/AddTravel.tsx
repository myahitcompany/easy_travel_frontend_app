import { useForm } from "@mantine/form";
import {
  Modal,
  Fade,
  Box,
  Typography,
  Divider,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  FormControl,
  Select,
} from "@mui/material";
import { Routing, Clock } from "iconsax-react";
import { TripPayload, User, Vehicle } from "utilities";
import {
  useCreateTrip,
  useGetCities,
  useGetUsersList,
  useGetVehiclesList,
} from "../services";

interface EditModalProps {
  open: boolean;
  handleClose: () => void;
}

export function AddTravel({ open, handleClose }: EditModalProps) {
  const createTripMutation = useCreateTrip();
  const { data: vehiclesData } = useGetVehiclesList();

  const { data: usersData } = useGetUsersList();
  const { data: cities } = useGetCities();
  console.log(cities)

  const citiesData = cities?.sort((a: string, b: string) => a.localeCompare(b));

  const tripForm = useForm<TripPayload>({
    initialValues: {
      starting_point: "",
      arrival_point: "",
      departure: "",
      duration: "01:00:00",
      price: "",
      vehicle: "",
      driver: "",
    },

    validate: {
      starting_point: (value) =>
        value ? null : "Veuillez sélectionner une ville de départ",
      arrival_point: (value) =>
        value ? null : "Veuillez sélectionner une ville d'arrivée",
      departure: (value) =>
        value ? null : "Veuillez entrer une date de départ",
      price: (value) =>
        value && Number(value) > 0 ? null : "Le prix doit être supérieur à 0",
    },
  });

  const handleSubmit = (values: TripPayload) => {
    try {
      createTripMutation.mutate(values, {
        onSuccess: () => {
          handleClose();
        },
      });
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Fade in={open} className="shadow-2xl !rounded-2xl">
        <Box
          sx={{
            width: 600,
            maxHeight: "90vh",
            overflowY: "auto",
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
            Ajouter un voyage
          </Typography>
          <Divider sx={{ marginBottom: "30px", marginTop: "30px" }} />

          <form onSubmit={tripForm.onSubmit(handleSubmit)}>
            <Box
              sx={{
                display: "flex",
                gap: "29px",
                marginBottom: "15px",
              }}
            >
              <FormControl sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    marginBottom: "5px",
                    fontSize: "16px",
                    color: "#0A195299",
                    lineHeight: "20.8px",
                  }}
                >
                  Ville de départ
                </Typography>
                <Select
                  sx={{
                    borderRadius: "10px",
                    height: "36px",
                    color: "#0A195299",
                    fontFamily: "Chakra Petch",
                  }}
                  displayEmpty
                  value={tripForm.values.starting_point}
                  onChange={(e) =>
                    tripForm.setFieldValue("starting_point", e.target.value)
                  }
                  error={!!tripForm.errors.starting_point}
                >
                  <MenuItem value="" disabled>
                    Sélectionner une ville de départ
                  </MenuItem>
                  {citiesData?.map((city: string) => (
                    <MenuItem
                      sx={{ fontSize: "12px", color: "#0A195299" }}
                      key={city}
                      value={city}
                    >
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    marginBottom: "5px",
                    fontSize: "16px",
                    color: "#0A195299",
                    lineHeight: "20.8px",
                  }}
                >
                  Ville d'arrivée
                </Typography>
                <Select
                  sx={{
                    borderRadius: "10px",
                    height: "36px",
                    color: "#0A195299",
                    fontFamily: "Chakra Petch",
                  }}
                  displayEmpty
                  value={tripForm.values.arrival_point}
                  onChange={(e) =>
                    tripForm.setFieldValue("arrival_point", e.target.value)
                  }
                  error={!!tripForm.errors.arrival_point}
                >
                  <MenuItem value="" disabled>
                    Sélectionner une ville d'arrivée
                  </MenuItem>
                  {citiesData?.map((city: string) => (
                    <MenuItem
                      sx={{ fontSize: "12px", color: "#0A195299" }}
                      key={city}
                      value={city}
                    >
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "29px",
                marginBottom: "15px",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    marginBottom: "5px",
                    fontSize: "16px",
                    color: "#0A195299",
                    lineHeight: "20.8px",
                  }}
                >
                  Durée du trajet
                </Typography>
                <TextField
                  name="duration"
                  variant="outlined"
                  value={tripForm.values.duration}
                  onChange={(e) =>
                    tripForm.setFieldValue("duration", e.target.value)
                  }
                  sx={{
                    width: "100%",
                    borderColor: "#0A1952",
                    textTransform: "none",
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      height: "36px",
                      color: "#0A195299",
                      fontFamily: "Chakra Petch",
                    },
                  }}
                  select
                >
                  {[
                     "01:00:00",
                     "01:30:00",
                     "02:00:00",
                     "02:30:00",
                     "03:00:00",
                     "03:30:00",
                     "04:00:00",
                     "04:30:00",
                     "05:00:00",
                     "05:30:00",
                     "06:00:00",
                     "06:30:00",
                     "07:00:00",
                     "07:30:00",
                     "08:00:00",
                  ].map((time) => (
                    <MenuItem
                      sx={{ fontSize: "12px", color: "#0A195299" }}
                      key={time}
                      value={time}
                    >
                      {time}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    marginBottom: "5px",
                    fontSize: "16px",
                    color: "#0A195299",
                    lineHeight: "20.8px",
                  }}
                >
                  Date et heure de départ
                </Typography>

                <TextField
                  name="departure"
                  type="datetime-local"
                  variant="outlined"
                  value={tripForm.values.departure}
                  onChange={(e) =>
                    tripForm.setFieldValue("departure", e.target.value)
                  }
                  error={!!tripForm.errors.departure}
                  helperText={tripForm.errors.departure}
                  sx={{
                    width: "100%",
                    borderColor: "#0A1952",
                    textTransform: "none",
                    borderRadius: "10px",
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
                        <Clock size={15} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "29px",
                marginBottom: "15px",
              }}
            >
              <FormControl sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    marginBottom: "5px",
                    fontSize: "16px",
                    color: "#0A195299",
                    lineHeight: "20.8px",
                  }}
                >
                  Véhicules
                </Typography>
                <Select
                  sx={{
                    borderRadius: "10px",
                    height: "36px",
                    color: "#0A195299",
                    fontFamily: "Chakra Petch",
                  }}
                  displayEmpty
                  value={tripForm.values.vehicle}
                  onChange={(e) =>
                    tripForm.setFieldValue("vehicle", e.target.value)
                  }
                >
                  <MenuItem value="" disabled>
                    Sélectionner un véhicule
                  </MenuItem>
                  {vehiclesData?.results?.map((v: Vehicle) => (
                    <MenuItem
                      sx={{ fontSize: "12px", color: "#0A195299" }}
                      key={v.pk}
                      value={v.pk}
                    >
                      {v.license_plate}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    marginBottom: "5px",
                    fontSize: "16px",
                    color: "#0A195299",
                    lineHeight: "20.8px",
                  }}
                >
                  Chauffeurs
                </Typography>
                <Select
                  sx={{
                    borderRadius: "10px",
                    height: "36px",
                    color: "#0A195299",
                    fontFamily: "Chakra Petch",
                  }}
                  displayEmpty
                  value={tripForm.values.driver}
                  onChange={(e) =>
                    tripForm.setFieldValue("driver", e.target.value)
                  }
                >
                  <MenuItem value="" disabled>
                    Sélectionner un chauffeur
                  </MenuItem>
                  {usersData?.results?.map((u: User) => (
                    <MenuItem
                      sx={{ fontSize: "12px", color: "#0A195299" }}
                      key={u.pk}
                      value={u.pk}
                    >
                      {u.first_name} {u.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ marginBottom: "45px" }}>
              <Typography
                sx={{
                  marginBottom: "5px",
                  fontSize: "16px",
                  color: "#0A195299",
                  lineHeight: "20.8px",
                }}
              >
                Price
              </Typography>
              <TextField
                name="price"
                variant="outlined"
                value={tripForm.values.price}
                onChange={(e) =>
                  tripForm.setFieldValue("price", e.target.value)
                }
                error={!!tripForm.errors.price}
                helperText={tripForm.errors.price}
                sx={{
                  width: "100%",
                  borderColor: "#0A1952",
                  textTransform: "none",
                  borderRadius: "10px",
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
            <Box
              sx={{
                display: "flex",
                width: "100%",

                paddingBottom: "39px",
              }}
              className="w-full flex justify-between items-center space-x-5"
            >
              <Button
                onClick={handleClose}
                sx={{
                  marginRight: "29px",
                  textTransform: "none",
                  borderRadius: "10px",
                  width: "100%",
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
                sx={{ textTransform: "none", borderRadius: "10px" }}
                color="error"
                loading={createTripMutation.isLoading}
                type="submit"
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
  );
}

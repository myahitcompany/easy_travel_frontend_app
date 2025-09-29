import {
  Box,
  Modal,
  Fade,
  Typography,
  Divider,
  FormControl,
  Select,
  Button,
  Backdrop,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Routing } from "iconsax-react";
import { useCreateBookings, useGetTripsList } from "../services";
import { BookingPayload, Trip, User } from "utilities";
import { useForm } from "@mantine/form";
import { useGetUsersList } from "@/features/Travel";

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

export function AddBooking({ open, handleClose }: ModalProps) {
  const { data: trips } = useGetTripsList();
  const { data: users } = useGetUsersList();

  const createBookingsMutation = useCreateBookings();

  const bookingForm = useForm<BookingPayload>({
    initialValues: {
      trip: "",
      passenger_count: null,
      user: "",
    },

    validate: {
      trip: (value) =>
        value ? null : "Veuillez sélectionner une ville de départ",
      passenger_count: (value) =>
        value && value > 0
          ? null
          : "Le nombre de passagers doit être supérieur à 0",
    },
  });

  const handleSubmit = (values: BookingPayload) => {
    try {
      createBookingsMutation.mutate(
        { ...values, passenger_count: Number(values.passenger_count) },
        {
          onSuccess: () => {
            handleClose();
          },
        }
      );
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
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
              Ajouter une réservation
            </Typography>
            <Divider
              sx={{ width: "100%", marginBottom: "30px" }}
              aria-hidden="true"
            />
            <form onSubmit={bookingForm.onSubmit(handleSubmit)}>
              <FormControl
                sx={{
                  width: "100%",
                  paddingLeft: "41px",
                  paddingRight: "41px",
                  marginBottom: "15px",
                }}
              >
                <Typography
                  sx={{
                    marginBottom: "5px",
                    fontSize: "16px",
                    color: "#0A195299",
                    lineHeight: "20.8px",
                  }}
                >
                  Voyage
                </Typography>
                <Select
                  sx={{
                    borderRadius: "10px",
                    height: "36px",
                    color: "#0A195299",
                    fontFamily: "Chakra Petch",
                  }}
                  displayEmpty
                  value={bookingForm.values.trip}
                  onChange={(e) =>
                    bookingForm.setFieldValue("trip", e.target.value)
                  }
                >
                  <MenuItem value="" disabled>
                    Sélectionner un voyage
                  </MenuItem>
                  {trips?.results?.map((v: Trip) => (
                    <MenuItem
                      sx={{ fontSize: "12px", color: "#0A195299" }}
                      key={v.pk}
                      value={v.pk}
                    >
                      {v.starting_point}-{v.arrival_point}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                sx={{
                  width: "100%",
                  paddingLeft: "41px",
                  paddingRight: "41px",
                  marginBottom: "15px",
                }}
              >
                <Typography
                  sx={{
                    marginBottom: "5px",
                    fontSize: "16px",
                    color: "#0A195299",
                    lineHeight: "20.8px",
                  }}
                >
                  Voyageurs
                </Typography>
                <Select
                  sx={{
                    borderRadius: "10px",
                    height: "36px",
                    color: "#0A195299",
                    fontFamily: "Chakra Petch",
                  }}
                  displayEmpty
                  value={bookingForm.values.user}
                  onChange={(e) =>
                    bookingForm.setFieldValue("user", e.target.value)
                  }
                >
                  <MenuItem value="" disabled>
                    Sélectionner un voyageur
                  </MenuItem>
                  {users?.results?.map((v: User) => (
                    <MenuItem
                      sx={{ fontSize: "12px", color: "#0A195299" }}
                      key={v.pk}
                      value={v.pk}
                    >
                      {v.first_name} {v.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box
                sx={{
                  width: "100%",
                  paddingLeft: "41px",
                  paddingRight: "41px",
                  marginBottom: "41px",
                }}
              >
                <Typography
                  sx={{
                    marginBottom: "5px",
                    fontSize: "16px",
                    color: "#0A195299",
                    lineHeight: "20.8px",
                  }}
                >
                  Nombre de passagé
                </Typography>
                <TextField
                  name="passenger_count"
                  variant="outlined"
                  value={bookingForm.values.passenger_count}
                  onChange={(e) =>
                    bookingForm.setFieldValue(
                      "passenger_count",
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  error={!!bookingForm.errors.passenger_count}
                  helperText={bookingForm.errors.passenger_count}
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
                  paddingLeft: "41px",
                  paddingRight: "41px",
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
                  type="submit"
                  loading={createBookingsMutation.isLoading}
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

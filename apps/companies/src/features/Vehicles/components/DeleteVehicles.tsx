import {
  Box,
  Modal,
  Fade,
  Typography,
  Divider,
  Button,
  Backdrop,
} from "@mui/material";
import { Vehicle } from "utilities";
import { useDeleteVehicule } from "../services";

interface ModalProps {
  openDeleteModal: boolean;
  handleCloseDeleteModal: () => void;
  vehicle: Vehicle;
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

export function DeleteVehicles({
  openDeleteModal,
  handleCloseDeleteModal,
  vehicle,
}: ModalProps) {
  const { mutate: deleteVehicle, isLoading } = useDeleteVehicule();

  const handleDelete = () => {
    deleteVehicle(vehicle.pk ?? "");
  };

  return (
    <div>
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        slots={{ backdrop: Backdrop }}
      >
        <Fade in={openDeleteModal} className="shadow-2xl !rounded-2xl">
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
              Suppression d'un véhicule
            </Typography>
            <Divider
              sx={{ width: "100%", marginBottom: "30px" }}
              aria-hidden="true"
            />
            <Box
              sx={{
                marginBottom: "24px",
                marginTop: "24px",
                marginLeft: "41px",
                fontSize: "16px",
                color: "#0A1952",
                lineHeight: "20.8px",
              }}
              id="demo-simple-select-label"
              className="mb-3"
            >
              Êtes-vous sûre de vouloir supprimer ce bus ?
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
                onClick={handleCloseDeleteModal}
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
                Non
              </Button>
              <Button
                fullWidth
                sx={{ textTransform: "none", borderRadius: "10px" }}
                color="error"
                className="bg-primary-orange-100 rounded-[10px] h-10 normal-case"
                variant="contained"
                onClick={handleDelete}
              >
                {isLoading ? "Suppression..." : "Supprimer le véhicule"}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

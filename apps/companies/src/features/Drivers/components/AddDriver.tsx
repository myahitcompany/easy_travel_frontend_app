import {
  Box,
  Modal,
  Fade,
  Typography,
  Divider,
  Button,
  Backdrop,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Call, Check, Profile, Sms } from "iconsax-react";

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

export function AddDriver({ open, handleClose }: ModalProps) {
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
              Ajouter un Chauffeurs
            </Typography>
            <Divider
              sx={{ width: "100%", marginBottom: "30px" }}
              aria-hidden="true"
            />

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
              <Box sx={{ marginRight: "29px", width: "100%" }}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#0A195299",
                    lineHeight: "20.8px",
                    marginBottom: "8px",
                  }}
                >
                  Nom
                </Typography>
                <TextField
                  fullWidth
                  id="input-with-icon-adornment"
                  sx={{
                    borderColor: "#0A195299",
                    textTransform: "none",
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Profile size={15} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#0A195299",
                    lineHeight: "20.8px",
                    marginBottom: "8px",
                  }}
                >
                  Prénom
                </Typography>
                <TextField
                  fullWidth
                  id="input-with-icon-adornment"
                  sx={{
                    borderColor: "#0A195299",
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Profile size={15} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                paddingRight: "41px",
                paddingLeft: "41px",
                paddingBottom: "39px",
              }}
              className="w-full flex justify-between items-center space-x-5"
            >
              <Box sx={{ marginRight: "29px", width: "100%" }}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#0A195299",
                    lineHeight: "20.8px",
                    marginBottom: "8px",
                  }}
                >
                  IFU
                </Typography>
                <TextField
                  fullWidth
                  id="input-with-icon-adornment"
                  sx={{
                    borderColor: "#0A195299",
                    textTransform: "none",
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Check size={15} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#0A195299",
                    lineHeight: "20.8px",
                    marginBottom: "8px",
                  }}
                >
                  Téléphone
                </Typography>
                <TextField
                  fullWidth
                  id="input-with-icon-adornment"
                  sx={{
                    borderColor: "#0A195299",
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Call size={15} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                paddingRight: "41px",
                paddingLeft: "41px",
                paddingBottom: "39px",
              }}
              className="w-full flex justify-between items-center space-x-5"
            >
              <Box sx={{ marginRight: "29px", width: "100%" }}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#0A195299",
                    lineHeight: "20.8px",
                    marginBottom: "8px",
                  }}
                >
                  Num Personnel d'Identification
                </Typography>
                <TextField
                  fullWidth
                  id="input-with-icon-adornment"
                  sx={{
                    borderColor: "#0A195299",
                    marginRight: "29px",
                    textTransform: "none",
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Check size={15} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#0A195299",
                    lineHeight: "20.8px",
                    marginBottom: "8px",
                  }}
                >
                  Email
                </Typography>

                <TextField
                  fullWidth
                  id="input-with-icon-adornment"
                  sx={{
                    borderColor: "#0A195299",

                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Sms size={15} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                paddingRight: "41px",
                paddingLeft: "41px",
                paddingBottom: "39px",
              }}
              className="w-full flex justify-between items-center space-x-5"
            >
              <div>
                <label className="block text-sm mb-1">Photo de profil</label>
                <div className="w-1 h-1 border-1 border-dashed rounded-md flex items-center justify-center cursor-pointer">
                  <input type="file" className="hidden" accept="image/*" />
                  <svg></svg>
                </div>
              </div>
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
                color="error"
                className="bg-primary-orange-100 rounded-[10px] h-10 normal-case"
                variant="contained"
              >
                Ajouter
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

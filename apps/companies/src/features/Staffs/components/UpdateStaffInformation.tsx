import { useGetRoles, useUpdateStaff } from "@/features";
import { useForm } from "@mantine/form";
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
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Profile, Sms } from "iconsax-react";
import { useEffect, useState } from "react";
import { CreateStaffPayload, Group, User } from "utilities";

interface ModalProps {
  openUpdateModal: boolean;
  handleCloseUpdateModal: () => void;
  user: User;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 620,
  bgcolor: "background.paper",
  border: "2px solid #fff ",
  borderRadius: "10px",
  boxShadow: 30,
};

export function UpdateStaffInformation({
  openUpdateModal,
  handleCloseUpdateModal,
  user,
}: ModalProps) {
  const [selectedRole, setSelectedRole] = useState("");

  const updateStaffMutation = useUpdateStaff(user.pk);
  const { data: roles, isLoading: rolesLoading } = useGetRoles();

  const staffForm = useForm<CreateStaffPayload>({
    initialValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      groups: { add: [] },
    },

    validate: {
      first_name: (value) => (value.length > 0 ? null : "Prénom requis"),
      last_name: (value) => (value.length > 0 ? null : "Nom requis"),
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Adresse email invalide",
    },
  });

  useEffect(() => {
    if (user && user.groups && user.groups.length > 0) {
      setSelectedRole(String(user.groups[0].pk));
    } else {
      setSelectedRole("");
    }
  }, [user]);

  const handleSubmit = (values: CreateStaffPayload) => {
    try {
      values.groups.add = [Number(selectedRole)];
      updateStaffMutation.mutate(values);
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };
  return (
    <div>
      <Modal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        slots={{ backdrop: Backdrop }}
      >
        <Fade in={openUpdateModal} className="shadow-2xl !rounded-2xl">
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
              Mettre à jour les informations d'un employé
            </Typography>
            <Divider
              sx={{ width: "100%", marginBottom: "30px" }}
              aria-hidden="true"
            />

            <form onSubmit={staffForm.onSubmit(handleSubmit)}>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  paddingRight: "41px",
                  paddingLeft: "41px",
                  paddingBottom: "10px",
                }}
                className="w-full flex justify-between items-center space-x-5"
              >
                <Box
                  sx={{
                    width: "100%",
                    marginRight: "29px",
                  }}
                >
                  <Typography
                    sx={{
                      marginBottom: "5px",
                      lineHeight: "20.8px",
                      fontSize: "16px",
                      color: "#0A195299",
                      fontFamily: "Chakra Petch",
                    }}
                  >
                    Nom
                  </Typography>
                  <TextField
                    {...staffForm.getInputProps("first_name")}
                    fullWidth
                    id="input-with-icon-adornment"
                    sx={{
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
                          <Profile size={15} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      marginBottom: "5px",
                      lineHeight: "20.8px",
                      fontSize: "16px",
                      color: "#0A195299",
                      fontFamily: "Chakra Petch",
                    }}
                  >
                    Prénoms
                  </Typography>
                  <TextField
                    {...staffForm.getInputProps("last_name")}
                    fullWidth
                    id="input-with-icon-adornment"
                    sx={{
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
                  paddingBottom: "10px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      marginBottom: "5px",
                      lineHeight: "20.8px",
                      fontSize: "16px",
                      color: "#0A195299",
                      fontFamily: "Chakra Petch",
                    }}
                  >
                    Adresse Email
                  </Typography>
                  <TextField
                    {...staffForm.getInputProps("email")}
                    fullWidth
                    id="input-with-icon-adornment"
                    sx={{
                      borderColor: "#0A1952",
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
                          <Sms size={15} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <FormControl
                sx={{
                  width: "100%",
                  paddingLeft: "41px",
                  paddingRight: "41px",
                  marginBottom: "45px",
                }}
              >
                <Typography
                  sx={{
                    marginBottom: "5px",
                    lineHeight: "20.8px",
                    fontSize: "16px",
                    color: "#0A195299",
                    fontFamily: "Chakra Petch",
                  }}
                >
                  Rôle
                </Typography>
                <Select
                  sx={{
                    borderRadius: "10px",
                    height: "36px",
                    fontSize: "16px",
                    color: "#0A195299",
                    fontFamily: "Chakra Petch",
                  }}
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  displayEmpty
                  disabled={rolesLoading}
                >
                  <MenuItem value="" disabled>
                    Sélectionner un rôle
                  </MenuItem>
                  {roles?.results?.map((role: Group) => (
                    <MenuItem
                      sx={{ fontSize: "12px", color: "#0A195299" }}
                      key={role.pk}
                      value={role.pk}
                    >
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

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
                  onClick={handleCloseUpdateModal}
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
    </div>
  );
}

import { useLogin } from "@/features";
import { useForm } from "@mantine/form";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Key, Sms } from "iconsax-react";
import { Link } from "react-router-dom";
import { LoginPayload } from "utilities";

export function Login() {
  const loginMutation = useLogin();

  const loginForm = useForm<LoginPayload>({
    initialValues: { email: "", password: "" },

    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Adresse email invalide'),
      password: (value) =>
        value.length >= 6 ? null : "Mot de passe trop court",
    },
  });

  const handleSubmit = (values: LoginPayload) => {
    loginMutation.mutate(values);
  };

  return (
    <div>
      <p className="text-center text-3xl mb-8">Se connecter</p>

      <form onSubmit={loginForm.onSubmit(handleSubmit)}>
        <Box sx={{ marginBottom: "26px", width: "100%" }}>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#0A1952",
              lineHeight: "20.8px",
              marginBottom: "8px",
              fontFamily: "Chakra Petch",
            }}
          >
            Email
          </Typography>
          <TextField
            {...loginForm.getInputProps("email")}
            fullWidth
            required
            type="email"
            id="input-with-icon-adornment"
            sx={{
              borderColor: "#0A195299",
              textTransform: "none",
              borderRadius: "10px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                // "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                //   borderColor: "red",
                // },
              },
            }}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Sms color="#D63A00" size={15} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#0A1952",
              lineHeight: "20.8px",
              marginBottom: "8px",
              fontFamily: "Chakra Petch",
            }}
          >
            Mot de passe
          </Typography>
          <TextField
            {...loginForm.getInputProps("password")}
            fullWidth
            required
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
                  <Key color="#D63A00" size={15} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <div className=" flex justify-end">
          <Link
            to="/auth/reset/reset-two-factor"
            className="text-primary-orange-100 text-xs leading-xs mt-6 mb-6 cursor-pointer"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <Button
          sx={{
            textTransform: "none",
            borderRadius: "10px",
          }}
          type="submit"
          loading={loginMutation.isLoading}
          fullWidth
          color="error"
          className="bg-primary-orange-100 rounded-[10px] h-10 normal-case text-white text-sm leading-md font-chakra"
          variant="outlined"
        >
          Se connecter
        </Button>
      </form>
    </div>
  );
}

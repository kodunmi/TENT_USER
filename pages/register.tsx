import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FormEvent } from "react";
import { TentTextField } from "../components";
import { AuthLayout } from "../layout";
import User from "remixicon-react/User2LineIcon";
import { useAppDispatch, useWindowDimensions } from "../hooks";
import Link from "next/link";
import { RegisterRequest, useRegisterMutation } from "../services";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

const Register = () => {
  // const { windowDimensions: { height, width } } = useWindowDimensions()
  const { enqueueSnackbar } = useSnackbar();
  const [formState, setFormState] = React.useState<RegisterRequest>({
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
  });

  const router = useRouter();

  const [repassword, setRepassword] = React.useState("");

  const [register, { isLoading }] = useRegisterMutation();

  const dispatch = useAppDispatch();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formState.password.length < 6) {
      enqueueSnackbar("password must be more than 6", {
        variant: "warning",
      });

      return;
    }

    if (formState.password !== repassword) {
      enqueueSnackbar("password does not match", {
        variant: "warning",
      });

      return;
    }

    try {
      const user = await register(formState).unwrap();

      enqueueSnackbar(user.data, {
        variant: "success",
        autoHideDuration: 50000,
      });

      router.push(`verify-email?email=${formState.email}`);

      console.log(user);
    } catch (err) {
      console.log(err);
      enqueueSnackbar(
        err.data ? err.data.message : "We could not process your request",
        {
          variant: "warning",
        }
      );
    }
  };
  return (
    <AuthLayout>
      <Box px={4} pt={12} pb={3}>
        <Typography variant="h5">
          <b>Register</b>
        </Typography>
        <Typography component="div" mb={7} variant="caption">
          Create your account
        </Typography>
        <form onSubmit={(e) => handleRegister(e)}>
          <Box
            sx={{
              height: { lg: `30%`, sm: "100%" },
              overflow: "scroll",
              mb: "10px",
            }}
          >
            <Typography variant="body1">Full Name</Typography>
            <TextField
              onChange={handleChange}
              required
              variant="outlined"
              sx={{
                border: "none",
                backgroundColor: "action.hover",
                borderRadius: "5px",
                mb: "20px",
              }}
              name="fullName"
              type="text"
              placeholder="enter full name"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User />
                  </InputAdornment>
                ),
              }}
            />
            <Typography variant="body1">Phone Number</Typography>
            <TextField
              onChange={handleChange}
              required
              error={formState.phoneNumber.match("") === null}
              variant="outlined"
              sx={{
                border: "none",
                backgroundColor: "action.hover",
                borderRadius: "5px",
                mb: "20px",
              }}
              name="phoneNumber"
              type="text"
              placeholder="enter phone number"
              fullWidth
              inputProps={{
                // pattern:"[0-9]{11}",
                startAdornment: (
                  <InputAdornment position="start">
                    <User />
                  </InputAdornment>
                ),
              }}
            />
            <Typography variant="body1">Email</Typography>
            <TextField
              variant="outlined"
              onChange={handleChange}
              required
              sx={{
                border: "none",
                backgroundColor: "action.hover",
                borderRadius: "5px",
                mb: "20px",
              }}
              name="email"
              type="email"
              placeholder="enter email"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User />
                  </InputAdornment>
                ),
              }}
            />
            <Typography variant="body1">Password</Typography>
            <TextField
              onChange={handleChange}
              required
              variant="outlined"
              sx={{
                border: "none",
                backgroundColor: "action.hover",
                borderRadius: "5px",
                mb: "20px",
              }}
              name="password"
              type="password"
              placeholder="enter email"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User />
                  </InputAdornment>
                ),
              }}
            />
            <Typography variant="body1">Confirm password</Typography>
            <TextField
              onChange={(e) => setRepassword(e.target.value)}
              required
              variant="outlined"
              sx={{
                border: "none",
                backgroundColor: "action.hover",
                borderRadius: "5px",
                mb: "20px",
              }}
              name="repassword"
              type="password"
              placeholder="Repeat password"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            size="large"
            color="neutral"
            variant="contained"
          >
            Register
          </Button>
        </form>

        <Typography align="center" component="div" mt={3} variant="caption">
          Already have an account, <Link href="/login">Login</Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default Register;

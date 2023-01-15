import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";

import { Button } from "@mui/material";

import { useAuth } from "./Auth";

import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation } from "react-router-dom";

function Login() {
  const [user, setUser] = useState(true);

  const Auth = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const location = useLocation();
  const schema = yup
    .object()
    .shape({
      Username: yup.string().email().required(),
      Password: yup
        .string()
        .min(8, "Password must be at least 8 characters long")
        .required(),
    })
    .required();

  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    Auth.getUserName(data.Username);
    setTimeout(() => {
      Auth.login(user);
      if (location.state) {
        navigate(location.state.url, {
          replace: true,
          state: { data: location.state.data },
        });
      } else {
        navigate("/", { replace: true });
      }
    }, 10);
  };
  return (
    <Dialog open={true}>
      <DialogTitle
        sx={{
          textAlign: "center",
          padding: "5px",
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "40px",
            height: "40px",
            backgroundColor: "#962727",
          }}
        >
          <LockIcon
            sx={{
              fontSize: "1.5rem",
            }}
          />
        </div>
        Log in
      </DialogTitle>
      <DialogContent
        sx={{
          marginTop: "5px",
        }}
      >
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Controller
            rules={{ require: true }}
            name="Username"
            control={methods.control}
            render={({ field }) => {
              return (
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  {...field}
                  sx={{
                    m: "5px 50px 6px",
                    width: "80%",
                  }}
                />
              );
            }}
          />
          {methods.formState.errors.Username && (
            <p
              style={{
                color: "rgb(215, 71, 66)",
                fontWeight: "bold",
              }}
            >
              {methods.formState.errors.Username.message}
            </p>
          )}
          <FormControl
            variant="outlined"
            sx={{
              m: "6px 50px",
              width: "80%",
            }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <Controller
              name="Password"
              rules={{ require: true }}
              control={methods.control}
              render={({ field }) => {
                return (
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    {...field}
                  />
                );
              }}
            />
          </FormControl>
          {methods.formState.errors.Password && (
            <p
              style={{
                color: "rgb(215, 71, 66)",
                fontWeight: "bold",
              }}
            >
              {methods.formState.errors.Password.message}
            </p>
          )}
          <Button
            sx={{
              width: "fit-content",
              backgroundColor: "#962727",
              color: "white",
              marginTop: "20px",
              width: "80%",
            }}
            type="submit"
          >
            Sign In
          </Button>
        </form>
      </DialogContent>
      {/* <DialogActions>
        <Button>Sign In</Button>
      </DialogActions> */}
    </Dialog>
  );
}

export default Login;

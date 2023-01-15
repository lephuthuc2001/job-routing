import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button, IconButton } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "./Auth";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar({ onSearch }) {
  const auth = useAuth();
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            p: "0 50px",
            justifyContent: "space-around",
            gap: "20%",
          }}
        >
          <div style={{ display: "flex", gap: "30px" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexShrink: 1, display: { xs: "none", sm: "block" } }}
            >
              Job Hunt
            </Typography>
            <div style={{ display: "flex", gap: "5px" }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => {
                    onSearch(e.target.value);
                  }}
                />
              </Search>
            </div>
          </div>
          {!auth.user ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LoginIcon />
              <Link
                to="login"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <Button color="inherit">Login</Button>
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => {
                  auth.logout();
                }}
              >
                <LogoutIcon />
              </Button>
              <Link
                to="login"
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <Typography color="inherit">{auth.name}</Typography>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

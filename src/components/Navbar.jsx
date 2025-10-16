import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Stack,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/digidial_logo.jpg";
import { useNavigate } from "react-router-dom";
import KYCForm from "../Pages/kyc/Kyc_details";

export const NAVBAR_HEIGHT = 48;

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // clear token
    navigate("/login");
  };

  const[openkyc, setOpenKyc] = useState(false);

  const handleOpenKyc = () => setOpenKyc(true);
  const handleCloseKyc = () => setOpenKyc(false);

  // const[]

  return (
    <>
    <AppBar
      position="fixed"
      sx={{
        height: `${NAVBAR_HEIGHT}px`,
        background: "#334155",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          minHeight: `${NAVBAR_HEIGHT}px !important`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left: Logo and Title */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            component="img"
            src={logo}
            alt="digidial"
            sx={{ height: 40, width: 40, borderRadius: "50%" }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            DigiDial
          </Typography>
        </Stack>

        {/* Right: Icons and Logout */}
        <Stack direction="row" spacing={1} alignItems="center">
          {/* <Tooltip title="Profile">
            <IconButton sx={{ color: "#fff" }}>
              <AccountCircleIcon />
            </IconButton>
          </Tooltip> */}

          <Button 
          variant="contained"
          color="primary"
          onClick={() => setOpenKyc(true)}
          sx={{ml:"1" , width:"120px", height:"34px", color:"white"}}
          >
          KYC Form
          </Button>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ ml: 1 }}
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
    {/* KYC Form Modal */}
      <Dialog open={openkyc} onClose={handleCloseKyc} fullWidth maxWidth="md">
        <DialogTitle sx={{fontWeight:"bold", pt:2}}>KYC Form</DialogTitle>
        <DialogContent>
          <KYCForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;





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


// import React, { useState, useMemo } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Stack,
//   Box,
//   Typography,
//   IconButton,
//   Tooltip,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   CssBaseline,
// } from "@mui/material";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import LogoutIcon from "@mui/icons-material/Logout";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import logo from "../assets/digidial_logo.jpg";
// import { useNavigate } from "react-router-dom";
// import KYCForm from "../Pages/kyc/Kyc_details";

// export const NAVBAR_HEIGHT = 48;

// const Navbar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/login");
//   };

//   const [openkyc, setOpenKyc] = useState(false);
//   const handleOpenKyc = () => setOpenKyc(true);
//   const handleCloseKyc = () => setOpenKyc(false);

//   // 🌙 Dark Mode State
//   const [darkMode, setDarkMode] = useState(false);

//   // 🌗 Theme Setup
//   const theme = useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode: darkMode ? "dark" : "light",
//           ...(darkMode
//             ? {
//                 background: {
//                   default: "#0f172a", // dark blue-gray
//                   paper: "#1e293b",
//                 },
//                 text: { primary: "#fff" },
//               }
//             : {
//                 background: {
//                   default: "#f1f5f9", // light gray
//                   paper: "#fff",
//                 },
//                 text: { primary: "#000" },
//               }),
//         },
//       }),
//     [darkMode]
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline /> {/* Ensures theme applies to all background colors */}

//       <AppBar
//         position="fixed"
//         sx={{
//           height: `${NAVBAR_HEIGHT}px`,
//           background: darkMode ? "#1e293b" : "#334155",
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//           transition: "background 0.3s ease",
//         }}
//       >
//         <Toolbar
//           sx={{
//             minHeight: `${NAVBAR_HEIGHT}px !important`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           {/* Left: Logo and Title */}
//           <Stack direction="row" spacing={1} alignItems="center">
//             <Box
//               component="img"
//               src={logo}
//               alt="digidial"
//               sx={{
//                 height: 40,
//                 width: 40,
//                 borderRadius: "50%",
//                 backgroundColor: "#fff",
//               }}
//             />
//             <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//               DigiDial
//             </Typography>
//           </Stack>

//           {/* Right: KYC + Dark Mode + Logout */}
//           <Stack direction="row" spacing={1} alignItems="center">
//             {/* 🌗 Dark Mode Toggle */}
//             <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
//               <IconButton
//                 onClick={() => setDarkMode(!darkMode)}
//                 color="inherit"
//                 sx={{
//                   border: "1px solid rgba(255,255,255,0.2)",
//                   ml: 1,
//                 }}
//               >
//                 {darkMode ? (
//                   <LightModeIcon sx={{ color: "#facc15" }} />
//                 ) : (
//                   <DarkModeIcon sx={{ color: "#fff" }} />
//                 )}
//               </IconButton>
//             </Tooltip>

//             {/* KYC Form Button */}
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleOpenKyc}
//               sx={{
//                 ml: 1,
//                 width: "120px",
//                 height: "34px",
//                 color: "white",
//               }}
//             >
//               KYC Form
//             </Button>

//             {/* Logout */}
//             <Button
//               variant="contained"
//               color="secondary"
//               startIcon={<LogoutIcon />}
//               onClick={handleLogout}
//               sx={{ ml: 1 }}
//             >
//               Logout
//             </Button>
//           </Stack>
//         </Toolbar>
//       </AppBar>

//       {/* 🧾 KYC Form Dialog */}
//       <Dialog open={openkyc} onClose={handleCloseKyc} fullWidth maxWidth="md">
//         <DialogTitle sx={{ fontWeight: "bold", pt: 2 }}>KYC Form</DialogTitle>
//         <DialogContent>
//           <KYCForm />
//         </DialogContent>
//       </Dialog>
//     </ThemeProvider>
//   );
// };

// export default Navbar;

// App.jsx
import React, { useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Global Theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          ...(darkMode
            ? {
                background: { default: "#0f172a", paper: "#1e293b" },
                text: { primary: "#fff" },
              }
            : {
                background: { default: "#f1f5f9", paper: "#fff" },
                text: { primary: "#000" },
              }),
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Navbar gets theme + toggle function */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Your App Layout */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "48px", // space for fixed navbar
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          transition: "all 0.3s ease",
        }}
      >
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <Outlet /> {/* your routes or pages */}
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default App;

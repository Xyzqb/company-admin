// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Link,
//   Paper,
//   Stack,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import axios from "axios";
// import logo from "../assets/digidial_logo.jpg";

// const BASE_URL = "https://digidial-admin.onrender.com";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     setError("");
//     if (!email || !password) {
//       setError("Please enter both email and password.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${BASE_URL}/api/admin/auth/login`,
//         { email, password },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       // Assuming API returns a token in response.data.token
//       const token = response.data?.token;

//       if (token) {
//         console.log("sahil",token);
//         localStorage.setItem("authToken", token); // Save token
//         navigate("/", { replace: true }); // Redirect to dashboard
//       } else {
//         setError("Login failed: Invalid response from server.");
//       }
//     } catch (err) {
//       console.error(err);
//       if (err.response?.data?.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("Login failed: Please check credentials or try again later.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "#f5f5f5",
//         px: 2,
//       }}
//     >
//       <Paper
//         elevation={5}
//         sx={{
//           width: { xs: "100%", sm: "400px" },
//           p: 4,
//           borderRadius: 3,
//           borderTop: "4px solid #1976d2",
//           borderBottom: "4px solid #1976d2",
//         }}
//       >
//         <Stack spacing={2} alignItems="center">
//           <Stack direction="row" spacing={0.5} alignItems="center">
//             <Box
//               component="img"
//               src={logo}
//               alt="DigiDial Logo"
//               sx={{ height: 40, width: 40, borderRadius: "50%" }}
//             />
//             <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//               DigiDial
//             </Typography>
//           </Stack>

//           <Typography variant="h5" fontWeight="bold">
//             Admin Login
//           </Typography>

//           <TextField
//             fullWidth
//             label="Company Admin Email/Username"
//             variant="outlined"
//             size="small"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
//           />

//           <TextField
//             fullWidth
//             label="Password"
//             type="password"
//             variant="outlined"
//             size="small"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
//           />

//           {error && <Alert severity="error">{error}</Alert>}

//           <Box width="100%" textAlign="left">
//             <Link href="#" underline="none" variant="body2" color="gray">
//               Forgot Password?
//             </Link>
//           </Box>

//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             size="small"
//             onClick={handleLogin}
//             disabled={loading}
//             sx={{ mt: 1, borderRadius: "60px", py: 1 }}
//           >
//             {loading ? <CircularProgress size={20} color="inherit" /> : "Login"}
//           </Button>

//           <Stack direction="row" spacing={0.5} alignItems="center" mt={2}>
//             <Box
//               component="img"
//               src={logo}
//               alt="Bitmax Logo"
//               sx={{ height: 30, width: 30, borderRadius: "50%" }}
//             />
//             <Typography variant="caption" fontWeight="bold">
//               Powered by{" "}
//               <span style={{ color: "#1976d2", fontWeight: "bold" }}>Bitmax</span>
//             </Typography>
//           </Stack>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// };

// export default Login;



import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Stack,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "../assets/digidial_logo.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // <-- new state

  const handleLogin = async () => {
    setError(""); // Clear any previous error

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true); // Show loader

    try {
      // Make POST request to your API
      const response = await axios.post(
        "https://digidial-admin.onrender.com/api/admin/auth/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Response example:
      // { token: "jwt_token_here", superAdmin: { id, name, email } }

      if (response.data.token) {
        // Save token in localStorage
        localStorage.setItem("authToken", response.data.token);

        console.log("Login successful, token saved.", response.data.token);

        // Optional: Save superAdmin info
        localStorage.setItem(
          "superAdmin",
          JSON.stringify(response.data.superAdmin)
        );

        // Navigate to dashboard or home page
        navigate("/", { replace: true });
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login API error:", err);

      // Extract error message from API response if exists
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false); // Hide loader
    }
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        px: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: { xs: "100%", sm: "400px" },
          p: 4,
          borderRadius: 3,
          borderTop: "4px solid #1976d2",
          borderBottom: "4px solid #1976d2",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Box
              component="img"
              src={logo}
              alt="DigiDial Logo"
              sx={{ height: 40, width: 40, borderRadius: "50%" }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              DigiDial
            </Typography>
          </Stack>

          <Typography variant="h5" fontWeight="bold">
            Admin Login
          </Typography>

          <TextField
            fullWidth
            label="Company Admin Email/Username"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
          />

          {/* Password Field with Show/Hide */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"} // toggle password
            variant="outlined"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}

          <Box width="100%" textAlign="left">
            <Link href="#" underline="none" variant="body2" color="gray">
              Forgot Password?
            </Link>
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Login"}
          </Button>

          <Stack direction="row" spacing={0.5} alignItems="center" mt={2}>
            <Box
              component="img"
              src={logo}
              alt="Bitmax Logo"
              sx={{ height: 30, width: 30, borderRadius: "50%" }}
            />
            <Typography variant="caption" fontWeight="bold">
              Powered by{" "}
              <span style={{ color: "#1976d2", fontWeight: "bold" }}>
                Bitmax
              </span>
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;

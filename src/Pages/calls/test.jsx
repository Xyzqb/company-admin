//  full working code with api

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Stack,
//   Table,
//   TableHead,
//   TableCell,
//   TableRow,
//   TableBody,
//   TableContainer,
//   CircularProgress,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import axios from "axios";

// const BASE_URL = "https://superfone-admin-xw3b.onrender.com";

// const CallHistory = () => {
//   const [calls, setCalls] = useState([]);
//   const [allCalls, setAllCalls] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchId, setSearchId] = useState("");
//   const [searchTeamId, setSearchTeamId] = useState("");
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyIiwiZW1haWwiOiJhZG1pbkBhYmNkLmNvbSIsImdsb2JhbF9yb2xlIjoiYWRtaW4iLCJjb21wYW55X2lkIjoiMiIsImlhdCI6MTc2MTY0MjA2OSwiZXhwIjoxNzYxNzI4NDY5fQ.g6WfKTHi0Nn9j0IFPl9aogavZhsM2LsYg9ONUlt8T9k";
//   const showSnackbar = (message, severity) =>
//     setSnackbar({ open: true, message, severity });

//   // 🔹 Fetch all calls
//   const fetchAllCalls = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/admin/calls`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       // ✅ extract the array from `calls`
//       const data = res.data?.calls || [];
//       setCalls(data);
//       setAllCalls(data);
//     } catch (err) {
//       console.error("Fetch all calls error:", err.response || err.message);
//       showSnackbar(
//         err.response?.status === 401
//           ? "Unauthorized! Check your token."
//           : "Server error! Could not load calls.",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCallById = async (id) => {
//   if (!id.trim()) {
//     showSnackbar("Enter call ID", "warning");
//     return;
//   }
//   setLoading(true);
//   try {
//     const res = await axios.get(`${BASE_URL}/api/admin/calls/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const callData = res.data?.call || res.data;
//     setCalls([callData]);
//     showSnackbar("Call found!", "success");
//     setSearchId(""); // ✅ Clear search bar
//   } catch (err) {
//     console.error("Fetch call by ID error:", err.response || err.message);
//     setCalls([]);
//     showSnackbar(
//       err.response?.status === 401
//         ? "Unauthorized! Check your token."
//         : "No call found with that ID!",
//       "error"
//     );
//   } finally {
//     setLoading(false);
//   }
// };

// const fetchCallsByTeamId = async (teamId) => {
//   setLoading(true);
//   try {
//     let data = [];
//     if (!teamId.trim()) {
//       const res = await axios.get(`${BASE_URL}/api/admin/calls`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       data = res.data?.calls || [];
//     } else {
//       const res = await axios.get(`${BASE_URL}/api/admin/calls/filter`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { teamId },
//       });
//       data = res.data?.calls || [];
//     }

//     setCalls(data);
//     showSnackbar(
//       data.length
//         ? teamId
//           ? "Filtered calls loaded!"
//           : "All calls loaded!"
//         : "No calls found!",
//       data.length ? "success" : "info"
//     );
//     setSearchTeamId(""); // ✅ Clear search bar
//   } catch (err) {
//     console.error("Filter calls error:", err.response || err.message);
//     setCalls([]);
//     showSnackbar(
//       err.response?.status === 401
//         ? "Unauthorized! Check your token."
//         : "Server error! Could not load calls.",
//       "error"
//     );
//   } finally {
//     setLoading(false);
//   }
// };

//   console.log("Current calls state:", calls);

//   // 🔹 Clear search
//   const clearSearch = () => {
//     setSearchId("");
//     setSearchTeamId("");
//     setCalls(allCalls);
//     showSnackbar("Showing all calls", "info");
//   };

//   useEffect(() => {
//     fetchAllCalls();
//   }, []);

//   return (
//     <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
//       <Typography variant="h4" mb={2} fontWeight="bold">
//         Call Details
//       </Typography>

//       {/* Search Section */}
//       <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Search Calls
//         </Typography>
//         <Stack
//           direction={{ xs: "column", md: "row" }}
//           spacing={2}
//           alignItems="flex-end"
//         >
//           <Box sx={{ flex: 1 }}>
//             <TextField
//               label="Search by Call ID"
//               value={searchId}
//               onChange={(e) => setSearchId(e.target.value)}
//               fullWidth
//               size="small"
//             />
//             <Button
//               variant="contained"
//               sx={{ mt: 1, width: "100%" }}
//               onClick={() => fetchCallById(searchId)}
//             >
//               Search by ID
//             </Button>
//           </Box>

//           <Box sx={{ flex: 1 }}>
//             <TextField
//               label="Search by Team ID"
//               value={searchTeamId}
//               onChange={(e) => setSearchTeamId(e.target.value)}
//               fullWidth
//               size="small"
//             />
//             <Button
//               variant="contained"
//               sx={{ mt: 1, width: "100%" }}
//               onClick={() => fetchCallsByTeamId(searchTeamId)}
//             >
//               Search by Team ID
//             </Button>
//           </Box>

//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => fetchCallsByTeamId("")} // pass empty string to fetch all
//             sx={{ height: "35px" }}
//           >
//             Show All
//           </Button>
//         </Stack>
//       </Paper>

//       {/* Calls Table */}
//       <Paper sx={{ p: 2 }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Call List {calls.length > 0 && `(${calls.length})`}
//         </Typography>

//         {loading ? (
//           <Box sx={{ textAlign: "center", py: 3 }}>
//             <CircularProgress />
//             <Typography sx={{ mt: 1 }}>Loading calls...</Typography>
//           </Box>
//         ) : calls.length > 0 ? (
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
//                   <TableCell align="center">
//                     <strong>Call ID</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Team ID</strong>
//                   </TableCell>{" "}
//                   {/* Added */}
//                   <TableCell align="center">
//                     <strong>From Number</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>To Number</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Status</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Duration</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Started At</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {calls.map((call, idx) => (
//                   <TableRow
//                     key={call.id || idx}
//                     sx={{
//                       "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
//                       "&:hover": { backgroundColor: "#f5f5f5" },
//                     }}
//                   >
//                     <TableCell align="center">{call.id || "N/A"}</TableCell>
//                     <TableCell align="center">
//                       {call.team_id || "N/A"}
//                     </TableCell>{" "}
//                     {/* Corrected */}
//                     <TableCell align="center">
//                       {call.from_number || "N/A"}
//                     </TableCell>
//                     <TableCell align="center">
//                       {call.to_number || "N/A"}
//                     </TableCell>
//                     <TableCell align="center">{call.status || "N/A"}</TableCell>
//                     <TableCell align="center">
//                       {call.duration
//                         ? typeof call.duration === "object"
//                           ? `${call.duration.seconds || 0}s`
//                           : call.duration
//                         : "N/A"}
//                     </TableCell>
//                     <TableCell align="center">
//                       {call.started_at
//                         ? new Date(call.started_at).toLocaleString()
//                         : "N/A"}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           <Box sx={{ textAlign: "center", py: 4 }}>
//             <Typography variant="h6" color="text.secondary">
//               No calls found
//             </Typography>
//             <Button variant="outlined" onClick={clearSearch} sx={{ mt: 1 }}>
//               Refresh List
//             </Button>
//           </Box>
//         )}
//       </Paper>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           severity={snackbar.severity}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default CallHistory;


// with crecoding button only 


// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Stack,
//   Table,
//   TableHead,
//   TableCell,
//   TableRow,
//   TableBody,
//   TableContainer,
//   CircularProgress,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import axios from "axios";

// const BASE_URL = "https://superfone-admin-xw3b.onrender.com";

// const CallHistory = () => {
//   const [calls, setCalls] = useState([]);
//   const [allCalls, setAllCalls] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchId, setSearchId] = useState("");
//   const [searchTeamId, setSearchTeamId] = useState("");
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyIiwiZW1haWwiOiJhZG1pbkBhYmNkLmNvbSIsImdsb2JhbF9yb2xlIjoiYWRtaW4iLCJjb21wYW55X2lkIjoiMiIsImlhdCI6MTc2MTY0MjA2OSwiZXhwIjoxNzYxNzI4NDY5fQ.g6WfKTHi0Nn9j0IFPl9aogavZhsM2LsYg9ONUlt8T9k";
//   const showSnackbar = (message, severity) =>
//     setSnackbar({ open: true, message, severity });

//   // 🔹 Fetch all calls
//   const fetchAllCalls = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/admin/calls`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       // ✅ extract the array from `calls`
//       const data = res.data?.calls || [];
//       setCalls(data);
//       setAllCalls(data);
//     } catch (err) {
//       console.error("Fetch all calls error:", err.response || err.message);
//       showSnackbar(
//         err.response?.status === 401
//           ? "Unauthorized! Check your token."
//           : "Server error! Could not load calls.",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCallById = async (id) => {
//   if (!id.trim()) {
//     showSnackbar("Enter call ID", "warning");
//     return;
//   }
//   setLoading(true);
//   try {
//     const res = await axios.get(`${BASE_URL}/api/admin/calls/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const callData = res.data?.call || res.data;
//     setCalls([callData]);
//     showSnackbar("Call found!", "success");
//     setSearchId(""); // ✅ Clear search bar
//   } catch (err) {
//     console.error("Fetch call by ID error:", err.response || err.message);
//     setCalls([]);
//     showSnackbar(
//       err.response?.status === 401
//         ? "Unauthorized! Check your token."
//         : "No call found with that ID!",
//       "error"
//     );
//   } finally {
//     setLoading(false);
//   }
// };

// const fetchCallsByTeamId = async (teamId) => {
//   setLoading(true);
//   try {
//     let data = [];
//     if (!teamId.trim()) {
//       const res = await axios.get(`${BASE_URL}/api/admin/calls`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       data = res.data?.calls || [];
//     } else {
//       const res = await axios.get(`${BASE_URL}/api/admin/calls/filter`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { teamId },
//       });
//       data = res.data?.calls || [];
//     }

//     setCalls(data);
//     showSnackbar(
//       data.length
//         ? teamId
//           ? "Filtered calls loaded!"
//           : "All calls loaded!"
//         : "No calls found!",
//       data.length ? "success" : "info"
//     );
//     setSearchTeamId(""); // ✅ Clear search bar
//   } catch (err) {
//     console.error("Filter calls error:", err.response || err.message);
//     setCalls([]);
//     showSnackbar(
//       err.response?.status === 401
//         ? "Unauthorized! Check your token."
//         : "Server error! Could not load calls.",
//       "error"
//     );
//   } finally {
//     setLoading(false);
//   }
// };

//   console.log("Current calls state:", calls);

//   // 🔹 Clear search
//   const clearSearch = () => {
//     setSearchId("");
//     setSearchTeamId("");
//     setCalls(allCalls);
//     showSnackbar("Showing all calls", "info");
//   };

//   useEffect(() => {
//     fetchAllCalls();
//   }, []);

//   return (
//     <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
//       <Typography variant="h4" mb={2} fontWeight="bold">
//         Call Details
//       </Typography>

//       {/* Search Section */}
//       <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Search Calls
//         </Typography>
//         <Stack
//           direction={{ xs: "column", md: "row" }}
//           spacing={2}
//           alignItems="flex-end"
//         >
//           <Box sx={{ flex: 1 }}>
//             <TextField
//               label="Search by Call ID"
//               value={searchId}
//               onChange={(e) => setSearchId(e.target.value)}
//               fullWidth
//               size="small"
//             />
//             <Button
//               variant="contained"
//               sx={{ mt: 1, width: "100%" }}
//               onClick={() => fetchCallById(searchId)}
//             >
//               Search by ID
//             </Button>
//           </Box>

//           <Box sx={{ flex: 1 }}>
//             <TextField
//               label="Search by Team ID"
//               value={searchTeamId}
//               onChange={(e) => setSearchTeamId(e.target.value)}
//               fullWidth
//               size="small"
//             />
//             <Button
//               variant="contained"
//               sx={{ mt: 1, width: "100%" }}
//               onClick={() => fetchCallsByTeamId(searchTeamId)}
//             >
//               Search by Team ID
//             </Button>
//           </Box>

//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => fetchCallsByTeamId("")} // pass empty string to fetch all
//             sx={{ height: "35px" }}
//           >
//             Show All
//           </Button>
//         </Stack>
//       </Paper>

//       {/* Calls Table */}
//       <Paper sx={{ p: 2 }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Call List {calls.length > 0 && `(${calls.length})`}
//         </Typography>

//         {loading ? (
//           <Box sx={{ textAlign: "center", py: 3 }}>
//             <CircularProgress />
//             <Typography sx={{ mt: 1 }}>Loading calls...</Typography>
//           </Box>
//         ) : calls.length > 0 ? (
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
//                   <TableCell align="center">
//                     <strong>Call ID</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Team ID</strong>
//                   </TableCell>{" "}
//                   {/* Added */}
//                   <TableCell align="center">
//                     <strong>From Number</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>To Number</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Status</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Duration</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Started At</strong>
//                   </TableCell>
//                    <TableCell align="center">
//                     <strong>Recording</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {calls.map((call, idx) => (
//                   <TableRow
//                     key={call.id || idx}
//                     sx={{
//                       "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
//                       "&:hover": { backgroundColor: "#f5f5f5" },
//                     }}
//                   >
//                     <TableCell align="center">{call.id || "N/A"}</TableCell>
//                     <TableCell align="center">
//                       {call.team_id || "N/A"}
//                     </TableCell>{" "}
//                     {/* Corrected */}
//                     <TableCell align="center">
//                       {call.from_number || "N/A"}
//                     </TableCell>
//                     <TableCell align="center">
//                       {call.to_number || "N/A"}
//                     </TableCell>
//                     <TableCell align="center">{call.status || "N/A"}</TableCell>
//                     <TableCell align="center">
//                       {call.duration
//                         ? typeof call.duration === "object"
//                           ? `${call.duration.seconds || 0}s`
//                           : call.duration
//                         : "N/A"}
//                     </TableCell>
//                     <TableCell align="center">
//                       {call.started_at
//                         ? new Date(call.started_at).toLocaleString()
//                         : "N/A"}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           <Box sx={{ textAlign: "center", py: 4 }}>
//             <Typography variant="h6" color="text.secondary">
//               No calls found
//             </Typography>
//             <Button variant="outlined" onClick={clearSearch} sx={{ mt: 1 }}>
//               Refresh List
//             </Button>
//           </Box>
//         )}
//       </Paper>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           severity={snackbar.severity}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default CallHistory;

// .....call detail table format...
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Stack,
//   Table,
//   TableHead,
//   TableCell,
//   TableRow,
//   TableBody,
//   TableContainer,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import axios from "axios";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import DownloadIcon from "@mui/icons-material/Download";

// const BASE_URL = "https://superfone-admin-xw3b.onrender.com";

// const CallHistory = () => {
//   const [calls, setCalls] = useState([]);
//   const [allCalls, setAllCalls] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchId, setSearchId] = useState("");
//   const [searchTeamId, setSearchTeamId] = useState("");
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyIiwiZW1haWwiOiJhZG1pbkBhYmNkLmNvbSIsImdsb2JhbF9yb2xlIjoiYWRtaW4iLCJjb21wYW55X2lkIjoiMiIsImlhdCI6MTc2MjMzODk3MiwiZXhwIjoxNzYyNDI1MzcyfQ.zrDc5GM2GEs-dl2w5y_KY8SJJyM63Li_muqmWSju5cQ";
//   const showSnackbar = (message, severity) =>
//     setSnackbar({ open: true, message, severity });

//   // 🔹 Fetch all calls
//   const fetchAllCalls = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/admin/calls`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = res.data?.calls || [];
//       setCalls(data);
//       setAllCalls(data);
//     } catch (err) {
//       console.error("Fetch all calls error:", err.response || err.message);
//       showSnackbar(
//         err.response?.status === 401
//           ? "Unauthorized! Check your token."
//           : "Server error! Could not load calls.",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Fetch call by ID
//   const fetchCallById = async (id) => {
//     if (!id.trim()) return showSnackbar("Enter call ID", "warning");
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/admin/calls/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const callData = res.data?.call || res.data;
//       setCalls([callData]);
//       showSnackbar("Call found!", "success");
//       setSearchId("");
//     } catch (err) {
//       console.error("Fetch call by ID error:", err.response || err.message);
//       setCalls([]);
//       showSnackbar(
//         err.response?.status === 401
//           ? "Unauthorized! Check your token."
//           : "No call found with that ID!",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Fetch calls by team ID
//   const fetchCallsByTeamId = async (teamId) => {
//     setLoading(true);
//     try {
//       let data = [];
//       if (!teamId.trim()) {
//         const res = await axios.get(`${BASE_URL}/api/admin/calls`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         data = res.data?.calls || [];
//       } else {
//         const res = await axios.get(`${BASE_URL}/api/admin/calls/filter`, {
//           headers: { Authorization: `Bearer ${token}` },
//           params: { teamId },
//         });
//         data = res.data?.calls || [];
//       }

//       setCalls(data);
//       showSnackbar(
//         data.length
//           ? teamId
//             ? "Filtered calls loaded!"
//             : "All calls loaded!"
//           : "No calls found!",
//         data.length ? "success" : "info"
//       );
//       setSearchTeamId("");
//     } catch (err) {
//       console.error("Filter calls error:", err.response || err.message);
//       setCalls([]);
//       showSnackbar(
//         err.response?.status === 401
//           ? "Unauthorized! Check your token."
//           : "Server error! Could not load calls.",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Clear search
//   const clearSearch = () => {
//     setSearchId("");
//     setSearchTeamId("");
//     setCalls(allCalls);
//     showSnackbar("Showing all calls", "info");
//   };

//   useEffect(() => {
//     fetchAllCalls();
//   }, []);

//   return (
//     <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
//       <Typography variant="h5" mb={2} fontWeight="bold">
//         Call Details
//       </Typography>

//       {/* 🔹 Search Section */}
//       <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Search Calls
//         </Typography>
//         <Stack
//           direction={{ xs: "column", md: "row" }}
//           spacing={2}
//           alignItems="flex-end"
//         >
//           <Box sx={{ flex: 1 }}>
//             <TextField
//               label="Search by Call ID"
//               value={searchId}
//               onChange={(e) => setSearchId(e.target.value)}
//               fullWidth
//               size="small"
//             />
//             <Button
//               variant="contained"
//               sx={{ mt: 1, width: "100%" }}
//               onClick={() => fetchCallById(searchId)}
//             >
//               Search by ID
//             </Button>
//           </Box>

//           <Box sx={{ flex: 1 }}>
//             <TextField
//               label="Search by Team ID"
//               value={searchTeamId}
//               onChange={(e) => setSearchTeamId(e.target.value)}
//               fullWidth
//               size="small"
//             />
//             <Button
//               variant="contained"
//               sx={{ mt: 1, width: "100%" }}
//               onClick={() => fetchCallsByTeamId(searchTeamId)}
//             >
//               Search by Team ID
//             </Button>
//           </Box>

//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => fetchCallsByTeamId("")}
//             sx={{ height: "35px" }}
//           >
//             Show All
//           </Button>
//         </Stack>
//       </Paper>

//       {/* 🔹 Calls Table */}
//       <Paper sx={{ p: 2 }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Call List {calls.length > 0 && `(${calls.length})`}
//         </Typography>

//         {loading ? (
//           <Box sx={{ textAlign: "center", py: 3 }}>
//             <CircularProgress />
//             <Typography sx={{ mt: 1 }}>Loading calls...</Typography>
//           </Box>
//         ) : calls.length > 0 ? (
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
//                   <TableCell align="center">
//                     <strong>Call ID</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Team ID</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>From Number</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>To Number</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Status</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Duration</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Started At</strong>
//                   </TableCell>
//                   <TableCell align="center">
//                     <strong>Recording</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {calls.map((call, idx) => (
//                   <TableRow
//                     key={call.id || idx}
//                     sx={{
//                       "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
//                       "&:hover": { backgroundColor: "#f5f5f5" },
//                     }}
//                   >
//                     <TableCell align="center">{call.id || "N/A"}</TableCell>
//                     <TableCell align="center">{call.team_id || "N/A"}</TableCell>
//                     <TableCell align="center">{call.from_number || "N/A"}</TableCell>
//                     <TableCell align="center">{call.to_number || "N/A"}</TableCell>
//                     <TableCell align="center">{call.status || "N/A"}</TableCell>
//                     <TableCell align="center">
//                       {call.duration
//                         ? typeof call.duration === "object"
//                           ? `${call.duration.seconds || 0}s`
//                           : call.duration
//                         : "N/A"}
//                     </TableCell>
//                     <TableCell align="center">
//                       {call.started_at
//                         ? new Date(call.started_at).toLocaleString()
//                         : "N/A"}
//                     </TableCell>

//                     {/* 🎧 Recording Column */}
//                     <TableCell align="center">
//                       {call.recording_url ? (
//                         <>
//                           <Tooltip title="Play Recording">
//                             <IconButton
//                               color="primary"
//                               href={call.recording_url}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                             >
//                               <PlayArrowIcon />
//                             </IconButton>
//                           </Tooltip>

//                           <Tooltip title="Download Recording">
//                             <IconButton
//                               color="secondary"
//                               href={call.recording_url}
//                               download
//                             >
//                               <DownloadIcon />
//                             </IconButton>
//                           </Tooltip>
//                         </>
//                       ) : (
//                         <Typography color="text.secondary">No Recording</Typography>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           <Box sx={{ textAlign: "center", py: 4 }}>
//             <Typography variant="h6" color="text.secondary">
//               No calls found
//             </Typography>
//             <Button variant="outlined" onClick={clearSearch} sx={{ mt: 1 }}>
//               Refresh List
//             </Button>
//           </Box>
//         )}
//       </Paper>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           severity={snackbar.severity}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default CallHistory;
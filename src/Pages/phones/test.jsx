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

// const PhonesPage = () => {
//   const BASE_URL = "https://superfone-admin-xw3b.onrender.com";

//   const token = localStorage.getItem("authToken");

//   const [phones, setPhones] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Search / Filter
//   const [searchTeamId, setSearchTeamId] = useState("");

//   // Phone Form
//   const [phoneForm, setPhoneForm] = useState({
//     id: "", // 🆕 Added id field
//     number: "",
//     userId: "",
//     teamId: "",
//   });

//   // Snackbar
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const showSnackbar = (message, severity) =>
//     setSnackbar({ open: true, message, severity });

//   const fetchPhones = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/admin/phones`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setPhones(res.data);
//     } catch (err) {
//       console.error("Failed to fetch phones:", err);
//     }
//   };

//   // Filter by Team
//   const filterByTeam = async () => {
//     if (!searchId.trim()) return showSnackbar("Enter Team ID", "warning");
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/admin/phones/teams/${searchTeamId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       if (res.data?.length) {
//         setPhones(res.data || []);
//         showSnackbar("Phones found for this team!", "success");
//       } else {
//         setPhones([]);
//         showSnackbar("No phones for this team!", "info");
//       }
//     } catch (err) {
//       console.error("Error filtering phones:", err);
//       showSnackbar("Failed to fetch team phones", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Clear filter
//   const clearFilter = () => {
//     setSearchTeam_id("");
//     setPhones();
//     showSnackbar("Showing all phone numbers", "info");
//   };

//   // ✅ Add new phone number
//   const addPhone = async () => {
//     const { number, userId } = phoneForm;
//     if (!number || !userId) return showSnackbar("Fill all fields", "warning");

//     try {
//       // const token = localStorage.getItem("token");
//       const token =
//         localStorage.getItem("token");
//         `${BASE_URL}/api/admin/phones`,
//         { number, userId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       showSnackbar(res.data?.message || "Phone added successfully!", "success");
//       fetchPhones();
//       setPhoneForm({ number: "", userId: "" });
//     } catch (err) {
//       console.error("Add phone error:", err);
//       showSnackbar("Failed to add phone number", "error");
//     }
//   };

//   // ✅ Delete phone
//   const deletePhone = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}/api/admin/phones/delete:${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       showSnackbar("Phone deleted!", "info");
//       fetchPhones();
//     } catch (err) {
//       console.error("Delete phone error:", err);
//       showSnackbar("Failed to delete phone", "error");
//     }
//   };

//   useEffect(() => {
//     fetchPhones();
//   }, []);

//   return (
//     <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
//       <Typography variant="h4" mb={2} fontWeight="bold">
//         Phone Numbers Management
//       </Typography>

//       {/* SEARCH SECTION */}
//       <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Filter Phone Numbers
//         </Typography>
//         <Stack
//           direction={{ xs: "column", md: "row" }}
//           spacing={2}
//           alignItems="flex-end"
//         >
//           <Box sx={{ flex: 1 }}>
//             <TextField
//               label="Filter by Team ID"
//               value={searchTeamId}
//               onChange={(e) => setSearchTeamId(e.target.value)}
//               fullWidth
//               size="small"
//             />
//             <Button
//               variant="outlined"
//               onClick={filterByTeam}
//               sx={{
//                 mt: 1,
//                 width: "100%",
//                 bgcolor: "primary.main",
//                 color: "white",
//               }}
//             >
//               Filter by Team
//             </Button>
//           </Box>

//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={clearFilter}
//             sx={{ height: "35px" }}
//           >
//             Show All
//           </Button>
//         </Stack>
//       </Paper>

//       {/* ADD PHONE FORM */}
//       <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f1f8e9" }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Add New Phone Number
//         </Typography>
//         <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
//           <TextField
//             label="ID" // 🆕 new field
//             value={phoneForm.id}
//             onChange={(e) => setPhoneForm({ ...phoneForm, id: e.target.value })}
//             size="small"
//             fullWidth
//           />
//           <TextField
//             label="Phone Number"
//             value={phoneForm.number}
//             onChange={(e) =>
//               setPhoneForm({ ...phoneForm, number: e.target.value })
//             }
//             size="small"
//             fullWidth
//           />
//           <TextField
//             label="User ID"
//             value={phoneForm.userId}
//             onChange={(e) =>
//               setPhoneForm({ ...phoneForm, userId: e.target.value })
//             }
//             size="small"
//             fullWidth
//           />
//           <TextField
//             label="Team ID"
//             value={phoneForm.teamId}
//             onChange={(e) =>
//               setPhoneForm({ ...phoneForm, teamId: e.target.value })
//             }
//             size="small"
//             fullWidth
//           />
//         </Stack>
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ mt: 2 }}
//           onClick={addPhone}
//         >
//           Add Phone
//         </Button>
//       </Paper>

//       {/* PHONE TABLE */}
//       <Paper sx={{ p: 2 }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Phone List {phones?.length < 10 && `(${phones?.length})`}
//         </Typography>

//         {loading ? (
//           <Box sx={{ textAlign: "center", py: 3 }}>
//             <CircularProgress />
//             <Typography sx={{ mt: 1 }}>Loading phone numbers...</Typography>
//           </Box>
//         ) : phones?.length > 0 ? (
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
//                   <TableCell>
//                     <strong>ID</strong>
//                   </TableCell>{" "}
//                   {/* 🆕 added */}
//                   <TableCell>
//                     <strong>Phone Number</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>User ID</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Team ID</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Action</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {phones.map((phone, index) => (
//                   <TableRow
//                     key={phone.id || index}
//                     sx={{
//                       "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
//                       "&:hover": { backgroundColor: "#f5f5f5" },
//                     }}
//                   >
//                     <TableCell>{phone.id}</TableCell> {/* 🆕 show id */}
//                     <TableCell
//                       sx={{ fontFamily: "monospace", fontSize: "0.9rem" }}
//                     >
//                       {phone.number}
//                     </TableCell>
//                     <TableCell>{phone.userId}</TableCell>
//                     <TableCell>{phone.team_id}</TableCell>
//                     <TableCell>
//                       <Button
//                         size="small"
//                         variant="outlined"
//                         color="error"
//                         onClick={() => deletePhone(phone.number)}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           <Box sx={{ textAlign: "center", py: 4 }}>
//             <Typography variant="h6" color="text.secondary">
//               No phone numbers found
//             </Typography>
//             <Button variant="outlined" onClick={clearFilter} sx={{ mt: 1 }}>
//               Refresh List
//             </Button>
//           </Box>
//         )}
//       </Paper>

//       {/* SNACKBAR */}
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

// export default PhonesPage;


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

// const PhonesPage = () => {
//   const BASE_URL = "https://superfone-admin-xw3b.onrender.com";
//   const token = localStorage.getItem("authToken");

//   const [phones, setPhones] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTeamId, setSearchTeamId] = useState("");

//   const [phoneForm, setPhoneForm] = useState({
//     phone: "",
//     userId: "",
//     teamId: "",
//   });

//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const showSnackbar = (message, severity) =>
//     setSnackbar({ open: true, message, severity });

//   // ✅ Fetch all phones
//   const fetchPhones = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/admin/phones`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPhones(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch phones:", err);
//       showSnackbar("Failed to load phones", "error");
//     }
//   };

//   // ✅ Filter phones by team
//   const filterByTeam = async () => {
//     if (!searchTeamId.trim()) return showSnackbar("Enter Team ID", "warning");
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/admin/phones/teams/${searchTeamId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (res.data?.length) {
//         setPhones(res.data);
//         showSnackbar("Phones found for this team!", "success");
//       } else {
//         setPhones([]);
//         showSnackbar("No phones found for this team", "info");
//       }
//     } catch (err) {
//       console.error("Error filtering phones:", err);
//       showSnackbar("Failed to fetch team phones", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Clear filter
//   const clearFilter = () => {
//     setSearchTeamId("");
//     fetchPhones();
//     showSnackbar("Showing all phone numbers", "info");
//   };

//   // ✅ Add new phone number
//   const addPhone = async () => {
//     const { phone, userId } = phoneForm;
//     if (!phone || !userId)
//       return showSnackbar("Fill all fields", "warning");

//     try {
//       const res = await axios.post(
//         `${BASE_URL}/api/admin/phones`,
//         { phone, userId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       showSnackbar(res.data?.message || "Phone added successfully!", "success");
//       fetchPhones();
//       setPhoneForm({ phone: "", userId: "", teamId: "" });
//     } catch (err) {
//       console.error("Add phone error:", err);
//       showSnackbar("Failed to add phone number", "error");
//     }
//   };

//   // ✅ Delete phone
//   const deletePhone = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}/api/admin/phones/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       showSnackbar("Phone deleted!", "info");
//       fetchPhones();
//     } catch (err) {
//       console.error("Delete phone error:", err);
//       showSnackbar("Failed to delete phone", "error");
//     }
//   };

//   useEffect(() => {
//     fetchPhones();
//   }, []);

//   return (
//     <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
//       <Typography variant="h4" mb={2} fontWeight="bold">
//         Phone Numbers Management
//       </Typography>

//       {/* Filter Section */}
//       <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Filter Phone Numbers
//         </Typography>
//         <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
//           <TextField
//             label="Filter by Team ID"
//             value={searchTeamId}
//             onChange={(e) => setSearchTeamId(e.target.value)}
//             fullWidth
//             size="small"
//           />
//           <Button variant="contained" onClick={filterByTeam}>
//             Filter
//           </Button>
//           <Button variant="outlined" color="secondary" onClick={clearFilter}>
//             Show All
//           </Button>
//         </Stack>
//       </Paper>

//       {/* Add Phone Section */}
//       <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f1f8e9" }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Add New Phone
//         </Typography>
//         <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
//           <TextField
//             label="Phone Number"
//             value={phoneForm.phone}
//             onChange={(e) =>
//               setPhoneForm({ ...phoneForm, phone: e.target.value })
//             }
//             size="small"
//             fullWidth
//           />
//           <TextField
//             label="User ID"
//             value={phoneForm.userId}
//             onChange={(e) =>
//               setPhoneForm({ ...phoneForm, userId: e.target.value })
//             }
//             size="small"
//             fullWidth
//           />
//           <TextField
//             label="Team ID"
//             value={phoneForm.teamId}
//             onChange={(e) =>
//               setPhoneForm({ ...phoneForm, teamId: e.target.value })
//             }
//             size="small"
//             fullWidth
//           />
//         </Stack>
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ mt: 2 }}
//           onClick={addPhone}
//         >
//           Add Phone
//         </Button>
//       </Paper>

//       {/* Table */}
//       <Paper sx={{ p: 2 }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Phone List ({phones?.length || 0})
//         </Typography>
//         {loading ? (
//           <Box sx={{ textAlign: "center", py: 3 }}>
//             <CircularProgress />
//           </Box>
//         ) : phones?.length > 0 ? (
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Phone</TableCell>
//                   <TableCell>User ID</TableCell>
//                   <TableCell>Team ID</TableCell>
//                   <TableCell>Action</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {phones.map((p) => (
//                   <TableRow key={p.id}>
//                     <TableCell>{p.id}</TableCell>
//                     <TableCell>{p.phone}</TableCell>
//                     <TableCell>{p.assigned_to || p.userId}</TableCell>
//                     <TableCell>{p.team_id}</TableCell>
//                     <TableCell>
//                       <Button
//                         size="small"
//                         color="error"
//                         variant="outlined"
//                         onClick={() => deletePhone(p.id)}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           <Typography align="center" color="text.secondary">
//             No phone numbers found.
//           </Typography>
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

// export default PhonesPage;



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

// const PhonesPage = () => {
//   const BASE_URL = "https://superfone-admin-xw3b.onrender.com";

//   const token =
//     localStorage.getItem("authToken") ||
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyIiwiZW1haWwiOiJhZG1pbkBhYmNkLmNvbSIsImdsb2JhbF9yb2xlIjoiYWRtaW4iLCJjb21wYW55X2lkIjoiMiIsImlhdCI6MTc2MTAyMTE0NCwiZXhwIjoxNzYxMTA3NTQ0fQ.P6Yd6qwhCoORGg7SFsHnF9AINty4amVokAXFdd3t3gY";

//   const [phones, setPhones] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [searchTeamId, setSearchTeamId] = useState("");
//   const [searchUserId, setSearchUserId] = useState("");

//   const [phoneForm, setPhoneForm] = useState({
//     id: "",
//     number: "",
//     userId: "",
//     teamId: "",
//   });

//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const showSnackbar = (message, severity = "info") =>
//     setSnackbar({ open: true, message, severity });

//   const normalizePhones = (data) => {
//     if (!data) return [];
//     if (Array.isArray(data)) return data;
//     if (data.phone_number) {
//       return Array.isArray(data.phone_number)
//         ? data.phone_number
//         : [data.phone_number];
//     }
//     if (data.data && Array.isArray(data.data)) return data.data;
//     if (typeof data === "object") return [data];
//     return [];
//   };

//   const fetchPhones = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/admin/phones`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setPhones(normalizePhones(res.data));
//     } catch (err) {
//       console.error("Failed to fetch phones:", err);
//       showSnackbar("Failed to fetch phones", "error");
//       setPhones([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterByTeam = async () => {
//     if (!searchTeamId.trim()) return showSnackbar("Enter Team ID", "warning");
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/admin/phones/teams/${encodeURIComponent(searchTeamId)}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const list = normalizePhones(res.data);
//       if (list.length) {
//         setPhones(list);
//         showSnackbar("Phones found for this team!", "success");
//       } else {
//         setPhones([]);
//         showSnackbar("No phones for this team!", "info");
//       }
//     } catch (err) {
//       if (err?.response?.status === 404) {
//         setPhones([]);
//         showSnackbar("No phones for this team (404).", "info");
//       } else {
//         console.error("Error filtering phones:", err);
//         showSnackbar("Failed to fetch team phones", "error");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearFilter = () => {
//     setSearchTeamId("");
//     setSearchUserId("");
//     fetchPhones();
//     showSnackbar("Showing all phone numbers", "info");
//   };

//   const addPhone = async () => {
//     const { number, userId, teamId, id } = phoneForm;
//     if (!number || !userId) return showSnackbar("Fill all required fields", "warning");
//     const body = { number, userId };
//     if (teamId) body.teamId = teamId;
//     if (id) body.company_id = id;

//     try {
//       const res = await axios.post(`${BASE_URL}/api/admin/phones`, body, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       showSnackbar(res.data?.message || "Phone added successfully!", "success");
//       const created = normalizePhones(res.data);
//       if (created.length) {
//         setPhones((prev) => [created[0], ...prev]);
//       } else {
//         fetchPhones();
//       }
//       setPhoneForm({ id: "", number: "", userId: "", teamId: "" });
//     } catch (err) {
//       console.error("Add phone error:", err);
//       if (err?.response?.status === 404) {
//         showSnackbar("Endpoint not found (POST returned 404).", "error");
//       } else {
//         showSnackbar("Failed to add phone number", "error");
//       }
//     }
//   };

//   const deletePhone = async (id) => {
//     if (!id) return showSnackbar("Invalid ID for delete", "warning");
//     try {
//       await axios.delete(
//         `${BASE_URL}/api/admin/phones/delete/${encodeURIComponent(id)}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       showSnackbar("Phone deleted!", "info");
//       setPhones((prev) => prev.filter((p) => String(p.id) !== String(id)));
//     } catch (err) {
//       console.error("Delete phone error:", err);
//       if (err?.response?.status === 404) {
//         showSnackbar("Delete endpoint or ID not found (404).", "error");
//       } else {
//         showSnackbar("Failed to delete phone", "error");
//       }
//       fetchPhones();
//     }
//   };

//   useEffect(() => {
//     fetchPhones();
//   }, []);

//   return (
//     <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3, mb:3}}>
//       <Typography variant="h2" mb={2} fontWeight="bold">
//         Phone Numbers Management
//       </Typography>

//       <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Filter Phone Numbers
//         </Typography>
//         <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="flex-end">
//           <Box sx={{ flex: 1 }}>
//             <TextField
//               label="Search by Team ID"
//               value={searchTeamId}
//               onChange={(e) => setSearchTeamId(e.target.value)}
//               fullWidth
//               size="small"
//             />
//             <Button
//               variant="outlined"
//               onClick={filterByTeam}
//               sx={{ mt: 1, width: "100%", bgcolor: "primary.main", color: "white" }}
//             >
//               Filter by Team
//             </Button>
//           </Box>
//           <Button variant="contained" color="secondary" onClick={clearFilter} sx={{ height: "40px" }}>
//             Show All
//           </Button>
//         </Stack>
//       </Paper>

//       <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f1f8e9" }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Add New Phone Number
//         </Typography>
//         <Stack direction={{ xs: "column", md: "row" }} spacing={2}>       
//           <TextField
//             label="Phone Number"
//             value={phoneForm.number}
//             onChange={(e) => setPhoneForm({ ...phoneForm, number: e.target.value })}
//             size="small"
//             fullWidth
//           />
//           <TextField
//             label="User ID"
//             value={phoneForm.userId}
//             onChange={(e) => setPhoneForm({ ...phoneForm, userId: e.target.value })}
//             size="small"
//             fullWidth
//           />
//         </Stack>
//         <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={addPhone}>
//           Add Phone
//         </Button>
//       </Paper>

//       <Paper sx={{ p: 2 }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Phone List {phones?.length < 10 && `(${phones?.length})`}
//         </Typography>

//         {loading ? (
//           <Box sx={{ textAlign: "center", py: 3 }}>
//             <CircularProgress />
//             <Typography sx={{ mt: 1 }}>Loading phone numbers...</Typography>
//           </Box>
//         ) : phones?.length > 0 ? (
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
//                   <TableCell align="center"><strong>ID</strong></TableCell>
//                   <TableCell align="center"><strong>Company ID</strong></TableCell>
//                   <TableCell align="center"><strong>Provider</strong></TableCell>
//                   <TableCell align="center"><strong>Phone Number</strong></TableCell>
//                   <TableCell align="center"><strong>User ID</strong></TableCell>
//                   <TableCell align="center"><strong>Team ID</strong></TableCell>
//                   <TableCell align="center"><strong>Action</strong></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {phones.map((phone, index) => (
//                   <TableRow
//                     key={phone.id || index}
//                     sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }, "&:hover": { backgroundColor: "#f5f5f5" } }}
//                   >
//                     <TableCell>{phone.id}</TableCell>
//                     <TableCell sx={{ fontFamily: "monospace", fontSize: "0.9rem" }}>{phone.number || phone.phone || "-"}</TableCell>
//                     <TableCell>{phone.userId || phone.assigned_to || "-"}</TableCell>
//                     <TableCell>{phone.team_id || phone.teamId || "-"}</TableCell>
//                     <TableCell>
//                       <Button size="small" variant="outlined" color="error" onClick={() => deletePhone(phone.id)}>
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           <Box sx={{ textAlign: "center", py: 4 }}>
//             <Typography variant="h6" color="text.secondary">No phone numbers found</Typography>
//             <Button variant="outlined" onClick={fetchPhones} sx={{ mt: 1 }}>Refresh List</Button>
//           </Box>
//         )}
//       </Paper>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default PhonesPage;
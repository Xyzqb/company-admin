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
// import { CleaningServices } from "@mui/icons-material";

// const BASE_URL = "https://digidial-admin.onrender.com";

// const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyIiwiZW1haWwiOiJhZG1pbkBhYmNkLmNvbSIsImdsb2JhbF9yb2xlIjoiYWRtaW4iLCJjb21wYW55X2lkIjoiMiIsImlhdCI6MTc2MDU4OTM4MCwiZXhwIjoxNzYwNjc1NzgwfQ.UW_34FSSYshroN6wJrfoKtAu5IqFqKu8D895WsSmG4w";

// const LeadsPage = () => {
//   const [leads, setLeads] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchId, setSearchId] = useState("");
//   const [searchName, setSearchName] = useState("");
//   const [teamId, setTeamId] = useState("");
//   const [editing, setEditing] = useState(false);

//   const [leadForm, setLeadForm] = useState({
//     id: "",
//     team_id: "",
//     phone: "",
//     name: "",
//     notes: "",
//     assigned_to: "",
//   });

//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const showSnackbar = (message, severity) =>
//     setSnackbar({ open: true, message, severity });

//   const api = axios.create({
//     baseURL: BASE_URL,
//     headers: { Authorization: `Bearer ${TOKEN}` },
//   });

//   // Fetch all leads
//   const fetchAllLeads = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/api/admin/leads");
//       setLeads(res.data?.leads || []);
//     } catch (err) {
//       console.error("Fetch all leads error:", err.response || err);
//       showSnackbar("Failed to fetch leads", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch lead by ID
//   const fetchLeadById = async () => {
//     if (!searchId.trim()) return showSnackbar("Enter Lead ID", "warning");
//     setLoading(true);
//     try {
//       const res = await api.get(`/api/admin/leads/${searchId}`);
//       if (res.data?.lead) {
//         setLeads([res.data.lead]);
//         showSnackbar("Lead found!", "success");
//       } else {
//         setLeads([]);
//         showSnackbar("No lead found", "error");
//       }
//     } catch (err) {
//       console.error("Fetch lead by ID error:", err.response || err);
//       showSnackbar("Error fetching lead by ID", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch leads by team
//   const fetchLeadsByTeam = async () => {
//     if (!teamId.trim()) return showSnackbar("Enter Team ID", "warning");
//     setLoading(true);
//     try {
//       const res = await api.get(`/api/admin/leads/team/${teamId}`);
//       setLeads(res.data?.leads || []);
//     } catch (err) {
//       console.error("Fetch leads by team error:", err.response || err);
//       showSnackbar("Error fetching leads by team", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create or update Lead
//   const saveLead = async () => {
//     let { id, team_id, phone, name, assigned_to, notes } = leadForm;

//     team_id = team_id.trim();
//     phone = phone.trim();
//     name = name.trim();
//     assigned_to = assigned_to.trim();
//     notes = notes ? notes.trim() : "";

//     if (!team_id || !phone || !name || !assigned_to)
//       return showSnackbar("Please fill all required fields", "warning");

//     const payload = {
//       team_id: Number(team_id),
//       phone,
//       name,
//       assigned_to,
//     };

//     setLoading(true);
//     try {
//       if (editing && id) {
//         console.log("Upadting lead:", id, payload);
//         await api.put(`/api/admin/leads/${id}`, payload);
//         showSnackbar("Lead updated successfully!", "success");
//       } else {
//         console.log("Creating lead:", payload);
//         await api.post("/api/admin/leads/create", payload);
//         showSnackbar("Lead created successfully!", "success");
//       }

//       setLeadForm({
//         id: "",
//         team_id: "",
//         phone: "",
//         name: "",
//         notes: "",
//         assigned_to: "",
//       });
//       setEditing(false);
//       fetchAllLeads();
//     } catch (err) {
//       console.error("Save lead error:", err.response?.data || err);
//       showSnackbar(err.response?.data?.message || "Error saving lead", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Edit lead
//   const editLead = (lead) => {
//     setLeadForm({
//       id: lead.id || "",
//       team_id: lead.team_id || "",
//       phone: lead.phone || "",
//       name: lead.name || "",
//       notes: lead.notes || "",
//       assigned_to: lead.assigned_to || "",
//     });
//     setEditing(Boolean(lead.id));
//   };

//   // Delete lead
//   const deleteLead = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this lead?")) return;
//     setLoading(true);
//     try {
//       console.log("Deleting lead ID:", id);
//       await api.delete(`/api/admin/leads/${id}`);
//       showSnackbar("Lead deleted successfully!", "info");
//       fetchAllLeads();
//     } catch (err) {
//       console.error("Delete lead error:", err.response?.data || err);
//       showSnackbar(
//         err.response?.data?.message || "Error deleting lead",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearSearch = () => {
//     setSearchId("");
//     setSearchName("");
//     setTeamId("");
//     fetchAllLeads();
//   };

//   useEffect(() => {
//     fetchAllLeads();
//   }, []);

//   return (
//     <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
//       <Typography variant="h4" mb={2} fontWeight="bold">
//         Leads Management
//       </Typography>

//       {/* Search / Filter */}
//       <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Search / Filter Leads
//         </Typography>
//         <Stack
//           direction={{ xs: "column", md: "row" }}
//           spacing={2}
//           alignItems="flex-end"
//         >
//           <Box sx={{ flex: 1 }}>
//             <TextField
//               label="Search by Lead ID"
//               value={searchId}
//               onChange={(e) => setSearchId(e.target.value)}
//               fullWidth
//               size="small"
//             />
//             <Button
//               variant="contained"
//               sx={{ mt: 1, width: "100%" }}
//               onClick={fetchLeadById}
//             >
//               Search by ID
//             </Button>
//           </Box>

//           <Box sx={{ flex: 1 }}>
//             <TextField
//               label="Search by Name"
//               value={searchName}
//               onChange={(e) => setSearchName(e.target.value)}
//               fullWidth
//               size="small"
//             />
//             <Button
//               variant="contained"
//               sx={{ mt: 1, width: "100%" }}
//               onClick={() => {
//                 if (!searchName.trim())
//                   return showSnackbar("Enter Name", "warning");
//                 setLeads(
//                   leads.filter((l) =>
//                     l.name.toLowerCase().includes(searchName.toLowerCase())
//                   )
//                 );
//                 showSnackbar("Leads filtered by name!", "success");
//               }}
//             >
//               Search by Name
//             </Button>
//           </Box>

//           <Box sx={{ flex: 1 }}>
//             <TextField
//               label="Filter by Team ID"
//               value={teamId}
//               onChange={(e) => setTeamId(e.target.value)}
//               fullWidth
//               size="small"
//             />
//             <Button
//               variant="contained"
//               sx={{ mt: 1, width: "100%" }}
//               onClick={fetchLeadsByTeam}
//             >
//               Filter by Team
//             </Button>
//           </Box>

//           <Button
//             variant="outlined"
//             color="secondary"
//             onClick={clearSearch}
//             sx={{ height: "35px" }}
//           >
//             Show All
//           </Button>
//         </Stack>
//       </Paper>

//       {/* Lead Form */}
//       <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f1f8e9" }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           {editing ? "Edit Lead" : "Create Lead"}
//         </Typography>
//         <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
//           <TextField
//             label="Team ID"
//             value={leadForm.team_id}
//             onChange={(e) =>
//               setLeadForm({ ...leadForm, team_id: e.target.value })
//             }
//             size="small"
//             fullWidth
//           />
//           <TextField
//             label="Phone"
//             value={leadForm.phone}
//             onChange={(e) =>
//               setLeadForm({ ...leadForm, phone: e.target.value })
//             }
//             size="small"
//             fullWidth
//           />
//           <TextField
//             label="Name"
//             value={leadForm.name}
//             onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
//             size="small"
//             fullWidth
//           />
//           <TextField
//             label="Notes"
//             value={leadForm.notes}
//             onChange={(e) =>
//               setLeadForm({ ...leadForm, notes: e.target.value })
//             }
//             size="small"
//             fullWidth
//           />
//           <TextField
//             label="Assigned To"
//             value={leadForm.assigned_to}
//             onChange={(e) =>
//               setLeadForm({ ...leadForm, assigned_to: e.target.value })
//             }
//             size="small"
//             fullWidth
//           />
//         </Stack>
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ mt: 2 }}
//           onClick={saveLead}
//         >
//           {editing ? "Update Lead" : "Create Lead"}
//         </Button>
//       </Paper>

//       {/* Leads Table */}
//       <Paper sx={{ p: 2 }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Leads List {leads.length > 0 && `(${leads.length})`}
//         </Typography>
//         {loading ? (
//           <Box sx={{ textAlign: "center", py: 3 }}>
//             <CircularProgress />
//             <Typography sx={{ mt: 1 }}>Loading leads...</Typography>
//           </Box>
//         ) : leads.length > 0 ? (
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
//                   <TableCell>
//                     <strong>ID</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Team ID</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Phone</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Name</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Notes</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Assigned To</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Action</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {leads.map((lead) => (
//                   <TableRow
//                     key={lead.id}
//                     sx={{
//                       "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
//                       "&:hover": { backgroundColor: "#f5f5f5" },
//                     }}
//                   >
//                     <TableCell>{lead.id}</TableCell>
//                     <TableCell>{lead.team_id}</TableCell>
//                     <TableCell>{lead.phone}</TableCell>
//                     <TableCell>{lead.name}</TableCell>
//                     <TableCell>{lead.notes}</TableCell>
//                     <TableCell>{lead.assigned_to}</TableCell>
//                     <TableCell>
//                       <Stack direction="row" spacing={1}>
//                         <Button
//                           size="small"
//                           variant="outlined"
//                           onClick={() => editLead(lead)}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           size="small"
//                           variant="outlined"
//                           color="error"
//                           onClick={() => deleteLead(lead.id)}
//                         >
//                           Delete
//                         </Button>
//                       </Stack>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           <Box sx={{ textAlign: "center", py: 4 }}>
//             <Typography variant="h6" color="text.secondary">
//               No leads found
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

// export default LeadsPage;


// LeadsPage.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const BASE_URL = "https://digidial-admin.onrender.com";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyIiwiZW1haWwiOiJhZG1pbkBhYmNkLmNvbSIsImdsb2JhbF9yb2xlIjoiYWRtaW4iLCJjb21wYW55X2lkIjoiMiIsImlhdCI6MTc2MTAyMTE0NCwiZXhwIjoxNzYxMTA3NTQ0fQ.P6Yd6qwhCoORGg7SFsHnF9AINty4amVokAXFdd3t3gY"; 

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [editing, setEditing] = useState(false);

  const [leadForm, setLeadForm] = useState({
    id: "",
    team_id: "",
    phone: "",
    name: "",
    notes: "",
    assigned_to: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity) =>
    setSnackbar({ open: true, message, severity });

  const api = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${TOKEN}` },
  });

  // Fetch all leads
  const fetchAllLeads = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/admin/leads");
      setLeads(res.data?.leads || []);
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to fetch leads", "error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch lead by ID
  const fetchLeadById = async () => {
    if (!searchId.trim()) return showSnackbar("Enter Lead ID", "warning");
    setLoading(true);
    try {
      const res = await api.get(`/api/admin/leads/${searchId}`);
      if (res.data?.lead) {
        setLeads([res.data.lead]);
        showSnackbar("Lead found!", "success");
      } else {
        setLeads([]);
        showSnackbar("No lead found", "error");
      }
    } catch (err) {
      console.error(err);
      showSnackbar("Error fetching lead by ID", "error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch leads by team
  const fetchLeadsByTeam = async () => {
    if (!teamId.trim()) return showSnackbar("Enter Team ID", "warning");
    setLoading(true);
    try {
      const res = await api.get(`/api/admin/leads/team/${teamId}`);
      setLeads(res.data?.leads || []);
    } catch (err) {
      console.error(err);
      showSnackbar("Error fetching leads by team", "error");
    } finally {
      setLoading(false);
    }
  };

  // Create or update lead
  const saveLead = async () => {
    let { id, team_id, phone, name, assigned_to, notes } = leadForm;

    if (!team_id || !phone || !name)
      return showSnackbar("Team ID, Phone & Name are required", "warning");

    const payload = {
      team_id: Number(team_id),
      phone: phone.trim(),
      name: name.trim(),
      notes: notes ? notes.trim() : "",
      assigned_to: assigned_to ? assigned_to.trim() : null,
    };

    setLoading(true);
    try {
      if (editing && id) {
        await api.put(`/api/admin/leads/${id}`, payload);
        showSnackbar("Lead updated successfully!", "success");
      } else {
        await api.post("/api/admin/leads/create", payload);
        showSnackbar("Lead created successfully!", "success");
      }
      setLeadForm({ id: "", team_id: "", phone: "", name: "", notes: "", assigned_to: "" });
      setEditing(false);
      fetchAllLeads();
    } catch (err) {
      console.error(err);
      showSnackbar(err.response?.data?.message || "Error saving lead", "error");
    } finally {
      setLoading(false);
    }
  };

  // Edit lead
  const editLead = (lead) => {
    setLeadForm({ ...lead });
    setEditing(true);
  };

  // Delete lead
  const deleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    setLoading(true);
    try {
      await api.delete(`/api/admin/leads/${id}`);
      showSnackbar("Lead deleted successfully!", "info");
      fetchAllLeads();
    } catch (err) {
      console.error(err);
      showSnackbar(err.response?.data?.message || "Error deleting lead", "error");
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchId("");
    setSearchName("");
    setTeamId("");
    fetchAllLeads();
  };

  useEffect(() => {
    fetchAllLeads();
  }, []);

     return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
      <Typography variant="h4" mb={2} fontWeight="bold">
        Leads Management
      </Typography>

      {/* Search / Filter */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Search / Filter Leads
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="flex-end"
        >
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Search by Lead ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              fullWidth
              size="small"
            />
            <Button
              variant="contained"
              sx={{ mt: 1, width: "100%" }}
              onClick={fetchLeadById}
            >
              Search by ID
            </Button>
          </Box>

          <Box sx={{ flex: 1 }}>
            <TextField
              label="Search by Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              fullWidth
              size="small"
            />
            <Button
              variant="contained"
              sx={{ mt: 1, width: "100%" }}
              onClick={() => {
                if (!searchName.trim())
                  return showSnackbar("Enter Name", "warning");
                setLeads(
                  leads.filter((l) =>
                    l.name.toLowerCase().includes(searchName.toLowerCase())
                  )
                );
                showSnackbar("Leads filtered by name!", "success");
              }}
            >
              Search by Name
            </Button>
          </Box>

          <Box sx={{ flex: 1 }}>
            <TextField
              label="Filter by Team ID"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              fullWidth
              size="small"
            />
            <Button
              variant="contained"
              sx={{ mt: 1, width: "100%" }}
              onClick={fetchLeadsByTeam}
            >
              Filter by Team
            </Button>
          </Box>

          <Button
            variant="outlined"
            color="secondary"
            onClick={clearSearch}
            sx={{ height: "35px" }}
          >
            Show All
          </Button>
        </Stack>
      </Paper>

      {/* Lead Form */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f1f8e9" }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          {editing ? "Edit Lead" : "Create Lead"}
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            label="Team ID"
            value={leadForm.team_id}
            onChange={(e) =>
              setLeadForm({ ...leadForm, team_id: e.target.value })
            }
            size="small"
            fullWidth
          />
          <TextField
            label="Phone"
            value={leadForm.phone}
            onChange={(e) =>
              setLeadForm({ ...leadForm, phone: e.target.value })
            }
            size="small"
            fullWidth
          />
          <TextField
            label="Name"
            value={leadForm.name}
            onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
            size="small"
            fullWidth
          />
          <TextField
            label="Notes"
            value={leadForm.notes}
            onChange={(e) =>
              setLeadForm({ ...leadForm, notes: e.target.value })
            }
            size="small"
            fullWidth
          />
          <TextField
            label="Assigned To"
            value={leadForm.assigned_to}
            onChange={(e) =>
              setLeadForm({ ...leadForm, assigned_to: e.target.value })
            }
            size="small"
            fullWidth
          />
        </Stack>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={saveLead}
        >
          {editing ? "Update Lead" : "Create Lead"}
        </Button>
      </Paper>

      {/* Leads Table */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Leads List {leads.length > 0 && `(${leads.length})`}
        </Typography>
        {loading ? (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <CircularProgress />
            <Typography sx={{ mt: 1 }}>Loading leads...</Typography>
          </Box>
        ) : leads.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                  <TableCell>
                    <strong>ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Team ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Phone</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Notes</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Assigned To</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Action</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow
                    key={lead.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    <TableCell>{lead.id}</TableCell>
                    <TableCell>{lead.team_id}</TableCell>
                    <TableCell>{lead.phone}</TableCell>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>{lead.notes}</TableCell>
                    <TableCell>{lead.assigned_to}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => editLead(lead)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={() => deleteLead(lead.id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No leads found
            </Typography>
            <Button variant="outlined" onClick={clearSearch} sx={{ mt: 1 }}>
              Refresh List
            </Button> 
          </Box>
        )}
      </Paper>   

      {/* Snackbar */}  
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LeadsPage;

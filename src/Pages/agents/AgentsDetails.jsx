// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Stack,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   Avatar,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   Card,
//   CardContent,
//   Divider,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
// import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";
// import ProfilePic from "./Profile";

// const BASE_URL = "https://superfone-admin-xw3b.onrender.com";

// const AgentsDetails = () => {
//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchId, setSearchId] = useState("");
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [currentAgent, setCurrentAgent] = useState(null);

//   const showSnackbar = (message, severity) =>
//     setSnackbar({ open: true, message, severity });

//   const TOKEN =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyIiwiZW1haWwiOiJhZG1pbkBhYmNkLmNvbSIsImdsb2JhbF9yb2xlIjoiYWRtaW4iLCJjb21wYW55X2lkIjoiMiIsImlhdCI6MTc2MjMzODk3MiwiZXhwIjoxNzYyNDI1MzcyfQ.zrDc5GM2GEs-dl2w5y_KY8SJJyM63Li_muqmWSju5cQ";

//   const api = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//       Authorization: `Bearer ${TOKEN}`,
//       "Content-Type": "application/json",
//     },
//   });

//   // ✅ Fetch all agents --> working
//   const fetchAgents = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/api/admin/users");
//       const rawAgents = res.data.users || res.data.data || res.data || [];
//       setAgents(rawAgents);
//       showSnackbar("Agents loaded successfully!", "success");
//     } catch (err) {
//       console.error(err);
//       showSnackbar(
//         err.response?.data?.message || "Failed to load agents",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Search agent by ID  --> working
//   const searchAgentById = async () => {
//     if (!searchId.trim()) return showSnackbar("Enter Agent ID", "warning");
//     setLoading(true);
//     try {
//       const res = await api.get(`/api/admin/users/${searchId}`);
//       const agent = res.data.user || res.data;
//       if (agent) {
//         setAgents([agent]);
//         showSnackbar("Agent found!", "success");
//       } else {
//         setAgents([]);
//         showSnackbar("No agent found with this ID!", "error");
//       }
//     } catch (err) {
//       console.error(err);
//       showSnackbar(
//         err.response?.data?.message || "Error fetching agent",
//         "error"
//       );
//       setAgents([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Add agent
//   const AddAgents = async () => {
//     const res = await api.post(`/api/admin/users/add`);
//     const agent = res.data.users;
//     showSnackbar("Add agent API needs implementation", "info");
//   };

//   const clearSearch = () => {
//     setSearchId("");
//     fetchAgents();
//     showSnackbar("Showing all agents", "info");
//   };

//   // ✅ Delete agent
//   const handleDelete = async (_id) => {
//     if (!window.confirm("Are you sure you want to delete this agent?")) return;
//     try {
//       await api.delete(`/api/admin/users/${_id}`);
//       setAgents((prev) => prev.filter((a) => a._id !== _id));
//       showSnackbar("Agent deleted successfully!", "success");
//     } catch {
//       showSnackbar("Failed to delete agent", "error");
//     }
//   };

//   // ✅ Edit agent
//   const handleEdit = (agent) => {
//     setCurrentAgent(agent);
//     setEditDialogOpen(true);
//   };

//   const saveEdit = async () => {
//     if (!currentAgent?._id) return showSnackbar("Invalid agent ID", "error");
//     try {
//       const payload = {
//         name: currentAgent.name,
//         email: currentAgent.email,
//         mobile: currentAgent.mobile,
//       };
//       const res = await api.put(`/api/admin/users/${currentAgent._id}`, payload);
//       const updated = res.data.updatedAgents || payload;
//       setAgents((prev) =>
//         prev.map((a) => (a._id === currentAgent._id ? { ...a, ...updated } : a))
//       );
//       setEditDialogOpen(false);
//       showSnackbar("Agent updated successfully!", "success");
//     } catch {
//       showSnackbar("Failed to update agent", "error");
//     }
//   };

//   useEffect(() => {
//     fetchAgents();
//   }, []);

//   return (
//     <Box sx={{ p: 2, mx: "auto", mt: 3 }}>
//       <Typography variant="h5" mb={1} fontWeight="bold">
//         <SupervisorAccountRoundedIcon sx={{ verticalAlign: "middle", mr: 1 }} />
//         Agents Details
//       </Typography>

//       {/* 🔍 Search Section */}
//       <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa", width: "910px" }}>
//         <Typography variant="h6" mb={2} fontWeight="bold">
//           Search Agents
//         </Typography>
//         <Stack
//           direction={{ xs: "column", md: "row" }}
//           spacing={2}
//           alignItems="flex-start"
//         >
//           <Box>
//             <TextField
//               label="Search by Agent ID"
//               value={searchId}
//               onChange={(e) => setSearchId(e.target.value)}
//               size="small"
//               sx={{ width: "280px" }}
//             />
//             <Button
//               variant="contained"
//               onClick={searchAgentById}
//               sx={{ mt: 1, width: "280px", gap: 1 }}
//             >
//               <PersonSearchRoundedIcon />
//               Search by ID
//             </Button>
//           </Box>

//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={clearSearch}
//             sx={{
//               mt: { xs: 2, md: 3 },
//               width: "350px",
//               height: "40px",
//               gap: 1,
//             }}
//           >
//             Show All Agents
//           </Button>

//           <Button
//             variant="contained"
//             onClick={AddAgents}
//             sx={{ mt: 1, width: "350px", gap: 1 }}
//           >
//             Add Agents
//           </Button>
//         </Stack>
//       </Paper>

//       {/* 🧑 Agent Cards */}
//       {loading ? (
//         <Box sx={{ textAlign: "center", py: 4 }}>
//           <CircularProgress />
//           <Typography sx={{ mt: 1 }}>Loading agents...</Typography>
//         </Box>
//       ) : agents.length > 0 ? (
//         <Grid container spacing={2}>
//           {agents.map((agent) => (
//             <Grid key={agent._id || agent.id}>
//               <Card
//                 sx={{
//                   borderRadius: 3,
//                   boxShadow: 3,
//                   width: "290px",
//                   height: "300px",
//                   background: "#e9f5f9",
//                   p: 1,
//                   "&:hover": { boxShadow: 6 },
//                 }}
//               >
//                 <CardContent sx={{ textAlign: "center" }}>
//                   <Avatar
//                     src={ProfilePic(agent.profilePic)}
//                     sx={{
//                       width: 70,
//                       height: 70,
//                       mx: "auto",
//                       bgcolor: "primary.light",
//                       mb: 1,
//                       border: "2px solid #1976d2",
//                       cursor: "pointer",
//                       "&:hover": { transform: "scale(1.1)" },
//                     }}
//                   >
//                     {agent.name?.[0]?.toUpperCase()}
//                   </Avatar>

//                   <Typography variant="h6">{agent.name}</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     ID: {agent.id}
//                   </Typography>
//                   <Divider sx={{ my: 1 }} />
//                   <Typography variant="body2">{agent.email}</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {agent.mobile}
//                   </Typography>

//                   <Box sx={{ mt: 2 }}>
//                     <Button
//                       size="small"
//                       startIcon={<EditIcon />}
//                       onClick={() => handleEdit(agent)}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       size="small"
//                       color="error"
//                       startIcon={<DeleteIcon />}
//                       onClick={() => handleDelete(agent._id)}
//                     >
//                       Delete
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Typography>No agents found.</Typography>
//       )}

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
//       </Snackbar>

//       {/* Edit Dialog */}
//       <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
//         <DialogTitle>Edit Agent</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Name"
//             value={currentAgent?.name || ""}
//             onChange={(e) =>
//               setCurrentAgent({ ...currentAgent, name: e.target.value })
//             }
//             fullWidth
//             margin="dense"
//           />
//           <TextField
//             label="Email"
//             value={currentAgent?.email || ""}
//             onChange={(e) =>
//               setCurrentAgent({ ...currentAgent, email: e.target.value })
//             }
//             fullWidth
//             margin="dense"
//           />
//           <TextField
//             label="Mobile"
//             value={currentAgent?.mobile || ""}
//             onChange={(e) =>
//               setCurrentAgent({ ...currentAgent, mobile: e.target.value })
//             }
//             fullWidth
//             margin="dense"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
//           <Button onClick={saveEdit} variant="contained">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AgentsDetails;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import SupervisorAccountRoundedIcon from "@mui/icons-material/SupervisorAccountRounded";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const BASE_URL = "https://superfone-admin-xw3b.onrender.com";

const AgentsDetails = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [currentAgent, setCurrentAgent] = useState(null);
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    global_role: "",
    profile_pic: "",
  });

  const showSnackbar = (message, severity) =>
    setSnackbar({ open: true, message, severity });

  const TOKEN = localStorage.getItem("authToken");
  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  // ✅ Fetch all agents -->Working
  const fetchAgents = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/admin/users");
      const rawAgents = res.data.agents || res.data.users || [];
      setAgents(rawAgents);
      showSnackbar("Agents loaded successfully!", "success");
    } catch (err) {
      console.error(err);
      showSnackbar(
        err.response?.data?.message || "Failed to load agents",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Search agent by ID --> working
  const searchAgentById = async () => {
    if (!searchId.trim()) return showSnackbar("Enter Agent ID", "warning");
    setLoading(true);
    try {
      const res = await api.get(`/api/admin/users/${searchId}`);
      const agent = res.data.user || res.data;
      if (agent) {
        setAgents([agent]);
        showSnackbar("Agent found!", "success");
      } else {
        setAgents([]);
        showSnackbar("No agent found with this ID!", "error");
      }
    } catch (err) {
      console.error(err);
      showSnackbar(
        err.response?.data?.message || "Error fetching agent",
        "error"
      );
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchId("");
    fetchAgents();
    showSnackbar("Showing all agents", "info");
  };

  // ✅ Add new agent (with profile_pic)
  const handleAddAgent = async () => {
    const { name, email, global_role,mobile, profile_pic, password, } = newAgent;

    if (!name || !email || !global_role || !mobile || !password || !profile_pic)
      return showSnackbar("All fields are required", "warning");

    try {
      const payload = { name, email, global_role, profile_pic, password, mobile};
      console.log(payload);
      const res = await api.post("/api/admin/users/add-agent", payload, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      showSnackbar(res.data?.message || "Agent added successfully!", "success");
      setAddDialogOpen(false);
      setNewAgent({ name: "", email: "", global_role: "", profile_pic: "", mobile:"", password:"" });
      fetchAgents();
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to add agent", "error");
    }
  };

  // ✅ Delete agent
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/admin/users/delete/${id}`);
      setAgents((prev) => prev.filter((a) => a.id !== id));
      showSnackbar("Agent deleted successfully!", "success");
    } catch {
      showSnackbar("Failed to delete agent", "error");
    }
  };

  //    const handleDelete = async (_id) => {
  //     try {
  //       await api.delete(`${BASE_URL}/api/admin/agent/${_id}`);
  //       setAgents((prev) => prev.filter((a) => a._id !== _id));
  //       showSnackbar("Agent deleted successfully!", "success");
  //     } catch {
  //       showSnackbar("Failed to delete agent", "error");
  //     }
  //   };

  // ✅ Edit agent
  const handleEdit = (agent) => {
    setCurrentAgent(agent);
    setEditDialogOpen(true);
  };

  const saveEdit = async () => {
    if (!currentAgent?.id) return showSnackbar("Invalid agent ID", "error");
    try {
      const payload = {
        name: currentAgent.name,
        email: currentAgent.email,
        mobile: currentAgent.mobile,
      };
      await api.put(`/api/admin/users/update/${currentAgent.id}`, payload);
      fetchAgents();
      setEditDialogOpen(false);
      showSnackbar("Agent updated successfully!", "success");
    } catch {
      showSnackbar("Failed to update agent", "error");
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <Box sx={{ p: 2, mx: "auto", mt: 3 }}>
      <Typography variant="h5" mb={1} fontWeight="bold">
        <SupervisorAccountRoundedIcon sx={{ verticalAlign: "middle", mr: 1 }} />
        Agents Details
      </Typography>

      {/* 🔍 Search Section */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa", width: "910px" }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Search Agents
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="flex-start"
        >
          <Box>
            <TextField
              label="Search by Agent ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              size="small"
              sx={{ width: "280px" }}
            />
            <Button
              variant="contained"
              onClick={searchAgentById}
              sx={{ mt: 1, width: "280px", gap: 1 }}
            >
              <PersonSearchRoundedIcon />
              Search by ID
            </Button>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            onClick={clearSearch}
            sx={{
              mt: { xs: 2, md: 3 },
              width: "400px",
              height: "40px",
              gap: 1,
            }}
          >
            <PersonSearchRoundedIcon />
            Show All Agents
          </Button>

          <Button
            variant="contained"
            onClick={() => setAddDialogOpen(true)}
            sx={{ mt: 1, width: "400px", gap: 1 }}
          >
            <AddCircleIcon />
            Add Agent
          </Button>
        </Stack>
      </Paper>

      {/* 🧑 Agent Cards */}
      {loading ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
          <Typography sx={{ mt: 1 }}>Loading agents...</Typography>
        </Box>
      ) : agents.length > 0 ? (
        <Grid container spacing={2} sx={3} md={3} s={3}>
          {agents.map((agent) => (
            <Grid key={agent.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  width: "290px",
                  height: "320px",
                  background: "#e9f5f9",
                  p: 1,
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Avatar
                    src={agent.profile_pic}
                    sx={{
                      width: 70,
                      height: 70,
                      mx: "auto",
                      bgcolor: "primary.light",
                      mb: 1,
                      border: "2px solid #1976d2",
                    }}
                  >
                    {agent.name?.[0]?.toUpperCase()}
                  </Avatar>

                  <Typography variant="h6">{agent.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: {agent.id}
                  </Typography>
                  <Divider sx={{ my: 1 }} />

                  <Typography variant="body2">{agent.email}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mobile: {agent.mobile || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Role: {agent.global_role || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created At:{" "}
                    {agent.created_at
                      ? new Date(agent.created_at).toLocaleString()
                      : "Not Available"}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(agent)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(agent.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No agents found.</Typography>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      {/* ✏️ Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Agent</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={currentAgent?.name || ""}
            onChange={(e) =>
              setCurrentAgent({ ...currentAgent, name: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Email"
            value={currentAgent?.email || ""}
            onChange={(e) =>
              setCurrentAgent({ ...currentAgent, email: e.target.value })
            }
            fullWidth
            margin="dense"
          />
          <TextField
            label="Mobile Number"
            value={currentAgent?.mobile || ""}
            onChange={(e) =>
              setCurrentAgent({ ...currentAgent, mobile: e.target.value })
            }
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={saveEdit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* ➕ Add Agent Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        fullWidth
        maxWidth="sm" // you can use "xs", "sm", "md", "lg"
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: { xs: 1, sm: 2 }, // padding adjusts on small screens
            width: { xs: "90%", sm: "500px" },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: { xs: "1.1rem", sm: "1.3rem" },
          }}
        >
          Add New Agent
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 1,
            px: { xs: 1, sm: 2 },
          }}
        >
          <TextField
            label="Name"
            value={newAgent.name}
            onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
            fullWidth
            size="small"
          />

          <TextField
            label="Password"
            type="password"
            value={newAgent.password}
            onChange={(e) =>
              setNewAgent({ ...newAgent, password: e.target.value })
            }
            fullWidth
            size="small"
          />

          <TextField
            label="Global Role"
            value={newAgent.global_role}
            onChange={(e) =>
              setNewAgent({ ...newAgent, global_role: e.target.value })
            }
            fullWidth
            size="small"
          />

          <TextField
            label="Email"
            value={newAgent.email}
            onChange={(e) =>
              setNewAgent({ ...newAgent, email: e.target.value })
            }
            fullWidth
            size="small"
          />
           <TextField
            label="Mobile Number"
            value={currentAgent?.mobile || ""}
            onChange={(e) =>
              setCurrentAgent({ ...currentAgent, mobile: e.target.value })
            }
            fullWidth
            margin="dense"
          />

          {/* File upload (responsive + clean) */}
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 500 }}>
              Profile Picture
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setNewAgent({ ...newAgent, profile_pic: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            gap: 2,
            py: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            onClick={() => setAddDialogOpen(false)}
            variant="outlined"
            color="secondary"
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddAgent}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AgentsDetails;

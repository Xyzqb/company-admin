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

const TOKEN = localStorage.getItem("authToken");

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teamForm, setTeamForm] = useState({
    id: "",
    name: "",
    owner_name: "",
  });
  const [searchTeamId, setSearchTeamId] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity) =>
    setSnackbar({ open: true, message, severity });

  const api = axios.create({
    baseURL: "https://superfone-admin-xw3b.onrender.com",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  // Fetch all teams --> working
  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/admin/teams");
      const teamList = res.data?.teams || res.data?.data || res.data || [];
      setTeams(teamList);
    } catch (err) {
      console.error(err);
      showSnackbar(
        err.response?.data?.message || "Failed to fetch teams",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Get team by ID --> working
  const getTeamById = async () => {
    if (!searchTeamId.trim()) return showSnackbar("Enter Team ID", "warning");
    setLoading(true);
    try {
      const res = await api.get(`/api/admin/teams/${searchTeamId}`);
      const team = res.data?.team || res.data;
      if (team) {
        setTeams([team]);
        showSnackbar("Team found!", "success");
      } else {
        setTeams([]);
        showSnackbar("No team found with this ID!", "error");
      }
    } catch (err) {
      console.error(err);
      showSnackbar(
        err.response?.data?.message || "Error fetching team",
        "error"
      );
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  // Create team  --> working
  const createTeam = async () => {
    const { name, owner_name } = teamForm;
    if (!name.trim() || !owner_name.trim())
      return showSnackbar("Please enter team name and owner ID", "warning");

    setLoading(true);
    try {
      const res = await api.post("/api/admin/teams/create", {
        name,
        owner_name: owner_name, 
      });
      showSnackbar(
        res.data?.message || "Team created successfully!",
        "success"
      );
      setTeamForm({ id: "", name: "", owner_name: "" });
      fetchTeams();
    } catch (err) {
      console.error("Create error:", err.response || err);
      showSnackbar(
        err.response?.data?.message || "Error creating team",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Update team
  const updateTeam = async () => {
    const { id, name, owner_name } = teamForm;
    if (!name.trim() || !owner_name.trim())
      return showSnackbar("Please enter a team name and owner name", "warning");

    setLoading(true);
    try {
      await api.put(`/api/admin/teams/update/${id}`, { name, owner_name });
      showSnackbar("Team updated successfully!", "success");
      setTeamForm({ name: "", owner_name: "" });
      fetchTeams();
    } catch (err) {
      console.error(err);
      showSnackbar(
        err.response?.data?.message || "Error updating team",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete team --> working
  const deleteTeam = async (id) => {
    console.log("Deleting team:", id);
    if (!id) return showSnackbar("Invalid team ID", "error");
    setLoading(true);
    try {
      const res = await api.delete(`/api/admin/teams/delete/${id}`);
      console.log("Delete response:", res.data);
      showSnackbar("Team deleted successfully!", "success");
      fetchTeams();
    } catch (err) {
      // console.error("Delete error:", err.response || err);
      showSnackbar(
        err.response?.data?.message || "Error deleting team",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Pre-fill form for editing
  const handleEdit = (team) => {
    setTeamForm({
      id: team.id || "",
      name: team.name || "",
      owner_name: team.owner_name || team.owner_id || "",
    });
  };

  useEffect(() => {
    if (TOKEN) fetchTeams();
  }, []);

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
      <Typography variant="h4" mb={2} fontWeight="bold">
        Teams Management
      </Typography>

      {/* Search */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="flex-end"
        >
          <TextField
            label="Enter Team ID"
            value={searchTeamId}
            onChange={(e) => setSearchTeamId(e.target.value)}
            size="small"
          />
          <Button variant="contained" onClick={getTeamById}>
            Get Team Detail
          </Button>
          <Button variant="contained" color="secondary" onClick={fetchTeams}>
            Show All
          </Button>
        </Stack>
      </Paper>

      {/* Create and Update Team Form */}
      <Box sx={{ p: 2, mb: 2, backgroundColor: "#f1f8e9", color:"black", fontWeight:"bold"}}>
        <Typography variant="h6">Create / Update Team</Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} mt={1}>
          <TextField
            label="Name"
            value={teamForm.name}
            onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
            size="small"
          />
          <TextField
            label="Owner Name"
            value={teamForm.owner_name}
            onChange={(e) => setTeamForm({ ...teamForm, owner_name: e.target.value })}
            size="small"
          />

        </Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={createTeam}>
            Create Team
          </Button>
          <Button variant="contained" color="info" onClick={updateTeam}>
            Update Team
          </Button>
        </Stack>
      </Box>

      {/* Team Table */}
      <Paper sx={{ p: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Owner ID</TableCell>
                  <TableCell align="center">Created At</TableCell>
                  <TableCell align="center">Company ID</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No teams found.
                    </TableCell>
                  </TableRow>
                ) : (
                  teams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell align="center">{team.id}</TableCell>
                      <TableCell align="center">{team.name}</TableCell>
                      <TableCell align="center">{team.owner_id}</TableCell>
                      <TableCell align="center">
                        {team.created_at
                          ? new Date(team.created_at).toLocaleString()
                          : "-"}
                      </TableCell>
                      <TableCell align="center">
                        {team.company_id || "-"}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          variant="outlined"
                          color="info"
                          sx={{ mr: 1 }}
                          onClick={() => handleEdit(team)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={() => deleteTeam(team.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
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

export default TeamsPage;



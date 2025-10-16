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
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzIiwiZW1haWwiOiJhZG1pbkB4eXouY29tIiwiZ2xvYmFsX3JvbGUiOiJhZG1pbiIsImNvbXBhbnlfaWQiOiIyIiwiaWF0IjoxNzYwMDgwNDI5LCJleHAiOjE3NjAxNjY4Mjl9.Ok7Q5NU9N-iHoE-OlFO1qxRs1FV-WWDWtf60SNDkjoE";

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teamForm, setTeamForm] = useState({ id: "", name: "" });
  const [searchTeamId, setSearchTeamId] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const showSnackbar = (msg, severity) => setSnackbar({ open: true, message: msg, severity });

  const api = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${TOKEN}` },
  });

  // Fetch all teams
  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/admin/teams");
      setTeams(res.data?.teams || []);
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to fetch teams", "error");
    } finally {
      setLoading(false);
    }
  };

  // Get team by ID
  const getTeamById = async () => {
    if (!searchTeamId.trim()) return showSnackbar("Enter Team ID", "warning");
    setLoading(true);
    try {
      const res = await api.get(`/api/admin/teams/${searchTeamId}`);
      if (res.data?.team) {
        setTeams([res.data.team]);
        showSnackbar("Team found!", "success");
      } else {
        setTeams([]);
        showSnackbar("No team found with this ID!", "error");
      }
    } catch (err) {
      console.error(err);
      showSnackbar("Error fetching team", "error");
    } finally {
      setLoading(false);
    }
  };

  // Create team
  const createTeam = async () => {
    const { id, name } = teamForm;
    if (!id || !name) return showSnackbar("Please fill all fields", "warning");
    setLoading(true);
    try {
      await api.post("/api/admin/teams/create", { id, name });
      showSnackbar("Team created successfully!", "success");
      setTeamForm({ id: "", name: "" });
      fetchTeams();
    } catch (err) {
      console.error(err);
      showSnackbar(err.response?.data?.message || "Error creating team", "error");
    } finally {
      setLoading(false);
    }
  };

  // Update team
  const updateTeam = async () => {
    const { id, name } = teamForm;
    if (!id) return showSnackbar("Enter Team ID to update", "warning");
    setLoading(true);
    try {
      await api.put(`/api/admin/teams/${id}`, { name });
      showSnackbar("Team updated successfully!", "success");
      setTeamForm({ id: "", name: "" });
      fetchTeams();
    } catch (err) {
      console.error(err);
      showSnackbar(err.response?.data?.message || "Error updating team", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete team
  const deleteTeam = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;
    setLoading(true);
    try {
      await api.delete(`/api/admin/teams/${id}`);
      showSnackbar("Team deleted!", "info");
      fetchTeams();
    } catch (err) {
      console.error(err);
      showSnackbar(err.response?.data?.message || "Error deleting team", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
      <Typography variant="h4" mb={2} fontWeight="bold">Teams Management</Typography>

      {/* Search */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="flex-end">
          <TextField
            label="Enter Team ID"
            value={searchTeamId}
            onChange={(e) => setSearchTeamId(e.target.value)}
            size="small"
          />
          <Button variant="contained" onClick={getTeamById}>Get Team Detail</Button>
          <Button variant="outlined" color="secondary" onClick={fetchTeams}>Show All</Button>
        </Stack>
      </Paper>

      {/* Team Form */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f1f8e9" }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            label="Team ID"
            value={teamForm.id}
            onChange={(e) => setTeamForm({ ...teamForm, id: e.target.value })}
            size="small"
          />
          <TextField
            label="Team Name"
            value={teamForm.name}
            onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
            size="small"
          />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={createTeam}>Create Team</Button>
          <Button variant="contained" color="info" onClick={updateTeam}>Update Team</Button>
        </Stack>
      </Paper>

      {/* Team Table */}
      <Paper sx={{ p: 2 }}>
        {loading ? <CircularProgress /> : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Owner ID</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Company ID</TableCell>
                  <TableCell>Member Count</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell>{team.id}</TableCell>
                    <TableCell>{team.name}</TableCell>
                    <TableCell>{team.owner_id}</TableCell>
                    <TableCell>{new Date(team.created_at).toLocaleString()}</TableCell>
                    <TableCell>{team.company_id}</TableCell>
                    <TableCell>{team.member_count}</TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined" color="error" onClick={() => deleteTeam(team.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TeamsPage;

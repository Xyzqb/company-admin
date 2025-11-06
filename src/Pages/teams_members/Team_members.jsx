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
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddCircleIcon from '@mui/icons-material/AddCircle';


const BASE_URL = "https://superfone-admin-xw3b.onrender.com";
const TOKEN = localStorage.getItem("authToken");

const TeamMembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTeamId, setSearchTeamId] = useState("");
  const [memberForm, setMemberForm] = useState({
    teamId: "",
    userId: "",
    role: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  const showSnackbar = (message, severity) =>
    setSnackbar({ open: true, message, severity });

  // ✅ Fetch all team members  --> working
  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/admin/team-members");
      setMembers(res.data?.team_members || []);
      showSnackbar("All team members loaded!", "success");
    } catch (err) {
      // console.error(err);
      showSnackbar(
        err.response?.data?.message || "Failed to fetch members",
        "error"
      );
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch team members by Team ID 
  const fetchMembersByTeam = async () => {
    if (!searchTeamId.trim()) return showSnackbar("Enter Team ID", "warning");
    setLoading(true);
    try {
      const res = await api.get("/api/admin/team-members", {
        params: { team_id: searchTeamId }, // use 'team_id' exactly as backend expects
      });
      setMembers(res.data?.team_members || []);
      if (res.data?.team_members?.length > 0)
        showSnackbar("Team members loaded!", "success");
      else showSnackbar("No members found for this team!", "info");
    } catch (err) {
      console.error(err);
      showSnackbar(
        err.response?.data?.message || "Error fetching team members",
        "error"
      );
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add team member
  const addMember = async () => {
    const { teamId, userId, role } = memberForm;
    if (!teamId || !userId || !role)
      return showSnackbar("Please fill all fields", "warning");

    setLoading(true);
    try {
      const payload = {
        team_id: Number(teamId),
        user_id: Number(userId),
        role: role,
      };
      console.log("Adding member with payload:", payload);

      const res = await api.post("/api/admin/team-members/add", payload);

      setMembers((prev) => [...prev, res.data.member]);
      showSnackbar("Member added successfully!", "success");
      setMemberForm({ teamId: "", userId: "", role: "" });
    } catch (err) {
      console.error(err.response?.data || err.message);
      showSnackbar(
        err.response?.data?.message || "Failed to add member",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove member
  const removeMember = async (teamId, userId) => {
    setLoading(true);
    try {
      await api.delete(`/api/admin/team-members/delete/${teamId}/${userId}`);
      setMembers((prev) => prev.filter((m) => m.user_id !== userId));
      showSnackbar("Member removed successfully!", "info");
    } catch (err) {
      console.error(err);
      showSnackbar(
        err.response?.data?.message || "Failed to remove member",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const clearFilter = () => {
    setSearchTeamId("");
    fetchMembers();
  };

  useEffect(() => {
    fetchMembers();
  }, []);
  console.log(members);
  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
      <Typography variant="h4" mb={2} fontWeight="bold">
        Team Members Management
      </Typography>

      {/* ✅ Search Section */}
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
            sx={{ width: "300px" }}
          />
          <Button
            variant="contained"
            onClick={fetchMembersByTeam}
            sx={{ width: "300px" }}
          >
            <SearchRoundedIcon/>
            Get Members by ID
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={clearFilter}
            sx={{ width: "250px" }}
          >
            <SearchRoundedIcon/>
            Show All
          </Button>
        </Stack>
      </Paper>
      {/* ✅ Add Member Section */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f1f8e9" }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            label="Team ID"
            value={memberForm.teamId}
            onChange={(e) =>
              setMemberForm({ ...memberForm, teamId: e.target.value })
            }
            size="small"
          />
          <TextField
            label="User ID"
            value={memberForm.userId}
            onChange={(e) =>
              setMemberForm({ ...memberForm, userId: e.target.value })
            }
            size="small"
          />
          <TextField
            label="Role"
            value={memberForm.role}
            onChange={(e) =>
              setMemberForm({ ...memberForm, role: e.target.value })
            }
            size="small"
          />
        </Stack>
        <Button
          variant="contained"
          color="primary"
          onClick={addMember}
          sx={{ mt: 2, gap:1}}
        >
          <AddCircleIcon/>
          Add Member
        </Button>
      </Paper>

      {/* ✅ Members Table */}
      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <CircularProgress />
            <Typography sx={{ mt: 1 }}>Loading members...</Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                  <TableCell align="center">Team ID</TableCell>
                  <TableCell align="center">Company ID</TableCell>
                  <TableCell align="center">Team Name</TableCell>
                  <TableCell align="center">User ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Mobile</TableCell>
                  <TableCell align="center">Role</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((m, index) => (
                  <TableRow key={`${m.team_id}-${m.user_id}-${index}`}>
                    <TableCell>{m.team_id}</TableCell>
                    <TableCell>{m.company_id}</TableCell>
                    <TableCell>{m.team_name}</TableCell>
                    <TableCell>{m.user_id}</TableCell>
                    <TableCell>{m.name}</TableCell>
                    <TableCell>{m.email}</TableCell>
                    <TableCell>{m.mobile}</TableCell>
                    <TableCell>{m.role}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => removeMember(m.team_id, m.user_id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* ✅ Snackbar */}
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

export default TeamMembersPage;

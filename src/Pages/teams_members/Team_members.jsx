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

const TeamMembersPage = () => {
  // 🔹 Dummy Users (for lookup)
  const dummyUsers = [
    { id: "USER001", name: "John Doe", email: "john@example.com" },
    { id: "USER002", name: "Jane Smith", email: "jane@example.com" },
    { id: "USER003", name: "Alex Johnson", email: "alex@example.com" },
    { id: "USER004", name: "Sophia Lee", email: "sophia@example.com" },
    { id: "USER005", name: "Michael Brown", email: "michael@example.com" },
  ];

  // 🔹 Dummy Members Data
  const dummyMembers = [
    { id: "M001", teamId: "TEAM1", userId: "USER001", role: "Leader" },
    { id: "M002", teamId: "TEAM1", userId: "USER002", role: "Developer" },
    { id: "M003", teamId: "TEAM2", userId: "USER003", role: "Tester" },
    { id: "M004", teamId: "TEAM2", userId: "USER004", role: "Designer" },
    { id: "M005", teamId: "TEAM3", userId: "USER005", role: "Support" },
  ];

  const [members, setMembers] = useState(dummyMembers);
  const [loading, setLoading] = useState(false);

  // Filters
  const [searchTeamId, setSearchTeamId] = useState("");

  // Form
  const [memberForm, setMemberForm] = useState({
    id: "",
    teamId: "",
    userId: "",
    role: "",
  });

  // Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const showSnackbar = (message, severity) =>
    setSnackbar({ open: true, message, severity });

  // Helper: Get user details
  const getUserInfo = (userId) => {
    const user = dummyUsers.find((u) => u.id === userId);
    return user ? `${user.name} (${user.email})` : userId;
  };

  // Filter members by teamId
  const filterByTeam = () => {
    if (!searchTeamId.trim()) return showSnackbar("Enter Team ID", "warning");
    setLoading(true);
    setTimeout(() => {
      const found = dummyMembers.filter(
        (m) => m.teamId.toLowerCase() === searchTeamId.toLowerCase()
      );
      if (found.length) setMembers(found), showSnackbar("Team members loaded!", "success");
      else setMembers([]), showSnackbar("No members found for this team!", "error");
      setLoading(false);
    }, 400);
  };

  // Clear filter
  const clearFilter = () => {
    setSearchTeamId("");
    setMembers(dummyMembers);
    showSnackbar("Showing all members", "info");
  };

  // Add new member
  const addMember = () => {
    const { id, teamId, userId, role } = memberForm;
    if (!id || !teamId || !userId || !role)
      return showSnackbar("Please fill all fields", "warning");

    if (members.some((m) => m.id === id))
      return showSnackbar("Member ID already exists", "error");

    const newMember = { id, teamId, userId, role };
    setMembers((prev) => [...prev, newMember]);
    showSnackbar("Member added successfully!", "success");
    setMemberForm({ id: "", teamId: "", userId: "", role: "" });
  };

  // Remove member
  const removeMember = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    showSnackbar("Member removed!", "info");
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  }, []);

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
      <Typography variant="h4" mb={2} fontWeight="bold">
        Team Members Management
      </Typography>

      {/* SEARCH SECTION */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Get Members by Team ID
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="flex-end">
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Enter Team ID"
              value={searchTeamId}
              onChange={(e) => setSearchTeamId(e.target.value)}
              fullWidth
              size="small"
            />
            <Button
              variant="outlined"
              onClick={filterByTeam}
              sx={{ mt: 1, width: "100%", bgcolor: "primary.main", color: "white" }}
            >
              Get Members
            </Button>
          </Box>
          <Button variant="contained" color="secondary" onClick={clearFilter} sx={{ height: "35px" }}>
            Show All
          </Button>
        </Stack>
      </Paper>

      {/* ADD MEMBER FORM */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f1f8e9" }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Add Team Member
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            label="Member ID"
            value={memberForm.id}
            onChange={(e) => setMemberForm({ ...memberForm, id: e.target.value })}
            size="small"
            fullWidth
          />
          <TextField
            label="Team ID"
            value={memberForm.teamId}
            onChange={(e) => setMemberForm({ ...memberForm, teamId: e.target.value })}
            size="small"
            fullWidth
          />
          <TextField
            label="User ID"
            value={memberForm.userId}
            onChange={(e) => setMemberForm({ ...memberForm, userId: e.target.value })}
            size="small"
            fullWidth
          />
          <TextField
            label="Role"
            value={memberForm.role}
            onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
            size="small"
            fullWidth
          />
        </Stack>
        <Button
          variant="contained"
          color="primary"
          onClick={addMember}
          sx={{ mt: 2 }}
        >
          Add Member
        </Button>
      </Paper>

      {/* MEMBERS TABLE */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Members List {members.length > 0 && `(${members.length})`}
        </Typography>

        {loading ? (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <CircularProgress />
            <Typography sx={{ mt: 1 }}>Loading members...</Typography>
          </Box>
        ) : members.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                  <TableCell><strong>Member ID</strong></TableCell>
                  <TableCell><strong>Team ID</strong></TableCell>
                  <TableCell><strong>User</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((m) => (
                  <TableRow
                    key={m.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    <TableCell>{m.id}</TableCell>
                    <TableCell>{m.teamId}</TableCell>
                    <TableCell>{getUserInfo(m.userId)}</TableCell>
                    <TableCell>{m.role}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => removeMember(m.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No members found
            </Typography>
            <Button variant="outlined" onClick={clearFilter} sx={{ mt: 1 }}>
              Refresh List
            </Button>
          </Box>
        )}
      </Paper>

      {/* SNACKBAR */}
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

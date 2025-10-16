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

const PhonesPage = () => {
  // 🔹 Dummy Phone Data
  const dummyPhones = [
    { id: "P001", number: "9876543210", userId: "USER001", teamId: "TEAM1" }, // 🆕 Added id
    { id: "P002", number: "9876501234", userId: "USER002", teamId: "TEAM1" },
    { id: "P003", number: "9999988888", userId: "USER003", teamId: "TEAM2" },
    { id: "P004", number: "8888877777", userId: "USER004", teamId: "TEAM2" },
    { id: "P005", number: "7777766666", userId: "USER005", teamId: "TEAM3" },
  ];

  const [phones, setPhones] = useState(dummyPhones);
  const [loading, setLoading] = useState(false);

  // Search / Filter
  const [searchTeamId, setSearchTeamId] = useState("");

  // Phone Form
  const [phoneForm, setPhoneForm] = useState({
    id: "", // 🆕 Added id field
    number: "",
    userId: "",
    teamId: "",
  });

  // Snackbar
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const showSnackbar = (message, severity) => setSnackbar({ open: true, message, severity });

  // Filter by Team
  const filterByTeam = () => {
    if (!searchTeamId.trim()) return showSnackbar("Enter Team ID", "warning");
    setLoading(true);
    setTimeout(() => {
      const found = dummyPhones.filter((p) => p.teamId.toLowerCase() === searchTeamId.toLowerCase());
      if (found.length) setPhones(found), showSnackbar("Phones found for this team!", "success");
      else setPhones([]), showSnackbar("No phones for this team!", "error");
      setLoading(false);
    }, 400);
  };

  // Clear filter
  const clearFilter = () => {
    setSearchTeamId("");
    setPhones(dummyPhones);
    showSnackbar("Showing all phone numbers", "info");
  };

  // Add new phone
  const addPhone = () => {
    const { id, number, userId, teamId } = phoneForm; // 🆕 include id
    if (!id || !number || !userId || !teamId)
      return showSnackbar("Fill all fields", "warning");

    if (phones.some((p) => p.number === number))
      return showSnackbar("Phone number already exists", "error");

    setPhones((prev) => [...prev, phoneForm]);
    showSnackbar("Phone added successfully!", "success");
    setPhoneForm({ id: "", number: "", userId: "", teamId: "" }); // 🆕 reset id too
  };

  // Delete phone
  const deletePhone = (number) => {
    setPhones((prev) => prev.filter((p) => p.number !== number));
    showSnackbar("Phone deleted!", "info");
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
      <Typography variant="h4" mb={2} fontWeight="bold">
        Phone Numbers Management
      </Typography>

      {/* SEARCH SECTION */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Filter Phone Numbers
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="flex-end">
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Filter by Team ID"
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
              Filter by Team
            </Button>
          </Box>

          <Button variant="contained" color="secondary" onClick={clearFilter} sx={{ height: "35px" }}>
            Show All
          </Button>
        </Stack>
      </Paper>

      {/* ADD PHONE FORM */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f1f8e9" }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Add New Phone Number
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            label="ID" // 🆕 new field
            value={phoneForm.id}
            onChange={(e) => setPhoneForm({ ...phoneForm, id: e.target.value })}
            size="small"
            fullWidth
          />
          <TextField
            label="Phone Number"
            value={phoneForm.number}
            onChange={(e) => setPhoneForm({ ...phoneForm, number: e.target.value })}
            size="small"
            fullWidth
          />
          <TextField
            label="User ID"
            value={phoneForm.userId}
            onChange={(e) => setPhoneForm({ ...phoneForm, userId: e.target.value })}
            size="small"
            fullWidth
          />
          <TextField
            label="Team ID"
            value={phoneForm.teamId}
            onChange={(e) => setPhoneForm({ ...phoneForm, teamId: e.target.value })}
            size="small"
            fullWidth
          />
        </Stack>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={addPhone}>
          Add Phone
        </Button>
      </Paper>

      {/* PHONE TABLE */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Phone List {phones.length > 0 && `(${phones.length})`}
        </Typography>

        {loading ? (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <CircularProgress />
            <Typography sx={{ mt: 1 }}>Loading phone numbers...</Typography>
          </Box>
        ) : phones.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                  <TableCell><strong>ID</strong></TableCell> {/* 🆕 added */}
                  <TableCell><strong>Phone Number</strong></TableCell>
                  <TableCell><strong>User ID</strong></TableCell>
                  <TableCell><strong>Team ID</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {phones.map((phone, index) => (
                  <TableRow
                    key={phone.number || index}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    <TableCell>{phone.id}</TableCell> {/* 🆕 show id */}
                    <TableCell sx={{ fontFamily: "monospace", fontSize: "0.9rem" }}>
                      {phone.number}
                    </TableCell>
                    <TableCell>{phone.userId}</TableCell>
                    <TableCell>{phone.teamId}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => deletePhone(phone.number)}
                      >
                        Delete
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
              No phone numbers found
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
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PhonesPage;

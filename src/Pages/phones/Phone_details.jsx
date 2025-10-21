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

const PhonesPage = () => {
  const BASE_URL = "https://superfone-admin-xw3b.onrender.com";
  const token =
    localStorage.getItem("authToken") ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyIiwiZW1haWwiOiJhZG1pbkBhYmNkLmNvbSIsImdsb2JhbF9yb2xlIjoiYWRtaW4iLCJjb21wYW55X2lkIjoiMiIsImlhdCI6MTc2MTAyMTE0NCwiZXhwIjoxNzYxMTA3NTQ0fQ.P6Yd6qwhCoORGg7SFsHnF9AINty4amVokAXFdd3t3gY";

  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTeamId, setSearchTeamId] = useState("");
  const [phoneForm, setPhoneForm] = useState({ number: "", team_id: "" });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "info") =>
    setSnackbar({ open: true, message, severity });

  // Fetch all phones
  const fetchPhones = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/phones`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched phones:", res.data);
      setPhones(res.data);
    } catch (err) {
      console.error("Failed to fetch phones:", err);
      showSnackbar("Failed to fetch phones", "error");
      setPhones([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter by team
  const filterByTeam = async () => {
    if (!searchTeamId.trim()) return showSnackbar("Enter Team ID", "warning");
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/admin/phones/team/${searchTeamId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Fetching phones by team", searchTeamId);

      const list = res.data;
      setPhones(list);
      console.log("Filtered phones:", list);
      showSnackbar(
        list?.numbers?.length ? "Phones found!" : "No phones for this team",
        list.length ? "success" : "info"
      );
    } catch (err) {
      showSnackbar("Failed to fetch team phones", "error");
    } finally {
      setLoading(false);
    }
  };

  // Add new phone
  const addPhone = async () => {
    const { number, team_id } = phoneForm;
    console.log("Adding phone:", phoneForm);
    if (!number || !team_id)
      return showSnackbar("Fill all required fields", "warning");
    try {
      const res = await axios.post(
        `${BASE_URL}/api/admin/phones/add`,
        { number, team_id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Add phone response:", res.data);
      showSnackbar(res.data?.message || "Phone added successfully", "success");
      // fetchPhones();
      setPhoneForm({ number: "", team_id: "" });
    } catch (err) {
      // console.error("Add phone error:", err);
      showSnackbar("Failed to add phone", "error");
    }
  };

  // Delete phone
  const deletePhone = async (id) => {
    if (!id) return showSnackbar("Invalid ID for delete", "warning");
    try {
      await axios.delete(`${BASE_URL}/api/admin/phones/delete/${id}`,  {
        headers: { Authorization: `Bearer ${token}` },
      });
      showSnackbar("Phone deleted!", "info");
    } catch (err) {
      console.error("Delete phone error:", err);
      showSnackbar("Failed to delete phone", "error");
      fetchPhones();
    }
  };
  console.log("deleted", phones);

  const clearFilter = () => {
    setSearchTeamId("");
    fetchPhones();
    showSnackbar("Showing all phone numbers", "info");
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3, mb: 3 }}>
      <Typography variant="h4" mb={2} fontWeight="bold">
        Phone Numbers Management
      </Typography>

      {/* Filter Section */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Filter by Team
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="flex-end"
        >
          <TextField
            label="Team ID"
            value={searchTeamId}
            onChange={(e) => setSearchTeamId(e.target.value)}
            size="small"
            sx={{width:"300px"}}
          />
          <Button
            variant="outlined"
            onClick={filterByTeam}
            sx={{ bgcolor: "primary.main", color: "white", width:"300px" }}
          >
            Filter
          </Button>
          <Button variant="contained" color="secondary" onClick={clearFilter}
           sx={{width:"220px" }}
          >
            Show All
          </Button>
        </Stack>
      </Paper>

      {/* Add Phone Section */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f1f8e9" }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Add New Phone
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            label="Phone Number"
            value={phoneForm.number}
            onChange={(e) =>
              setPhoneForm({ ...phoneForm, number: e.target.value })
            }
            size="small"
          />
          <TextField
            label="Team ID"
            value={phoneForm.team_id}
            onChange={(e) =>
              setPhoneForm({ ...phoneForm, team_id: e.target.value })
            }
            size="small"
          />
          <Button variant="contained" color="primary" onClick={addPhone}
           sx={{width:"240px" }}
          >
            Add Phone
          </Button>
        </Stack>
      </Paper>

      {/* Phone Table */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Phone List ({phones.length})
        </Typography>

        {loading && !phones ? (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <CircularProgress />
            <Typography mt={1}>Loading phone numbers...</Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                  <TableCell align="center">
                    <strong>ID</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Team ID</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Provider</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Phone Number</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Company ID</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Created At</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Action</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {phones?.numbers?.map((phone, index) => (
                  <TableRow key={phone.id || index}>
                    <TableCell>{phone.id}</TableCell>
                    <TableCell>{phone.team_id}</TableCell>
                    <TableCell>{phone.provider || "-"}</TableCell>
                    <TableCell>{phone.number}</TableCell>
                    <TableCell>{phone.company_id}</TableCell>
                    <TableCell>
                      {new Date(phone.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => deletePhone(phone.id)}
                      >
                        Delete
                      </Button>
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

export default PhonesPage;

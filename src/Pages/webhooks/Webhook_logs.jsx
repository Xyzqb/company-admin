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

const WebhookLogsPage = () => {
  // 🔹 Dummy Logs Data
  const dummyLogs = [
    { id: "LOG001", teamId: "TEAM1", callDetails: "POST /webhook – success" },
    { id: "LOG002", teamId: "TEAM1", callDetails: "POST /webhook – failed (timeout)" },
    { id: "LOG003", teamId: "TEAM2", callDetails: "GET /status – success" },
    { id: "LOG004", teamId: "TEAM3", callDetails: "POST /webhook – success" },
    { id: "LOG005", teamId: "TEAM3", callDetails: "POST /webhook – failed (invalid payload)" },
  ];

  const [logs, setLogs] = useState(dummyLogs);
  const [loading, setLoading] = useState(false);

  // Filters
  const [searchLogId, setSearchLogId] = useState("");
  const [searchTeamId, setSearchTeamId] = useState("");

  // Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const showSnackbar = (message, severity) =>
    setSnackbar({ open: true, message, severity });

  // Filter by Log ID
  const getLogById = () => {
    if (!searchLogId.trim()) return showSnackbar("Enter Log ID", "warning");
    setLoading(true);
    setTimeout(() => {
      const found = dummyLogs.filter(
        (l) => l.id.toLowerCase() === searchLogId.toLowerCase()
      );
      if (found.length)
        setLogs(found), showSnackbar("Log found successfully!", "success");
      else setLogs([]), showSnackbar("No log found with this ID!", "error");
      setLoading(false);
    }, 400);
  };

  // Filter by Team ID
  const getLogsByTeamId = () => {
    if (!searchTeamId.trim()) return showSnackbar("Enter Team ID", "warning");
    setLoading(true);
    setTimeout(() => {
      const found = dummyLogs.filter(
        (l) => l.teamId.toLowerCase() === searchTeamId.toLowerCase()
      );
      if (found.length)
        setLogs(found), showSnackbar("Logs filtered by team successfully!", "success");
      else setLogs([]), showSnackbar("No logs found for this Team!", "error");
      setLoading(false);
    }, 400);
  };

  // Clear filter
  const clearFilter = () => {
    setSearchLogId("");
    setSearchTeamId("");
    setLogs(dummyLogs);
    showSnackbar("Showing all webhook logs", "info");
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  }, []);

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
      <Typography variant="h4" mb={2} fontWeight="bold">
        Webhook Logs Management
      </Typography>

      {/* SEARCH SECTION */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Get Log Details
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Search by Log ID"
              value={searchLogId}
              onChange={(e) => setSearchLogId(e.target.value)}
              size="small"
              fullWidth
            />
            <Button
              variant="outlined"
              onClick={getLogById}
              sx={{ mt: 1, width: "100%", bgcolor: "primary.main", color: "white" }}
            >
              Get Log by ID
            </Button>
          </Box>

          <Box sx={{ flex: 1 }}>
            <TextField
              label="Search by Team ID"
              value={searchTeamId}
              onChange={(e) => setSearchTeamId(e.target.value)}
              size="small"
              fullWidth
            />
            <Button
              variant="outlined"
              onClick={getLogsByTeamId}
              sx={{ mt: 1, width: "100%", bgcolor: "secondary.main", color: "white" }}
            >
              Get Logs by Team
            </Button>
          </Box>

          <Button
            variant="contained"
            color="info"
            onClick={clearFilter}
            sx={{ height: "40px", mt: { xs: 2, md: 0 } }}
          >
            Show All Logs
          </Button>
        </Stack>
      </Paper>

      {/* LOGS TABLE */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Logs List {logs.length > 0 && `(${logs.length})`}
        </Typography>

        {loading ? (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <CircularProgress />
            <Typography sx={{ mt: 1 }}>Loading logs...</Typography>
          </Box>
        ) : logs.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                  <TableCell><strong>Log ID</strong></TableCell>
                  <TableCell><strong>Team ID</strong></TableCell>
                  <TableCell><strong>Call Details</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log) => (
                  <TableRow
                    key={log.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    <TableCell>{log.id}</TableCell>
                    <TableCell>{log.teamId}</TableCell>
                    <TableCell>{log.callDetails}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No logs found
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

export default WebhookLogsPage;

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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import axios from "axios";

const TOKEN = localStorage.getItem("authToken");
const WebhookLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPayload, setSelectedPayload] = useState(null);

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

  const api = axios.create({
    baseURL: "https://superfone-admin-xw3b.onrender.com",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });


  // ✅ Fetch all logs
  const fetchAllLogs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/admin/webhook-logs");
      setLogs(res.data?.logs || []);
      showSnackbar("All logs loaded successfully!", "success");
    } catch (err) {
      console.error(err);
      showSnackbar(
        err.response?.data?.message || "Failed to fetch logs",
        "error"
      );
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch log by ID
  const getLogById = async () => {
    if (!searchLogId.trim()) return showSnackbar("Enter Log ID", "warning");
    setLoading(true);

    try {
      const res = await api.get(`/api/admin/webhook-logs/${searchLogId}`);
      const logData = res.data?.webhook_log; // separate const statement
      setLogs(logData ? [logData] : []);

      if (logData) showSnackbar("Log found successfully!", "success");
      else showSnackbar("No log found with this ID!", "error");
    } catch (err) {
      console.error(err);
      showSnackbar(
        err.response?.data?.message || "Error fetching Log by ID",
        "error"
      );
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch logs by Team ID
  const getLogsByTeamId = async () => {
    if (!searchTeamId.trim()) return showSnackbar("Enter Team ID", "warning");
    setLoading(true);
    try {
      const res = await api.get(`/api/admin/webhook-logs/team/${searchTeamId}`);
      setLogs(res.data?.logs || []);
      if (res.data?.logs?.length > 0)
        showSnackbar("Logs filtered by team successfully!", "success");
      else showSnackbar("No logs found for this Team!", "error");
    } catch (err) {
      console.error(err);
      showSnackbar(
        err.response?.data?.message || "Error fetching logs by team",
        "error"
      );
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const clearFilter = () => {
    setSearchLogId("");
    setSearchTeamId("");
    fetchAllLogs();
  };

  useEffect(() => {
    fetchAllLogs();
  }, []);

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
      <Typography variant="h5" mb={2} fontWeight="bold">
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
              sx={{
                mt: 1,
                width: "100%",
                bgcolor: "primary.main",
                color: "white",
              }}
            >
              <SearchRoundedIcon/>
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
              sx={{
                mt: 1,
                width: "100%",
                bgcolor: "secondary.main",
                color: "white",
              }}
            >
              <SearchRoundedIcon/>
              Get Logs by Team
            </Button>
          </Box>

          <Button
            variant="contained"
            color="info"
            onClick={clearFilter}
            sx={{ height: "40px", mt: { xs: 2, md: 0 } }}
          >
            <SearchRoundedIcon/>
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
                  <TableCell>
                    <strong>Log ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Team ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Event Type</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Payload</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Received At</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log, index) => (
                  <TableRow
                    key={log.id || index}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    <TableCell>{log.id}</TableCell>
                    <TableCell>{log.team_id}</TableCell>
                    <TableCell>{log.event_type}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => setSelectedPayload(log.payload)}
                      >
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {new Date(log.received_at).toLocaleString()}
                    </TableCell>
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

      {/* PAYLOAD DETAILS DIALOG */}
      <Dialog
        open={!!selectedPayload}
        onClose={() => setSelectedPayload(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <span>Webhook Payload Details</span>
          <IconButton onClick={() => setSelectedPayload(null)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {JSON.stringify(selectedPayload, null, 2)}
          </pre>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setSelectedPayload(null)}
            color="primary"
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

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

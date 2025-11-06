import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Stack,
  TextField,
  Grid,
  Tooltip,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DownloadIcon from "@mui/icons-material/Download";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import axios from "axios";

const BASE_URL = "https://superfone-admin-xw3b.onrender.com";

const Calls_Details = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchTeamId, setSearchTeamId] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const token = localStorage.getItem("authToken");
  const showSnackbar = (message, severity) =>
    setSnackbar({ open: true, message, severity });

  // 🔹 Fetch All Calls
  const fetchAllCalls = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/calls`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCalls(res.data?.calls || []);
    } catch (err) {
      console.error("Error:", err);
      showSnackbar("Failed to fetch calls!", "error");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch by Call ID
  const fetchCallById = async () => {
    if (!searchId.trim()) return showSnackbar("Enter call ID", "warning");
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/calls/${searchId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCalls([res.data?.call || res.data]);
      showSnackbar("Call found!", "success");
    } catch {
      showSnackbar("No call found!", "error");
    } finally {
      setLoading(false);
      setSearchId("");
    }
  };

  // 🔹 Fetch by Team ID
  const fetchCallsByTeamId = async () => {
    setLoading(true);
    try {
      let res;
      if (!searchTeamId.trim()) {
        res = await axios.get(`${BASE_URL}/api/admin/calls`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        res = await axios.get(`${BASE_URL}/api/admin/calls/filter`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { teamId: searchTeamId },
        });
      }
      setCalls(res.data?.calls || []);
      showSnackbar("Filtered calls loaded!", "success");
    } catch {
      showSnackbar("Error filtering calls", "error");
    } finally {
      setLoading(false);
      setSearchTeamId("");
    }
  };

  useEffect(() => {
    fetchAllCalls();
  }, []);

  return (
    <Box sx={{ p: 2, mx: "auto", mt: 3 }}>
      <Typography variant="h5" mb={2} fontWeight="bold">
        Call Details
      </Typography>

      {/* 🔹 Search Section */}
      <Paper sx={{ p: 2, mb: 3, backgroundColor: "#f8fafc" }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Search Calls
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="flex-end"
        >
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Search by Call ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              sx={{ width: "300px" }}
              size="small"
            />
            <Button
              variant="contained"
              sx={{ mt: 1, width: "300px" }}    
              onClick={fetchCallById}
            >
              <SearchRoundedIcon />
              Search by ID
            </Button>
          </Box>

          <Box sx={{ flex: 1 }}>
            <TextField
              label="Search by Team ID"
              sx={{ width: "300px" }}
              value={searchTeamId}
              onChange={(e) => setSearchTeamId(e.target.value)}
              size="small"
            />
            <Button
              variant="contained"
              sx={{ mt: 1, width: "300px" }}
              onClick={fetchCallsByTeamId}
            >
              <SearchRoundedIcon />
              Search by Team ID
            </Button>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={fetchAllCalls}
            sx={{ height: "36px", width: "300px" }}
          >
            <SearchRoundedIcon />
            Show All
          </Button>
        </Stack>
      </Paper>

      {/* 🔹 Calls in Card Format */}
      {loading ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
          <Typography sx={{ mt: 1 }}>Loading calls...</Typography>
        </Box>
      ) : calls.length > 0 ? (
        <Grid container spacing={2}>
          {calls.map((call, index) => (
            <Grid item xs={4} sm={4} md={4} lg={3} key={index}>
              <Accordion
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: "#e2e8f0",
                    borderRadius: "8px 8px 0 0",
                    height: "110px",
                    width:"305px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{textAlign:"center"}}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Team ID: {call.team_id || "N/A"}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{textAlign:"center"}}>
                      Call ID: {call.id || "N/A"}
                    </Typography>
                  </Box>
                </AccordionSummary>

                <AccordionDetails>
                  <Stack spacing={1}>
                    <Typography>
                      <strong>From:</strong> {call.from_number || "N/A"}
                    </Typography>
                    <Typography>
                      <strong>To:</strong> {call.to_number || "N/A"}
                    </Typography>
                    <Typography>
                      <strong>Status:</strong> {call.status || "N/A"}
                    </Typography>
                    <Typography>
                      <strong>Duration:</strong>{" "}
                      {call.duration
                        ? typeof call.duration === "object"
                          ? `${call.duration.seconds || 0}s`
                          : call.duration
                        : "N/A"}
                    </Typography>
                    <Typography>
                      <strong>Started At:</strong>{" "}
                      {call.started_at
                        ? new Date(call.started_at).toLocaleString()
                        : "N/A"}
                    </Typography>

                    {/* 🎧 Recording Section */}
                    <Box sx={{ textAlign: "center", mt: 1 }}>
                      {call.recording_url ? (
                        <>
                          <Tooltip title="Play Recording">
                            <IconButton
                              color="primary"
                              href={call.recording_url}
                              target="_blank"
                            >
                              <PlayArrowIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Download Recording">
                            <IconButton
                              color="secondary"
                              href={call.recording_url}
                              download
                            >
                              <DownloadIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <Typography color="text.secondary" variant="body2">
                          No Recording Available
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No calls found
          </Typography>
          <Button variant="outlined" onClick={fetchAllCalls} sx={{ mt: 2 }}>
            Refresh
          </Button>
        </Box>
      )}

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

export default Calls_Details;

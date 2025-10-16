import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Slider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const CallDetails = () => {
  const [callHistory, setCallHistory] = useState([
    {
      agent: "John Doe",
      recipient: "123-456-7890",
      dateTime: "2025-09-27 10:30 AM",
      status: "Answered",
      recording: "/sample-audio.mp3", // Example recording URL
    },
    {
      agent: "Jane Smith",
      recipient: "987-654-3210",
      dateTime: "2025-09-26 02:15 PM",
      status: "Answered",
      recording: "/sample-audio.mp3",
    },
    {
      agent: "Bob Lee",
      recipient: "555-555-5555",
      dateTime: "2025-09-25 11:45 AM",
      status: "UnAnswered",
      recording: "/sample-audio.mp3",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter] = useState("All");

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  useEffect(() => {
    let interval;
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
      interval = setInterval(() => {
        setProgress(Math.floor(audioRef.current.currentTime));
      }, 1000);
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleDelete = (index) => {
    const updated = callHistory.filter((_, i) => i !== index);
    setCallHistory(updated);
  };

  const handleEdit = (call) => {
    alert(`Edit call for agent: ${call.agent}`);
  };

  const handleCopy = (call) => {
    const text = `Agent: ${call.agent}\nRecipient: ${call.recipient}\nDate: ${call.dateTime}\nStatus: ${call.status}`;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const filteredCalls = callHistory.filter((c) => {
    const matchesFilter = filter === "All" || c.status === filter;
    const matchesSearch =
      c.agent.toLowerCase().includes(search.toLowerCase()) ||
      c.recipient.includes(search) ||
      c.dateTime.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setMuted(!muted);

  return (
    <Box
      sx={{ p: 2, minHeight: "100vh", background: "#1e293b", color: "#fff", width:"100%", height:"100%" }}
    >
      {/* Header */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, pt:3}}>
        Call Details
      </Typography>

      {/* Search */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          placeholder="Search by Agent, Caller/Recipient..."
          size="small"
          variant="outlined"
          sx={{ flex: 1, maxWidth: 400, background: "#fff", borderRadius: 1 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Table */}
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          background: "#283645",
          color: "#fff",
          overflowX: "auto",
          mb: 3,
        }}
      >
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Agent Summary
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Date
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Time
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Call Status
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCalls.length > 0 ? (
                filteredCalls.map((call, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: "#fff" }}>{call.agent}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      {call.dateTime.split(" ")[0]}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      {call.dateTime.split(" ")[1]}{" "}
                      {call.dateTime.split(" ")[2]}
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>{call.status}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(call)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="success"
                        onClick={() => handleCopy(call)}
                      >
                        <ContentCopyIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    sx={{ color: "#fff", textAlign: "center" }}
                  >
                    No records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Call Recording Section */}
      <Paper
        sx={{
          p: 1,
          borderRadius: 2,
          background: "#334155",
          color: "#fff",
          width: "400px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Call Recording
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={togglePlay}
            sx={{ color: "#fff", background: "#475569" }}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <Slider
            value={progress}
            max={330} // 5:30 = 330 seconds
            onChange={(e, val) => {
              setProgress(val);
              if (audioRef.current) audioRef.current.currentTime = val;
            }}
            sx={{ flex: 1, color: "#38bdf8" }}
          />
          <Typography variant="body2">
            {Math.floor(progress / 60)}:{String(progress % 60).padStart(2, "0")}{" "}
            / 05:30
          </Typography>
          <IconButton onClick={toggleMute} sx={{ color: "#fff" }}>
            {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>
        </Box>

        {/* Audio Element */}
        <audio ref={audioRef} src={callHistory[0]?.recording} />
      </Paper>
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          background: "#334155",
          color: "#fff",
          width: "1000px",
          mt: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Agent Notes
        </Typography>
        <Typography sx={{ fontWeight: "normal", mb: 1 }}>
          Diecussed project status update. Client seems salisl/ed wiih the
          progress. Schetuled folow-up.lor the week.
        </Typography>
      </Paper>
    </Box>
  );
};

export default CallDetails;

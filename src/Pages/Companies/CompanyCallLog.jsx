// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Grid,
//   Paper,
//   Typography,
//   TextField,
//   InputAdornment,
//   IconButton,
//   TableContainer,
//   Table,
//   TableHead,
//   TableCell,
//   TableRow,
//   TableBody,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import EditIcon from "@mui/icons-material/Edit";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import DeleteIcon from "@mui/icons-material/Delete";

// const CompanyCallLog = () => {
//   // ✅ State for calls
//   const [callHistory, setCallHistory] = useState([
//     {
//       agent: "John Doe",
//       recipient: "123-456-7890",
//       dateTime: "2025-09-27 10:30 AM",
//       duration: "5 min",
//       status: "Completed",
//     },
//     {
//       agent: "Jane Smith",
//       recipient: "987-654-3210",
//       dateTime: "2025-09-26 02:15 PM",
//       duration: "2 min",
//       status: "Missed",
//     },
//     {
//       agent: "Bob Lee",
//       recipient: "555-555-5555",
//       dateTime: "2025-09-25 11:45 AM",
//       duration: "7 min",
//       status: "Completed",
//     },
//   ]);

//   const [filter, setFilter] = useState("All");
//   const [search, setSearch] = useState("");

//   // ✅ Delete call
//   const handleDelete = (index) => {
//     const updated = callHistory.filter((_, i) => i !== index);
//     setCallHistory(updated);
//   };

//   // ✅ Add dummy missed call
//   const handleAddContact = () => {
//     const newCall = {
//       agent: "New Agent",
//       recipient: "000-000-0000",
//       dateTime: "2025-09-28 09:00 AM",
//       duration: "3 min",
//       status: "Missed",
//     };
//     setCallHistory([...callHistory, newCall]);
//   };

//   // ✅ Import dummy calls
//   const handleImportContacts = () => {
//     const imported = [
//       {
//         agent: "Alice",
//         recipient: "111-222-3333",
//         dateTime: "2025-09-29 01:00 PM",
//         duration: "6 min",
//         status: "Completed",
//       },
//       {
//         agent: "Mark",
//         recipient: "444-555-6666",
//         dateTime: "2025-09-30 04:20 PM",
//         duration: "4 min",
//         status: "Missed",
//       },
//     ];
//     setCallHistory([...callHistory, ...imported]);
//   };

//   // ✅ Save
//   const handleSave = () => {
//     alert("Call log saved successfully!");
//   };

//   // ✅ Filter + Search logic
//   const filteredCalls = callHistory.filter((c) => {
//     const matchesFilter = filter === "All" || c.status === filter;
//     const matchesSearch =
//       c.agent.toLowerCase().includes(search.toLowerCase()) ||
//       c.recipient.includes(search) ||
//       c.dateTime.toLowerCase().includes(search.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   return (
//     <Box
//       sx={{ p: 1, minHeight: "100vh", background: "#1e293b", color: "#fff" }}
//     >
//       {/* Header */}
//       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, pt: 5 }}>
//         Company Call Log
//       </Typography>

//       {/* Search */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           gap: 2,
//           mb: 2,
//         }}
//       >
//         <TextField
//           placeholder="Search by Agent, Caller/Recipient..."
//           size="small"
//           variant="outlined"
//           sx={{ flex: 1, maxWidth: 400, background: "#fff", borderRadius: 1 }}
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton>
//                   <SearchIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       {/* Filters + Actions */}
//       <Grid container spacing={2} sx={{ mb: 2, alignItems: "center" }}>
//         <Grid item>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => setFilter("All")}
//           >
//             All
//           </Button>
//         </Grid>
//         <Grid item>
//           <Button
//             variant="contained"
//             sx={{ background: "#fff", color: "#1e293b" }}
//             onClick={() => setFilter("Completed")}
//           >
//             Incoming
//           </Button>
//         </Grid>
//         <Grid item>
//           <Button
//             variant="contained"
//             sx={{ background: "#fff", color: "#1e293b" }}
//             onClick={() => setFilter("Missed")}
//           >
//             Outgoing
//           </Button>
//         </Grid>

//         {/* Right aligned actions */}
//         <Grid item xs />
//         <Grid item>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleAddContact}
//           >
//             Missed
//           </Button>
//         </Grid>
//         <Grid item>
//           <Button
//             variant="contained"
//             sx={{ background: "#fff", color: "#1e293b" }}
//             onClick={handleImportContacts}
//           >
//             Date Range
//           </Button>
//         </Grid>
//       </Grid>

//       {/* Divider */}
//       <Box sx={{ borderBottom: "1px solid white", my: 2 }} />

//       {/* Table */}
//       <Paper
//         sx={{
//           p: 2,
//           borderRadius: 2,
//           background: "#283645",
//           color: "#fff",
//           overflowX: "auto",
//         }}
//       >
//         <TableContainer>
//           <Table size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
//                   Agent
//                 </TableCell>
//                 <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
//                   Caller/Recipient
//                 </TableCell>
//                 <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
//                   Date-Time
//                 </TableCell>
//                 <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
//                   Duration
//                 </TableCell>
//                 <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
//                   Call Status
//                 </TableCell>
//                 <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredCalls.length > 0 ? (
//                 filteredCalls.map((call, index) => (
//                   <TableRow key={index}>
//                     <TableCell sx={{ color: "#fff" }}>{call.agent}</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>
//                       {call.recipient}
//                     </TableCell>
//                     <TableCell sx={{ color: "#fff" }}>
//                       {call.dateTime}
//                     </TableCell>
//                     <TableCell sx={{ color: "#fff" }}>
//                       {call.duration}
//                     </TableCell>
//                     <TableCell sx={{ color: "#fff" }}>{call.status}</TableCell>
//                     <TableCell>
//                       <IconButton
//                         color="primary"
//                         onClick={() => handleEdit(index)}
//                       >
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton
//                         color="secondary"
//                         onClick={() => handleCopy(call)}
//                       >
//                         <ContentCopyIcon />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDelete(index)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={6}
//                     sx={{ color: "#fff", textAlign: "center" }}
//                   >
//                     No records found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>

//       {/* Save Button */}
//       <Box textAlign="center" sx={{ mt: 3 }}>
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           onClick={handleSave}
//         >
//           Save Call Log
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default CompanyCallLog;


import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";

const CompanyCallLog = () => {
  // ✅ State for calls
  const [callHistory, setCallHistory] = useState([
    {
      agent: "John Doe",
      recipient: "123-456-7890",
      dateTime: "2025-09-27 10:30 AM",
      duration: "5 min",
      status: "Completed",
    },
    {
      agent: "Jane Smith",
      recipient: "987-654-3210",
      dateTime: "2025-09-26 02:15 PM",
      duration: "2 min",
      status: "Missed",
    },
    {
      agent: "Bob Lee",
      recipient: "555-555-5555",
      dateTime: "2025-09-25 11:45 AM",
      duration: "7 min",
      status: "Completed",
    },
  ]);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({
    agent: "",
    recipient: "",
    dateTime: "",
    duration: "",
    status: "",
  });

  // ✅ Delete call
  const handleDelete = (index) => {
    const updated = callHistory.filter((_, i) => i !== index);
    setCallHistory(updated);
  };

  // ✅ Copy call
  const handleCopy = (call) => {
    const copied = { ...call, dateTime: new Date().toLocaleString() };
    setCallHistory([...callHistory, copied]);
    alert("Call copied successfully!");
  };

  // ✅ Edit call (open dialog)
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData(callHistory[index]);
  };

  // ✅ Save edited call
  const handleSaveEdit = () => {
    const updated = [...callHistory];
    updated[editingIndex] = editData;
    setCallHistory(updated);
    setEditingIndex(null);
    alert("Call updated successfully!");
  };

  // ✅ Cancel editing
  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  // ✅ Add dummy missed call
  const handleAddContact = () => {
    const newCall = {
      agent: "New Agent",
      recipient: "000-000-0000",
      dateTime: new Date().toLocaleString(),
      duration: "3 min",
      status: "Missed",
    };
    setCallHistory([...callHistory, newCall]);
  };

  // ✅ Import dummy calls
  const handleImportContacts = () => {
    const imported = [
      {
        agent: "Alice",
        recipient: "111-222-3333",
        dateTime: "2025-09-29 01:00 PM",
        duration: "6 min",
        status: "Completed",
      },
      {
        agent: "Mark",
        recipient: "444-555-6666",
        dateTime: "2025-09-30 04:20 PM",
        duration: "4 min",
        status: "Missed",
      },
    ];
    setCallHistory([...callHistory, ...imported]);
  };

  // ✅ Save all calls
  const handleSave = () => {
    alert("Call log saved successfully!");
  };

  // ✅ Filter + Search logic
  const filteredCalls = callHistory.filter((c) => {
    const matchesFilter = filter === "All" || c.status === filter;
    const matchesSearch =
      c.agent.toLowerCase().includes(search.toLowerCase()) ||
      c.recipient.includes(search) ||
      c.dateTime.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Box sx={{ p: 1, minHeight: "100vh", background: "#1e293b", color: "#fff", width:"100%", height:"100%"}}>
      {/* Header */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, pt: 5 }}>
        Company Call Log
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

      {/* Filters + Actions */}
      <Grid container spacing={2} sx={{ mb: 2, alignItems: "center" }}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => setFilter("All")}>
            All
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ background: "#fff", color: "#1e293b" }}
            onClick={() => setFilter("Completed")}
          >
            Incoming
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ background: "#fff", color: "#1e293b" }}
            onClick={() => setFilter("Missed")}
          >
            Outgoing
          </Button>
        </Grid>

        {/* Right aligned actions */}
        <Grid item xs />
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleAddContact}>
            Missed
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ background: "#fff", color: "#1e293b" }}
            onClick={handleImportContacts}
          >
            Date Range
          </Button>
        </Grid>
      </Grid>

      {/* Divider */}
      <Box sx={{ borderBottom: "1px solid white", my: 2 }} />

      {/* Table */}
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          background: "#283645",
          color: "#fff",
          overflowX: "auto",
        }}
      >
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Agent</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Caller/Recipient
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Date-Time</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Duration</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Call Status</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCalls.length > 0 ? (
                filteredCalls.map((call, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: "#fff" }}>{call.agent}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{call.recipient}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{call.dateTime}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{call.duration}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{call.status}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEdit(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleCopy(call)}>
                        <ContentCopyIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} sx={{ color: "#fff", textAlign: "center" }}>
                    No records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Save Button */}
      <Box textAlign="center" sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" size="large" onClick={handleSave}>
          Save Call Log
        </Button>
      </Box>

      {/* Edit Dialog */}
      <Dialog open={editingIndex !== null} onClose={handleCancelEdit}>
        <DialogTitle>Edit Call</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Agent"
            value={editData.agent}
            onChange={(e) => setEditData({ ...editData, agent: e.target.value })}
          />
          <TextField
            label="Recipient"
            value={editData.recipient}
            onChange={(e) => setEditData({ ...editData, recipient: e.target.value })}
          />
          <TextField
            label="Date-Time"
            value={editData.dateTime}
            onChange={(e) => setEditData({ ...editData, dateTime: e.target.value })}
          />
          <TextField
            label="Duration"
            value={editData.duration}
            onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
          />
          <TextField
            label="Status"
            value={editData.status}
            onChange={(e) => setEditData({ ...editData, status: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompanyCallLog;

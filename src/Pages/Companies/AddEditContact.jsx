// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Grid,
//   Paper,
//   Typography,
//   TextField,
//   Switch,
//   FormControlLabel,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Checkbox,
//   Tabs,
//   Tab,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

// const AddEditContact = () => {
//   const [selectedDept, setSelectedDept] = useState("");
//   const [password, setPassword] = useState("");
//   const [tabValue, setTabValue] = useState(0);
//   const [profileImage, setProfileImage] = useState(null);

// const departments = ["Sales", "Support", "Marketing", "Finance"];

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImage(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <Box
//       sx={{
//         p: 3,
//         minHeight: "100vh",
//         background: "#1e293b",
//         backgroundSize: "cover",
//         color: "#fff",
//       }}
//     >
//       {/* Header */}
//       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 , pt:2}}>
//         Add/Edit Contact
//       </Typography>

//       {/* Top Row */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           alignItems: { xs: "stretch", md: "center" },
//           justifyContent: "space-between",
//           gap: 2,
//           mb: 3,
//         }}
//       >
//         {/* Search */}
//         <TextField
//           placeholder="Search Name..."
//           size="small"
//           variant="outlined"
//           sx={{ flex: 1, maxWidth: 400, background: "#fff", borderRadius: 1 }}
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

//       {/* Two Column Layout */}
//       <Grid container spacing={3}>
//         {/* LEFT SIDE */}
//         <Grid item xs={12} md={5}>
//           <Paper
//             sx={{
//               p: 3,
//               borderRadius: 2,
//               background:"#1e293b",
//               minHeight: 300, // You can adjust this
//               width: { xs: "100%", sm: 250, md: 300 },
//             }}
//           >

//              {/* Company  Number */}
//           <Typography style={{fontWeight:"normal"}}>Company</Typography>
//             <TextField
//               fullWidth
//               label="Company Name"
//               size="small"
//               sx={{ mb: 2 }}
//             />

//             {/* Agent Name */}
//               <Typography style={{fontWeight:"normal"}}>Email Address</Typography>
//             <TextField
//               fullWidth
//               label="Email Address"
//               size="small"
//               sx={{ mb: 2 }}
//             />

//             {/* Phone Number */}
//              <Typography style={{fontWeight:"normal"}}>Phone Number</Typography>
//             <TextField
//               fullWidth
//               label="Phone Number"
//               size="small"
//               sx={{ mb: 2 }}
//             />
//           </Paper>
//         </Grid>

//         {/* Right side  */}
//         <Grid item xs={12} md={7}>
//           <Paper
//             sx={{
//               p: 3,
//               borderRadius: 2,
//               width: 400,
//               height: 300,
//             }}
//           >
//             <Typography style={{ color: "black", fontWeight: "bold", mb: 1 }}>
//               Notes
//             </Typography>

//             <Typography style={{ color: "black", fontWeight: "bold", mb: 1 }}>
//               Select Department
//             </Typography>

//             {/* Assign Department */}
//             <FormControl fullWidth size="small" sx={{ mb: 2 }}>
//               <InputLabel>Assign Department</InputLabel>
//               <Select
//                 value={selectedDept}
//                 onChange={(e) => setSelectedDept(e.target.value)}
//               >
//                 {departments.map((dept, i) => (
//                   <MenuItem key={i} value={dept}>
//                     {dept}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             {/* New Password */}
//             <TextField
//               fullWidth
//               label="New Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               size="small"
//               sx={{ mb: 2 }}
//             />

//             {/* Reset Password */}
//             <TextField
//               fullWidth
//               label="Reset Password"
//               type="password"
//               size="small"
//               sx={{ mb: 2 }}
//             />
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Save Button */}
//       <Box textAlign="center" sx={{ mt: 3 }}>
//         <Button variant="contained" color="primary" size="large">
//           Save Agent
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default AddEditContact;





import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const AddEditAgent = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");

  const handleSave = () => {
    const agentData = { companyName, email, phone, department };
    console.log(agentData);
    alert("Agent data saved! Check console.");
  };

  return (
    <Box sx={{ p:2 ,width:"100%", background: "#334155", height:"100%"}}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", pt: 5 }}>
        Add/Edit Contact
      </Typography>

      {/* Search Field */}
      <Box
        sx={{
          display: "flex",
          mb: 3,
        }}
      >
        <TextField
          placeholder="Search Contact..."
          size="small"
          variant="outlined"
          sx={{ flex: 1, maxWidth: 700, background: "#fff", borderRadius: 1 }}
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

      {/* Main Form */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        {/* Left Panel */}
        <Paper sx={{ p: 3, flex: 1 }}>
          <Stack spacing={2}>
            <Typography variant="subtitle2">Company Name</Typography>
            <TextField
              fullWidth
              size="small"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <Typography variant="subtitle2">Email Address</Typography>
            <TextField
              fullWidth
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Typography variant="subtitle2">Phone Number</Typography>
            <TextField
              fullWidth
              size="small"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Button sx={{ background: "blue", color: "white" }}>
              + Add Another Number
            </Button>
          </Stack>
        </Paper>

        {/* Right Panel */}
        <Paper sx={{ p: 3, flex: 1 }}>
          <Stack spacing={2}>
            <Typography variant="subtitle2">Department</Typography>
            <FormControl fullWidth size="small">
              <InputLabel>Select Department</InputLabel>
              <Select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="Support">Support</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
              </Select>
            </FormControl>

            <Divider sx={{ my: 3, bgcolor: "black" }} />

            <Typography variant="subtitle2">Notes</Typography>
            <TextField fullWidth size="small" multiline rows={4} />
          </Stack>
        </Paper>
      </Stack>

      {/* Save Button */}
      <Box textAlign="center" sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSave}
        >
          Save Contact
        </Button>
      </Box>
    </Box>
  );
};

export default AddEditAgent;



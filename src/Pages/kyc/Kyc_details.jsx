// import React, { useState } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Divider,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import logo from "../../assets/digidial_logo.jpg";

// const KYCForm = () => {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     contactPerson: "",
//     mobile: "",
//     email: "",
//     website: "",
//     address1: "",
//     address2: "",
//     gstNo: "",
//     companyPan: "",
//     gstDoc: null,
//     companyPanDoc: null,
//     directorPan: null,
//     directorAadhaar: null,
//   });

//   const [department, setDepartment] = useState("");
//   const [successOpen, setSuccessOpen] = useState(false);

//   // 🔹 Handle text input
//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // 🔹 Handle file upload
//   const handleFileChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.files[0] });

//   // 🔹 Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prepare form data
//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });
//     data.append("department", department);

//     // 🔹 Example API call (replace with your endpoint)
//     try {
//       /*
//       const response = await fetch("YOUR_API_URL_HERE", {
//         method: "POST",
//         body: data,
//       });
//       const result = await response.json();
//       console.log("API response:", result);
//       */
//       console.log("✅ KYC Data Submitted:", Object.fromEntries(data));

//       // Show success message
//       setSuccessOpen(true);

//       // Reset form
//       setFormData({
//         companyName: "",
//         contactPerson: "",
//         mobile: "",
//         email: "",
//         website: "",
//         address1: "",
//         address2: "",
//         gstNo: "",
//         companyPan: "",
//         gstDoc: null,
//         companyPanDoc: null,
//         directorPan: null,
//         directorAadhaar: null,
//       });
//       setDepartment("");
//     } catch (error) {
//       console.error("Error submitting KYC:", error);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSuccessOpen(false);
//   };

//   // Placeholder style
//   const placeholderStyle = {
//     "&::placeholder": { fontSize: "0.8rem", color: "#999" },
//   };

//   return (
//     <Box
//       sx={{
//         p: { xs: 2, sm: 4 },
//         background: "#334155",
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Paper
//         sx={{
//           p: { xs: 3, sm: 5 },
//           maxWidth: 600,
//           width: "100%",
//           overflow: "visible",
//         }}
//       >
//         {/* Logo */}
//         <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
//           <Box
//             component="img"
//             src={logo}
//             alt="digidial"
//             sx={{ height: 180, width: 380 }}
//           />
//         </Box>

//         <form onSubmit={handleSubmit}>
//           {/* Company Details */}
//           <TextField
//             fullWidth
//             label="Company Name"
//             name="companyName"
//             size="small"
//             placeholder="Enter Company Name"
//             value={formData.companyName}
//             onChange={handleChange}
//             required
//             sx={{ mb: 2 }}
//             InputProps={{ sx: placeholderStyle }}
//           />

//           <TextField
//             fullWidth
//             label="Contact Person"
//             name="contactPerson"
//             placeholder="Director Name"
//             size="small"
//             value={formData.contactPerson}
//             onChange={handleChange}
//             required
//             sx={{ mb: 2 }}
//             InputProps={{ sx: placeholderStyle }}
//           />

//           <TextField
//             fullWidth
//             type="tel"
//             label="Mobile Number"
//             name="mobile"
//             placeholder="Enter Mobile Number"
//             size="small"
//             value={formData.mobile}
//             onChange={handleChange}
//             required
//             sx={{ mb: 2 }}
//             InputProps={{ sx: placeholderStyle }}
//           />

//           <TextField
//             fullWidth
//             type="email"
//             label="Email ID"
//             name="email"
//             size="small"
//             placeholder="name@example.com"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             sx={{ mb: 2 }}
//             InputProps={{ sx: placeholderStyle }}
//           />

//           <TextField
//             fullWidth
//             label="Company Website"
//             name="website"
//             size="small"
//             placeholder="https://example.com"
//             value={formData.website}
//             onChange={handleChange}
//             sx={{ mb: 2 }}
//             InputProps={{ sx: placeholderStyle }}
//           />

//           <TextField
//             fullWidth
//             label="Company Address"
//             name="address1"
//             placeholder="Street address"
//             size="small"
//             value={formData.address1}
//             onChange={handleChange}
//             multiline
//             rows={2}
//             required
//             sx={{ mb: 2 }}
//             InputProps={{ sx: placeholderStyle }}
//           />

//           <TextField
//             fullWidth
//             label="Address Line 2"
//             name="address2"
//             size="small"
//             placeholder="Apartment, suite, etc. (optional)"
//             value={formData.address2}
//             onChange={handleChange}
//             sx={{ mb: 2 }}
//             InputProps={{ sx: placeholderStyle }}
//           />

//           <Divider sx={{ my: 2 }} />

//           {/* Company Documents */}
//           <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
//             Company Documents
//           </Typography>

//           <TextField
//             fullWidth
//             label="Company GST No."
//             name="gstNo"
//             placeholder="Enter GST Number"
//             size="small"
//             value={formData.gstNo}
//             onChange={handleChange}
//             required
//             sx={{ mb: 2 }}
//             InputProps={{ sx: placeholderStyle }}
//           />

//           {/* GST Upload */}
//           <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
//             Upload GST Document
//             <input
//               type="file"
//               hidden
//               name="gstDoc"
//               accept="application/pdf"
//               onChange={handleFileChange}
//               required
//             />
//           </Button>
//           {formData.gstDoc && (
//             <Typography variant="caption" sx={{ mb: 2, display: "block" }}>
//               {formData.gstDoc.name}
//             </Typography>
//           )}

//           {/* Company PAN */}
//           <TextField
//             fullWidth
//             label="Company PAN Number"
//             name="companyPan"
//             placeholder="Enter PAN Number"
//             size="small"
//             value={formData.companyPan}
//             onChange={handleChange}
//             required
//             sx={{ mb: 2 }}
//             InputProps={{ sx: placeholderStyle }}
//           />

//           {/* Company PAN Upload */}
//           <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
//             Upload Company PAN
//             <input
//               type="file"
//               hidden
//               name="companyPanDoc"
//               accept="application/pdf"
//               onChange={handleFileChange}
//               required
//             />
//           </Button>
//           {formData.companyPanDoc && (
//             <Typography variant="caption" sx={{ mb: 2, display: "block" }}>
//               {formData.companyPanDoc.name}
//             </Typography>
//           )}

//           <Divider sx={{ my: 2 }} />

//           {/* Director Documents */}
//           <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
//             Director Documents
//           </Typography>

//           <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
//             Upload Director PAN
//             <input
//               type="file"
//               hidden
//               name="directorPan"
//               accept="application/pdf"
//               onChange={handleFileChange}
//               required
//             />
//           </Button>
//           {formData.directorPan && (
//             <Typography variant="caption" sx={{ mb: 2, display: "block" }}>
//               {formData.directorPan.name}
//             </Typography>
//           )}

//           <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
//             Upload Director Aadhaar
//             <input
//               type="file"
//               hidden
//               name="directorAadhaar"
//               accept="application/pdf"
//               onChange={handleFileChange}
//               required
//             />
//           </Button>
//           {formData.directorAadhaar && (
//             <Typography variant="caption" sx={{ mb: 2, display: "block" }}>
//               {formData.directorAadhaar.name}
//             </Typography>
//           )}

//           {/* Department Dropdown */}
//           <FormControl fullWidth size="small" sx={{ mb: 2 }}>
//             <InputLabel id="department-label">Department</InputLabel>
//             <Select
//               labelId="department-label"
//               id="department-select"
//               value={department}
//               label="Department"
//               onChange={(e) => setDepartment(e.target.value)}
//               required
//               MenuProps={{ disablePortal: true }}
//             >
//               <MenuItem value="HR">HR</MenuItem>
//               <MenuItem value="IT">IT</MenuItem>
//               <MenuItem value="Sales">Sales</MenuItem>
//               <MenuItem value="Marketing">Marketing</MenuItem>
//               <MenuItem value="Finance">Finance</MenuItem>
//               <MenuItem value="Operations">Operations</MenuItem>
//               <MenuItem value="Support">Support</MenuItem>
//             </Select>
//           </FormControl>

//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Submit KYC
//           </Button>
//         </form>
//       </Paper>

//       {/* ✅ Success Snackbar */}
//       <Snackbar
//         open={successOpen}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity="success"
//           sx={{ width: "100%" }}
//         >
//           ✅ KYC submitted successfully!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default KYCForm;



import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import logo from "../../assets/digidial_logo.jpg";

const BASE_URL = "https://digidial-admin.onrender.com";

const KYCForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    mobile: "",
    email: "",
    website: "",
    address1: "",
    address2: "",
    gstNo: "",
    companyPan: "",
    gstDoc: null,
    companyPanDoc: null,
    directorPan: null,
    directorAadhaar: null,
  });

  const [department, setDepartment] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Handle text input
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle file upload
  const handleFileChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Bearer token
      const data = new FormData();

      // Append all fields
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) data.append(key, formData[key]);
      });

      // Append department
      data.append("department", department);

      // POST request
      const response = await fetch(`${BASE_URL}/api/admin/kyc/submit`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        setSuccessOpen(true);
        setErrorMsg("");

        // Reset form
        setFormData({
          companyName: "",
          contactPerson: "",
          mobile: "",
          email: "",
          website: "",
          address1: "",
          address2: "",
          gstNo: "",
          companyPan: "",
          gstDoc: null,
          companyPanDoc: null,
          directorPan: null,
          directorAadhaar: null,
        });
        setDepartment("");
      } else {
        setErrorMsg(result.message || "Failed to submit KYC");
      }
    } catch (error) {
      console.error("Error submitting KYC:", error);
      setErrorMsg("Error submitting KYC. Check console for details.");
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessOpen(false);
    setErrorMsg("");
  };

  const placeholderStyle = {
    "&::placeholder": { fontSize: "0.8rem", color: "#999" },
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        background: "#334155",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ p: { xs: 3, sm: 5 }, maxWidth: 600, width: "100%" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Box component="img" src={logo} alt="digidial" sx={{ height: 180, width: 380 }} />
        </Box>

        <form onSubmit={handleSubmit}>
          {/* Company Details */}
          <TextField
            fullWidth
            label="Company Name"
            name="companyName"
            size="small"
            placeholder="Enter Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
            InputProps={{ sx: placeholderStyle }}
          />
          <TextField
            fullWidth
            label="Contact Person"
            name="contactPerson"
            size="small"
            placeholder="Director Name"
            value={formData.contactPerson}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
            InputProps={{ sx: placeholderStyle }}
          />
          <TextField
            fullWidth
            type="tel"
            label="Mobile Number"
            name="mobile"
            placeholder="Enter Mobile Number"
            size="small"
            value={formData.mobile}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
            InputProps={{ sx: placeholderStyle }}
          />
          <TextField
            fullWidth
            type="email"
            label="Email ID"
            name="email"
            size="small"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
            InputProps={{ sx: placeholderStyle }}
          />
          <TextField
            fullWidth
            label="Company Website"
            name="website"
            size="small"
            placeholder="https://example.com"
            value={formData.website}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputProps={{ sx: placeholderStyle }}
          />
          <TextField
            fullWidth
            label="Company Address"
            name="address1"
            placeholder="Street address"
            size="small"
            value={formData.address1}
            onChange={handleChange}
            multiline
            rows={2}
            required
            sx={{ mb: 2 }}
            InputProps={{ sx: placeholderStyle }}
          />
          <TextField
            fullWidth
            label="Address Line 2"
            name="address2"
            size="small"
            placeholder="Apartment, suite, etc. (optional)"
            value={formData.address2}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputProps={{ sx: placeholderStyle }}
          />

          <Divider sx={{ my: 2 }} />

          {/* Company Documents */}
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
            Company Documents
          </Typography>
          <TextField
            fullWidth
            label="Company GST No."
            name="gstNo"
            placeholder="Enter GST Number"
            size="small"
            value={formData.gstNo}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
            InputProps={{ sx: placeholderStyle }}
          />
          <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
            Upload GST Document
            <input
              type="file"
              hidden
              name="gstDoc"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </Button>
          {formData.gstDoc && <Typography variant="caption">{formData.gstDoc.name}</Typography>}

          <TextField
            fullWidth
            label="Company PAN Number"
            name="companyPan"
            placeholder="Enter PAN Number"
            size="small"
            value={formData.companyPan}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
            InputProps={{ sx: placeholderStyle }}
          />
          <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
            Upload Company PAN
            <input
              type="file"
              hidden
              name="companyPanDoc"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </Button>
          {formData.companyPanDoc && <Typography variant="caption">{formData.companyPanDoc.name}</Typography>}

          <Divider sx={{ my: 2 }} />

          {/* Director Documents */}
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
            Director Documents
          </Typography>
          <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
            Upload Director PAN
            <input type="file" hidden name="directorPan" accept="application/pdf" onChange={handleFileChange} required />
          </Button>
          {formData.directorPan && <Typography variant="caption">{formData.directorPan.name}</Typography>}
          <Button variant="outlined" component="label" fullWidth sx={{ mb: 2 }}>
            Upload Director Aadhaar
            <input type="file" hidden name="directorAadhaar" accept="application/pdf" onChange={handleFileChange} required />
          </Button>
          {formData.directorAadhaar && <Typography variant="caption">{formData.directorAadhaar.name}</Typography>}

          {/* Department */}
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="department-label">Department</InputLabel>
            <Select
              labelId="department-label"
              value={department}
              label="Department"
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Operations">Operations</MenuItem>
              <MenuItem value="Support">Support</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit KYC
          </Button>
        </form>
      </Paper>

      {/* Success & Error Snackbar */}
      <Snackbar
        open={successOpen || Boolean(errorMsg)}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {successOpen ? (
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
            ✅ KYC submitted successfully!
          </Alert>
        ) : (
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
            ❌ {errorMsg}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
};

export default KYCForm;

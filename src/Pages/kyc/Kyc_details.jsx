import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import logo from "../../assets/digidial_logo.jpg";
import axios from "axios";

const BASE_URL = "https://superfone-admin-xw3b.onrender.com";
const token = localStorage.getItem("authToken") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyIiwiZW1haWwiOiJhZG1pbkBhYmNkLmNvbSIsImdsb2JhbF9yb2xlIjoiYWRtaW4iLCJjb21wYW55X2lkIjoiMiIsImlhdCI6MTc2MTM2Nzg1OCwiZXhwIjoxNzYxNDU0MjU4fQ.r1exWc7_mZUlMQmrvxCmZqRjmDrprpAJJto0iVLQqsg";

const KYCForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    registrationNo: "",
    mobile: "",
    email: "",
    directorName: "",
    website: "",
    address: "",
    gstNo: "",
    companyPan: "",
    gstDoc: null,
    companyPanDoc: null,
    directorPan: null,
    directorAadhaar: null,
  });

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fromclose, setFromClosed] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("company_name", formData.companyName);
      data.append("registration_no", formData.registrationNo);
      data.append("director_name", formData.directorName);
      data.append("director_mobile", formData.mobile);
      data.append("director_email", formData.email);
      data.append("company_address", formData.address);
      data.append("gst_number", formData.gstNo);
      data.append("pan_number", formData.companyPan);
      data.append("company_website", formData.website);

      // append all documents as "documents" field (server expects array)
      const files = [
        formData.gstDoc,
        formData.companyPanDoc,
        formData.directorPan,
        formData.directorAadhaar,
      ];
      files.forEach((file) => {
        if (file) data.append("documents", file);
      });

      const response = await axios.post(`${BASE_URL}/api/admin/kyc/submit`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          // DO NOT set 'Content-Type', Axios handles FormData automatically
        },
      });

      if (response.data.success) {
        setSuccessOpen(true);
        setErrorMsg("");
        setFromClosed(true);
        setFormData({
          companyName: "",
          registrationNo: "",
          mobile: "",
          email: "",
          directorName: "",
          website: "",
          address: "",
          gstNo: "",
          companyPan: "",
          gstDoc: null,
          companyPanDoc: null,
          directorPan: null,
          directorAadhaar: null,
        });
      } else {
        setErrorMsg(response.data.message || "Failed to submit KYC");
      }
    } catch (error) {
      console.error("Error submitting KYC:", error);
      // error.response ||
      setErrorMsg(error.response?.data?.message || "Error submitting KYC. Check console.");
    }
  };
  

  const handleCloseSnackbar = () => {
    setSuccessOpen(false);
    setErrorMsg("");
  };

  return (
    <Box
      sx={{
        p: 4,
        background: "#334155",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ p: 5, maxWidth: 600, width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Box component="img" src={logo} alt="digidial" sx={{ height: 180, width: 380 }} />
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Registration Number"
            name="registrationNo"
            value={formData.registrationNo}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Director Name"
            name="directorName"
            value={formData.directorName}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Director Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Director Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Company Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Company Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            multiline
            rows={2}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="GST Number"
            name="gstNo"
            value={formData.gstNo}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Company PAN"
            name="companyPan"
            value={formData.companyPan}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
            Upload Documents (PDF)
          </Typography>

          {["directorPan", "directorAadhaar", "gstDoc", "companyPanDoc"].map((field, idx) => (
            <Box key={idx} sx={{ mb: 1 }}>
              <Button variant="outlined" component="label" fullWidth>
                Upload {field}
                <input
                  type="file"
                  hidden
                  name={field}
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
              </Button>
              {formData[field] && <Typography variant="caption">{formData[field].name}</Typography>}
            </Box>
          ))}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit KYC
          </Button>
        </form>
      </Paper>

      <Snackbar open={successOpen || Boolean(errorMsg)} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        {successOpen ? (
          <Alert onClose={handleCloseSnackbar} severity="success">
            ✅ KYC submitted successfully!
          </Alert>
        ) : (
          <Alert onClose={handleCloseSnackbar} severity="error">
            ❌ {errorMsg}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
};

export default KYCForm;


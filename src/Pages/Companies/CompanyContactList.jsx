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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

const CompanyContactList = () => {
  // ✅ State for contacts
  const [callHistory, setCallHistory] = useState([
    { name: "John Doe", number: "123-456-7890", email: "john@example.com", status: "Completed" },
    { name: "Jane Smith", number: "987-654-3210", email: "jane@example.com", status: "Missed" },
    { name: "Bob Lee", number: "555-555-5555", email: "bob@example.com", status: "Completed" },
  ]);

  // ✅ State for filtered list
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // ✅ Delete a contact
  const handleDelete = (index) => {
    const updated = callHistory.filter((_, i) => i !== index);
    setCallHistory(updated);
  };

  // ✅ Add new dummy contact
  const handleAddContact = () => {
    const newContact = {
      name: "New Contact",
      number: "000-000-0000",
      email: "new@example.com",
      status: "Lead",
    };
    setCallHistory([...callHistory, newContact]);
  };

  // ✅ Import dummy contacts
  const handleImportContacts = () => {
    const imported = [
      { name: "Alice", number: "111-222-3333", email: "alice@example.com", status: "Customer" },
      { name: "Mark", number: "444-555-6666", email: "mark@example.com", status: "Lead" },
    ];
    setCallHistory([...callHistory, ...imported]);
  };

  // ✅ Save contacts (you can connect API here)
  const handleSave = () => {
    alert("Contacts saved successfully!");
  };

  // ✅ Filter + Search logic
  const filteredContacts = callHistory.filter((c) => {
    const matchesFilter = filter === "All" || c.status === filter;
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.number.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Box sx={{ p: 1, minHeight: "100vh", background: "#1e293b", color: "#fff", width:"100%"}}>
      {/* Header */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 , pt:5}}>
        Company Contact List
      </Typography>

      {/* Search */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, mb: 2 }}>
        <TextField
          placeholder="Search Contacts..."
          size="small"
          variant="outlined"
          sx={{ flex: 1, maxWidth: 300, background: "#fff", borderRadius: 1 }}
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

      {/* Filter + Action Buttons */}
      <Grid container spacing={2} sx={{ mb: 2, alignItems: "center" }}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => setFilter("All")}>
            All
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" sx={{ background: "#fff", color: "#1e293b" }} onClick={() => setFilter("Customer")}>
            Customers
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" sx={{ background: "#fff", color: "#1e293b" }} onClick={() => setFilter("Lead")}>
            Leads
          </Button>
        </Grid>

        {/* Right Side Actions */}
        <Grid item xs />
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleAddContact}>
            + Add New Contact
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" sx={{ background: "#fff", color: "#1e293b" }} onClick={handleImportContacts}>
            Import Contacts
          </Button>
        </Grid>
      </Grid>

      {/* Divider */}
      <Box sx={{ borderBottom: "1px solid white", my: 2 }} />

      {/* Table */}
      <Paper sx={{ p: 2, borderRadius: 2, background: "#283645", color: "#fff", minHeight: "300px" }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Phone</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: "#fff" }}>{contact.name}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{contact.number}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{contact.email}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{contact.status}</TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleDelete(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} sx={{ color: "#fff", textAlign: "center" }}>
                    No contacts found
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
          Save Contact
        </Button>
      </Box>
    </Box>
  );
};

export default CompanyContactList;

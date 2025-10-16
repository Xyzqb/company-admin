import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Checkbox,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Analytics as AnalyticsIcon } from "@mui/icons-material";

function SystemSettings() {
  const [companyName, setCompanyName] = useState("Bitmax Solutions");
  const [timeZone, setTimeZone] = useState("(UTC+5:30) India Standard Time");
  const [businessHours, setBusinessHours] = useState(
    "Mon-Fri, 9:03 AM - 6:03 PM"
  );
  const [logo, setLogo] = useState(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  // Integrations
  const [integrations, setIntegrations] = useState({
    powerDialer: true,
    salesforce: true,
    hubspot: true,
    zendesk: false,
  });

  const handleIntegrationChange = (key) => {
    setIntegrations((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Calling Settings
  const [callerId, setCallerId] = useState("Custom Number");
  const [callerSwitch, setCallerSwitch] = useState(true);
  const [forwardRules, setForwardRules] = useState(true);
  const [voicemail, setVoicemail] = useState(true);
  const [callRecording, setCallRecording] = useState(false);

  // IVR Flow
  const [ivrOpen, setIvrOpen] = useState(false);
  const [ivrSteps, setIvrSteps] = useState([
    { key: "1", action: "Sales Dept" },
  ]);
  const [newKey, setNewKey] = useState("");
  const [newAction, setNewAction] = useState("");

  const addIvrStep = () => {
    if (newKey && newAction) {
      setIvrSteps([...ivrSteps, { key: newKey, action: newAction }]);
      setNewKey("");
      setNewAction("");
    }
  };
  const deleteIvrStep = (index) => {
    setIvrSteps(ivrSteps.filter((_, i) => i !== index));
  };

  // Roles & Permissions
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [inAppNotifications, setInAppNotifications] = useState(false);

  const [roles, setRoles] = useState([
    { name: "Super Admin", role: "Agent", permissions: "All" },
    { name: "Department Manager", role: "Agent", permissions: "Limited" },
  ]);

  // Edit Permissions Dialog
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editPermissions, setEditPermissions] = useState("");

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditPermissions(roles[index].permissions);
    setOpen(true);
  };

  const handleSavePermissions = () => {
    const updatedRoles = [...roles];
    updatedRoles[editIndex].permissions = editPermissions;
    setRoles(updatedRoles);
    setOpen(false);
  };

  // Save All
  const handleSaveAll = () => {
    const data = {
      companyName,
      logo,
      timeZone,
      businessHours,
      integrations,
      callerId,
      callerSwitch,
      forwardRules,
      voicemail,
      callRecording,
      ivrSteps,
      emailAlerts,
      inAppNotifications,
      roles,
    };
    console.log("Saved Settings:", data);
    alert("Settings saved! Check console for details.");
  };

  return (
    <Box p={4} sx={{ backgroundColor: "#334155", minHeight: "100vh", width:"100%" }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", pt: 2 }}>
        System Settings & Configuration
      </Typography>

      <Grid container spacing={2}>
        {/* Company Profile */}
        <Grid item xs={12} md={6}>
          <Card sx={{ width: "420px", height: "270px" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Company Profile
              </Typography>
              <TextField
                label="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                fullWidth
                size="small"
                margin="dense"
              />
              <Button
                variant="outlined"
                size="small"
                component="label"
                sx={{ mt: 1 }}
              >
                Upload Company Logo
                <input type="file" hidden onChange={handleLogoUpload} />
              </Button>
              {logo && (
                <Box mt={2}>
                  <Typography variant="caption">Preview:</Typography>
                  <Box mt={1}>
                    <img src={logo} alt="Company Logo" height="60" />
                  </Box>
                </Box>
              )}
              <TextField
                select
                fullWidth
                label="Time Zone"
                size="small"
                margin="dense"
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
              >
                <MenuItem value="(UTC+5:30) India Standard Time">
                  (UTC+5:30) India Standard Time
                </MenuItem>
                <MenuItem value="(UTC+0) GMT">UTC+0 GMT</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="Business Hours"
                value={businessHours}
                onChange={(e) => setBusinessHours(e.target.value)}
                size="small"
                margin="dense"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Integrations}*/}
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <Card sx={{ width: "420px", height: "270px" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Integrations
              </Typography>

              {/* Dropdown */}
              <TextField
                select
                fullWidth
                label="Time Zone"
                size="small"
                margin="dense"
                // value={timeZone}
              >
                <MenuItem value="(UTC+5:30) India Standard Time">
                  hello
                </MenuItem>
                <MenuItem value="demo">demo</MenuItem>
              </TextField>

              {/* 2-column grid for toggles */}
              <Grid container spacing={1} sx={{ mt: 1 }}>
                {Object.keys(integrations).map((key, index) => (
                  <Grid item xs={6} key={key}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={integrations[key]}
                          onChange={() => handleIntegrationChange(key)}
                        />
                      }
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Calling Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={{ width: "420px", height: "270px" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Calling Settings
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <TextField
                  select
                  label="Caller ID"
                  size="small"
                  value={callerId}
                  onChange={(e) => setCallerId(e.target.value)}
                >
                  <MenuItem value="Custom Number">Custom Number</MenuItem>
                  <MenuItem value="Default">Default</MenuItem>
                </TextField>
                <Switch
                  checked={callerSwitch}
                  onChange={() => setCallerSwitch(!callerSwitch)}
                />
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={forwardRules}
                    onChange={() => setForwardRules(!forwardRules)}
                  />
                }
                label="Call Forwarding Rules"
              />
              <Button
                variant="outlined"
                size="small"
                onClick={() => setIvrOpen(true)}
              >
                Manage IVR Flow
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Calling Settings 2 */}
        <Grid item xs={12} md={6}>
          <Card sx={{ width: "420px", height: "270px" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                More Calling Settings
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={voicemail}
                    onChange={() => setVoicemail(!voicemail)}
                  />
                }
                label="If busy/unanswered: Forward to Voicemail"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={callRecording}
                    onChange={() => setCallRecording(!callRecording)}
                  />
                }
                label="Enable Call Recording"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Roles & Permissions */}
        <Grid item xs={12} md={6}>
          <Card sx={{ width: "420px", height: "270px" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Roles & Permissions
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={emailAlerts}
                    onChange={() => setEmailAlerts(!emailAlerts)}
                  />
                }
                label="Email alerts for missed calls"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={inAppNotifications}
                    onChange={() => setInAppNotifications(!inAppNotifications)}
                  />
                }
                label="In-app notifications for agent activity"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} md={6}>
          <Card sx={{ width: "420px", height: "270px" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Notifications
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Role Name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Permissions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roles.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>
                        <Button size="small" onClick={() => handleEdit(index)}>
                          Edit Permissions
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Save Button */}
      <Box textAlign="center" mt={3}>
        <Button variant="contained" color="primary" onClick={handleSaveAll}>
          Save Changes
        </Button>
      </Box>

      {/* Edit Permissions Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Permissions</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Permissions"
            value={editPermissions}
            onChange={(e) => setEditPermissions(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSavePermissions}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* IVR Flow Dialog */}
      <Dialog open={ivrOpen} onClose={() => setIvrOpen(false)} fullWidth>
        <DialogTitle>Manage IVR Flow</DialogTitle>
        <DialogContent>
          {ivrSteps.map((step, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={1}
            >
              <Typography>
                Press <strong>{step.key}</strong> → {step.action}
              </Typography>
              <IconButton onClick={() => deleteIvrStep(index)} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
          <Box display="flex" gap={1} mt={2}>
            <TextField
              label="Key"
              size="small"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
            />
            <TextField
              label="Action"
              size="small"
              value={newAction}
              onChange={(e) => setNewAction(e.target.value)}
            />
            <Button variant="outlined" onClick={addIvrStep}>
              Add
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIvrOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SystemSettings;

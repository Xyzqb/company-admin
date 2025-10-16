import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography,
  Collapse,
  Box,
} from "@mui/material";
import {
  Business,
  BarChart,
  Settings,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import CallIcon from "@mui/icons-material/Call";
import GroupsIcon from "@mui/icons-material/Groups";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import WebhookIcon from "@mui/icons-material/Webhook";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();
  const [companyOpen, setCompanyOpen] = useState(false);
  //calls
  const [callsOpen, setCallsOpen] = useState(false);
  //leads
  const [leads, setLeads] = useState(false);
  const handleLeadClick = () => setLeads(!leads);
  //Phones
  const [phones, setPhones] = useState(false);
  const handlePhonesClick = () => setPhones(!phones);

  const handleCompanyClick = () => setCompanyOpen(!companyOpen);
  //calls
  const handleCallsClick = () => setCallsOpen(!callsOpen);
  //Teams
  const [teams, setTeams] = useState(false);
  const handleTeamsClick = () => setTeams(!teams);
  //Teams Member
  const [teamMembers, setTeamMembers] = useState(false);
  const handleTeamMembersClick = () => setTeamMembers(!teamMembers);
  //webhook logs
  const [webhookLogs, setWebhooklogs] = useState(false);
  const handleWebhookLogs = () => setWebhooklogs(!webhookLogs);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#334155",
          mt: 5,
          height: "auto",
        },
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h6" sx={{ color: "#fff" }}>
          Admin Panel
        </Typography>
      </Toolbar>
      {/* Add callDetails in Sidebar */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleCallsClick} sx={{ color: "#fff" }}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <CallIcon />
            </ListItemIcon>
            <ListItemText primary="Calls" />
            {callsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={callsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={Link}
              to="pages/list_calls"
              sx={{ pl: 4, color: "#fff" }}
              selected={location.pathname === "/pages/list_calls"}
            >
              <ListItemText primary="List All Calls" />
            </ListItemButton>

            {/* <ListItemButton
             component={Link}
             to="" */}
          </List>
        </Collapse>
      </List>

      {/* Leads_details */}

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLeadClick} sx={{ color: "#fff" }}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="Leads" />
            {leads ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={leads} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={Link}
              to="pages/leads_details"
              sx={{ pl: 4, color: "#fff" }}
              selected={location.pathname === "/pages/leads_details"}
            >
              <ListItemText primary="List All Leads" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      {/* Phones_Details  */}

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handlePhonesClick} sx={{ color: "#fff" }}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <ContactPhoneIcon />
            </ListItemIcon>
            <ListItemText primary="Phones" />
            {phones ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={phones} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={Link}
              to="pages/Phone_details"
              sx={{ pl: 4, color: "#fff" }}
              selected={location.pathname === "/pages/Phone_details"}
            >
              <ListItemText primary="List All Phones" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      {/* Teams_details */}

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleTeamsClick} sx={{ color: "#fff" }}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="Teams" />
            {teams ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={teams} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={Link}
              to="pages/Teams_details"
              sx={{ pl: 4, color: "#fff" }}
              selected={location.pathname === "/pages/Teams_details"}
            >
              <ListItemText primary="List All Teams" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      {/* Teams_Members */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleTeamMembersClick}
            sx={{ color: "#fff" }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="Team Members" />
            {teamMembers ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={teamMembers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={Link}
              to="pages/team_members"
              sx={{ pl: 4, color: "#fff" }}
              selected={location.pathname === "/pages/team_members"}
            >
              <ListItemText primary="List All Team Members" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      {/* webhooks_logs */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleWebhookLogs} sx={{ color: "#fff" }}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <WebhookIcon />
            </ListItemIcon>
            <ListItemText primary="Webhooks_logs" />
            {webhookLogs ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={webhookLogs} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={Link}
              to="pages/webhook_logs"
              sx={{ pl: 4, color: "#fff" }}
              selected={location.pathname === "/pages/webhook_logs"}
            >
              <ListItemText primary="List All Webhook Logs" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      {/* Company Menu */}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleCompanyClick} sx={{ color: "#fff" }}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <Business />
            </ListItemIcon>
            <ListItemText primary="Company" />
            {companyOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={companyOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={Link}
              to="companies/contact-list"
              sx={{ pl: 4, color: "#fff" }}
              selected={location.pathname === "/companies/contact-list"}
            >
              <ListItemText primary="Company Contact List" />
            </ListItemButton>

            <ListItemButton
              component={Link}
              to="/companies/add-edit-contact"
              sx={{ pl: 4, color: "#fff" }}
              selected={location.pathname === "/companies/add-edit-contact"}
            >
              <ListItemText primary="Add/Edit Contact" />
            </ListItemButton>

            <ListItemButton
              component={Link}
              to="/companies/call-log"
              sx={{ pl: 4, color: "#fff" }}
              selected={location.pathname === "/companies/call-log"}
            >
              <ListItemText primary="Company Call Log" />
            </ListItemButton>

            {/* Call Details */}
            <ListItemButton
              component={Link}
              to="companies/call-details"
              sx={{ pl: 4, color: "#fff" }}
              selected={location.pathname === "/companies/call-details"}
            >
              <ListItemText primary="Company Call Details" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* Analytics */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/reports/analytics"
            selected={location.pathname === "/reports/analytics"}
            sx={{ color: "#fff" }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItemButton>
        </ListItem>

        {/* Settings */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/settings/system"
            selected={location.pathname === "/settings/system"}
            sx={{ color: "#fff" }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>

      <Typography
        variant="caption"
        sx={{
          mr: 5,
          mt: 30,
          display: "block",
          textAlign: "center",
          color: "#888",
          height: { xs: 120, sm: 150, md: 180, lg: 500 },
        }}
      >
        Powered by{" "}
        <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
          Bitmax
        </Box>
      </Typography>
    </Drawer>
  );
};

export default Sidebar;

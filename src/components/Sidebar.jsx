// import React, { useState } from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   ListItemIcon,
//   Toolbar,
//   Typography,
//   Collapse,
//   Box,
// } from "@mui/material";
// import {
//   Business,
//   BarChart,
//   Settings,
//   ExpandLess,
//   ExpandMore,
// } from "@mui/icons-material";
// import CallIcon from "@mui/icons-material/Call";
// import GroupsIcon from "@mui/icons-material/Groups";
// import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
// import WebhookIcon from "@mui/icons-material/Webhook";
// import { Link, useLocation } from "react-router-dom";
// import DehazeIcon from "@mui/icons-material/Dehaze";

// const drawerWidth = 240;

// const Sidebar = () => {
//   const location = useLocation();
//   // const [companyOpen, setCompanyOpen] = useState(false);
//   // agents
//   const [agents, setAgents] = useState(false);
//   //calls
//   const [callsOpen, setCallsOpen] = useState(false);
//   //leads
//   const [leads, setLeads] = useState(false);
//   const handleLeadClick = () => setLeads(!leads);
//   //Phones
//   const [phones, setPhones] = useState(false);
//   const handlePhonesClick = () => setPhones(!phones);

//   // const handleCompanyClick = () => setCompanyOpen(!companyOpen);
//   //calls
//   const handleCallsClick = () => setCallsOpen(!callsOpen);
//   //Teams
//   const [teams, setTeams] = useState(false);
//   const handleTeamsClick = () => setTeams(!teams);
//   //Teams Member
//   const [teamMembers, setTeamMembers] = useState(false);
//   const handleTeamMembersClick = () => setTeamMembers(!teamMembers);
//   //webhook logs
//   const [webhookLogs, setWebhooklogs] = useState(false);
//   const handleWebhookLogs = () => setWebhooklogs(!webhookLogs);

//   // Plans
//   const [plans, setPlans] = useState(false);
//   const handlePlansClick = () => setPlans(!plans);
//   const [SidebarOpen, setSidebarOpen] = useState(true);

//   // 🎨 Color Constants
//   const menuBg = "#334155";
//   const submenuBg = "#475569";
//   const activeColor = "#798391ff";

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: SidebarOpen ? drawerWidth : 70,
//         transition: "width 0.3s ease",
//         [`& .MuiDrawer-paper`]: {
//           width: SidebarOpen ? drawerWidth : 70,
//           boxSizing: "border-box",
//           background: menuBg,
//           mt: 5,
//           height: "calc(100vh - 20px)",
//           overflowY: "auto",
//           transition: "all 0.3s ease-in-out",
//           scrollbarWidth: "thin",
//           "&::-webkit-scrollbar": { width: "8px" },
//           "&::-webkit-scrollbar-thumb": {
//             backgroundColor: "#64748b",
//             borderRadius: "10px",
//           },
//         },
//       }}
//     >
//       {/* Header */}
//       <Toolbar
//         sx={{
//           justifyContent: "flex-start",
//           ml: -1,
//           cursor: "pointer",
//           display: "flex",
//         }}
//         onClick={() => setSidebarOpen((prev) => !prev)}
//       >
//         <DehazeIcon sx={{ color: "#fff", fontSize: 26 }} />
//         {SidebarOpen && (
//           <Typography
//             variant="h6"
//             sx={{
//               color: "#fff",
//               fontWeight: "bold",
//               fontSize: "1.2rem",
//               p:6,
//             }}
//           >
//             Company Admin
//           </Typography>
//         )}
//       </Toolbar>
//       {/* Add callDetails in Sidebar */}
//       <List>
//         <ListItem disablePadding>
//           <ListItemButton onClick={handleCallsClick} sx={{ color: "#fff" }}>
//             <ListItemIcon sx={{ color: "#fff" }}>
//               <CallIcon />
//             </ListItemIcon>
//             <ListItemText primary="Calls" />
//             {callsOpen ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </ListItem>
//         <Collapse in={callsOpen} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItemButton
//               component={Link}
//               to="pages/list_calls"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/pages/list_calls"}
//             >
//               <ListItemText primary="List All Calls" />
//             </ListItemButton>
//           </List>
//         </Collapse>

//         {/* <Collapse in={callsOpen} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItemButton
//               component={Link}
//               to="pages/call-history"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/pages/call-history"}
//             >
//               <ListItemText primary="Call History" />
//             </ListItemButton>
//           </List>
//         </Collapse> */}
//       </List>

//       {/* Leads_details */}

//       <List>
//         <ListItem disablePadding>
//           <ListItemButton onClick={handleLeadClick} sx={{ color: "#fff" }}>
//             <ListItemIcon sx={{ color: "#fff" }}>
//               <GroupsIcon />
//             </ListItemIcon>
//             <ListItemText primary="Leads" />
//             {leads ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </ListItem>
//         <Collapse in={leads} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItemButton
//               component={Link}
//               to="pages/leads_details"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/pages/leads_details"}
//             >
//               <ListItemText primary="List All Leads" />
//             </ListItemButton>
//           </List>
//         </Collapse>
//       </List>

//       {/* Phones_Details  */}
//       <List>
//         <ListItem disablePadding>
//           <ListItemButton onClick={handlePhonesClick} sx={{ color: "#fff" }}>
//             <ListItemIcon sx={{ color: "#fff" }}>
//               <ContactPhoneIcon />
//             </ListItemIcon>
//             <ListItemText primary="Phones" />
//             {phones ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </ListItem>
//         <Collapse in={phones} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItemButton
//               component={Link}
//               to="pages/Phone_details"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/pages/Phone_details"}
//             >
//               <ListItemText primary="List All Phones" />
//             </ListItemButton>
//           </List>
//         </Collapse>
//       </List>

//       {/* Teams_details */}

//       <List>
//         <ListItem disablePadding>
//           <ListItemButton onClick={handleTeamsClick} sx={{ color: "#fff" }}>
//             <ListItemIcon sx={{ color: "#fff" }}>
//               <GroupsIcon />
//             </ListItemIcon>
//             <ListItemText primary="Teams" />
//             {teams ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </ListItem>
//         <Collapse in={teams} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItemButton
//               component={Link}
//               to="pages/Teams_details"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/pages/Teams_details"}
//             >
//               <ListItemText primary="List All Teams" />
//             </ListItemButton>
//           </List>
//         </Collapse>
//       </List>

//       {/* Teams_Members */}
//       <List>
//         <ListItem disablePadding>
//           <ListItemButton
//             onClick={handleTeamMembersClick}
//             sx={{ color: "#fff" }}
//           >
//             <ListItemIcon sx={{ color: "#fff" }}>
//               <GroupsIcon />
//             </ListItemIcon>
//             <ListItemText primary="Team Members" />
//             {teamMembers ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </ListItem>
//         <Collapse in={teamMembers} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItemButton
//               component={Link}
//               to="pages/team_members"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/pages/team_members"}
//             >
//               <ListItemText primary="List All Team Members" />
//             </ListItemButton>
//           </List>
//         </Collapse>
//       </List>

//       {/* webhooks_logs */}
//       <List>
//         <ListItem disablePadding>
//           <ListItemButton onClick={handleWebhookLogs} sx={{ color: "#fff" }}>
//             <ListItemIcon sx={{ color: "#fff" }}>
//               <WebhookIcon />
//             </ListItemIcon>
//             <ListItemText primary="Webhooks_logs" />
//             {webhookLogs ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </ListItem>
//         <Collapse in={webhookLogs} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItemButton
//               component={Link}
//               to="pages/webhook_logs"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/pages/webhook_logs"}
//             >
//               <ListItemText primary="List All Webhook Logs" />
//             </ListItemButton>
//           </List>
//         </Collapse>
//       </List>

//       {/* Plans */}
//       <List>
//         <ListItem disablePadding>
//           <ListItemButton onClick={handlePlansClick} sx={{ color: "#fff" }}>
//             <ListItemIcon sx={{ color: "#fff" }}></ListItemIcon>
//             <ListItemText primary="purchase-plans" />
//             {plans ? <ExpandLess /> : <ExpandLess />}
//           </ListItemButton>
//         </ListItem>
//         <Collapse in={plans} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItemButton component={Link} to="plans/"></ListItemButton>
//           </List>
//         </Collapse>
//       </List>

//       <Typography
//         variant="caption"
//         sx={{
//           mr: 5,
//           mt: 30,
//           display: "block",
//           textAlign: "center",
//           color: "#888",
//           height: { xs: 120, sm: 150, md: 180, lg: 500 },
//         }}
//       >
//         Powered by{" "}
//         <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
//           Bitmax
//         </Box>
//       </Typography>
//     </Drawer>
//   );
// };

// export default Sidebar;

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
import DehazeIcon from "@mui/icons-material/Dehaze";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();

  // State for expanding menus
  const [agents, setAgents] = useState(false);
  const [callsOpen, setCallsOpen] = useState(false);
  const [leads, setLeads] = useState(false);
  const [phones, setPhones] = useState(false);
  const [teams, setTeams] = useState(false);
  const [teamMembers, setTeamMembers] = useState(false);
  const [webhookLogs, setWebhookLogs] = useState(false);
  const [plans, setPlans] = useState(false);
  const [SidebarOpen, setSidebarOpen] = useState(true);

  // 🎨 Colors
  const menuBg = "#334155";
  const submenuBg = "#475569";

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SidebarOpen ? drawerWidth : 70,
        transition: "width 0.3s ease",
        [`& .MuiDrawer-paper`]: {
          width: SidebarOpen ? drawerWidth : 70,
          boxSizing: "border-box",
          background: menuBg,
          mt: 5,
          height: "calc(100vh - 20px)",
          overflowY: "auto",
          transition: "all 0.3s ease-in-out",
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#64748b",
            borderRadius: "10px",
          },
        },
      }}
    >
      {/* Header */}
      <Toolbar
        sx={{
          justifyContent: "flex-start",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          pl: 2,
         
        }}
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <DehazeIcon sx={{ color: "#fff", fontSize: 26, mr: 1 }} />
        {SidebarOpen && (
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.1rem",
              // mr:8,
              whiteSpace: "nowrap",
            }}
          >
            Company Admin
          </Typography>
        )}
      </Toolbar>

      {/* CALLS MENU */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => setCallsOpen(!callsOpen)}
            sx={{ color: "#fff" }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText
              primary="Agents"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            />
            {callsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={callsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ background: submenuBg }}>
            <ListItemButton
              component={Link}
              to="pages/agents"
              sx={{ pl: 6, color: "#fff" }}
              selected={location.pathname === "/pages/agents"}
            >
              <ListItemText
                primary="Agent Details"
                primaryTypographyProps={{
                  fontSize: "0.85rem",
                  fontWeight: "normal",
                  ml: -4,
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      {/* CALLS MENU */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => setCallsOpen(!callsOpen)}
            sx={{ color: "#fff" }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <CallIcon />
            </ListItemIcon>
            <ListItemText
              primary="Calls"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            />
            {callsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={callsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ background: submenuBg }}>
            <ListItemButton
              component={Link}
              to="pages/list_calls"
              sx={{ pl: 6, color: "#fff" }}
              selected={location.pathname === "/pages/list_calls"}
            >
              <ListItemText
                primary="List All Calls"
                primaryTypographyProps={{
                  fontSize: "0.85rem",
                  fontWeight: "normal",
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      {/* LEADS */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => setLeads(!leads)}
            sx={{ color: "#fff" }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText
              primary="Leads"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            />
            {leads ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={leads} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ background: submenuBg }}>
            <ListItemButton
              component={Link}
              to="pages/leads_details"
              sx={{ pl: 6, color: "#fff" }}
              selected={location.pathname === "/pages/leads_details"}
            >
              <ListItemText
                primary="List All Leads"
                primaryTypographyProps={{
                  fontSize: "0.85rem",
                  fontWeight: "normal",
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      {/* PHONES */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => setPhones(!phones)}
            sx={{ color: "#fff" }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <ContactPhoneIcon />
            </ListItemIcon>
            <ListItemText
              primary="Phones"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            />
            {phones ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={phones} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ background: submenuBg }}>
            <ListItemButton
              component={Link}
              to="pages/Phone_details"
              sx={{ pl: 6, color: "#fff" }}
              selected={location.pathname === "/pages/Phone_details"}
            >
              <ListItemText
                primary="List All Phones"
                primaryTypographyProps={{
                  fontSize: "0.85rem",
                  fontWeight: "normal",
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      {/* TEAMS */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => setTeams(!teams)}
            sx={{ color: "#fff" }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText
              primary="Teams"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            />
            {teams ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={teams} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ background: submenuBg }}>
            <ListItemButton
              component={Link}
              to="pages/Teams_details"
              sx={{ pl: 6, color: "#fff" }}
              selected={location.pathname === "/pages/Teams_details"}
            >
              <ListItemText
                primary="List All Teams"
                primaryTypographyProps={{
                  fontSize: "0.85rem",
                  fontWeight: "normal",
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      {/* TEAM MEMBERS */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => setTeamMembers(!teamMembers)}
            sx={{ color: "#fff" }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText
              primary="Team Members"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            />
            {teamMembers ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={teamMembers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ background: submenuBg }}>
            <ListItemButton
              component={Link}
              to="pages/team_members"
              sx={{ pl: 6, color: "#fff" }}
              selected={location.pathname === "/pages/team_members"}
            >
              <ListItemText
                primary="List All Team Members"
                primaryTypographyProps={{
                  fontSize: "0.85rem",
                  fontWeight: "normal",
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      {/* WEBHOOK LOGS */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => setWebhookLogs(!webhookLogs)}
            sx={{ color: "#fff" }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <WebhookIcon />
            </ListItemIcon>
            <ListItemText
              primary="Webhook Logs"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            />
            {webhookLogs ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={webhookLogs} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ background: submenuBg }}>
            <ListItemButton
              component={Link}
              to="pages/webhook_logs"
              sx={{ pl: 6, color: "#fff" }}
              selected={location.pathname === "/pages/webhook_logs"}
            >
              <ListItemText
                primary="List All Webhook Logs"
                primaryTypographyProps={{
                  fontSize: "0.85rem",
                  fontWeight: "normal",
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      {/* PURCHASE PLAN */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => setPlans(!plans)}
            sx={{ color: "#fff" }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <BarChart />
            </ListItemIcon>
            <ListItemText
              primary="Purchase Plan"
              primaryTypographyProps={{
                fontWeight: "bold",
                fontSize: "0.95rem",
              }}
            />
            {plans ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={plans} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ background: submenuBg }}>
            <ListItemButton
              component={Link}
              to="Plans/purchase-plan"
              sx={{ pl: 6, color: "#fff" }}
              selected={location.pathname === "Plans/purchase-plan"}
            >
              <ListItemText
                primary="View Plans"
                primaryTypographyProps={{
                  fontSize: "0.85rem",
                  fontWeight: "normal",
                }}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      {/* Footer */}
      <Typography
        variant="caption"
        sx={{
          mt: 10,
          display: "block",
          textAlign: "center",
          color: "#888",
        }}
      >
        Powered by{" "}
        <Box component="span" sx={{ color: "lightblue", fontWeight: "bold" }}>
          Bitmax
        </Box>
      </Typography>
    </Drawer>
  );
};

export default Sidebar;

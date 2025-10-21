import React from "react";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
  Outlet 
} from "react-router-dom";

// Pages
import Login from "../Pages/Login";
import CompanyContactList from "../Pages/Companies/CompanyContactList";
import AddEditContact from "../Pages/Companies/AddEditContact";
import CompanyCallLog from "../Pages/Companies/CompanyCallLog";
import CallDetails from "../Pages/Companies/CallDetails";
import Analytics from "../Pages/Reports/Analytics";
import SystemSettings from "../Pages/Settings/SystemSettings";
import Call_Details from "../Pages/calls/Calls_details";
import Leads_details from "../Pages/leads/Lead_Details"; 
import Phones_details from "../Pages/phones/Phone_details";
import Teams_details from "../Pages/teams/Teams_details";
import Team_Members from "../Pages/teams_members/Team_members";
import Webhook_Logs from "../Pages/webhooks/Webhook_logs"
// Components
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PrivateRoute from "../components/PrivateRoute";

// Layout wrapper for authenticated routes
function AppLayout() {
  return (
    <div style={{ display: "flex", minHeight: "140vh", width:"1250px", flexDirection: "column", background: "#1e293b" }}>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <div style={{ flex: 1, padding: 16 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/*" element={<AppLayout />}>

            {/* Company Management */}
            <Route path="companies/contact-list" element={<CompanyContactList/>}/>
            <Route path="companies/add-edit-contact" element={<AddEditContact />} />
            <Route path="companies/call-log" element={<CompanyCallLog />} />
            <Route path="companies/call-details" element={<CallDetails />} />

            {/* call_details */}
            <Route path="pages/list_calls" element={<Call_Details/>}/>
            <Route path="pages/list_callsByFilter" element={<call_filter/>}/>

            {/* lead_details */}
            <Route path="pages/leads_details" element={<Leads_details/>}/>

            {/* Phones_Details */}
            <Route path="pages/phone_details" element ={<Phones_details/>}/>

            {/* Teams_details */}
            <Route path="pages/teams_details" element ={<Teams_details/>}/>

            {/* Teams_members */}

            <Route path="pages/team_members" element ={<Team_Members/>}/>

            {/* webhook_logs */}
            <Route path="pages/webhook_logs" element ={<Webhook_Logs/>}/>

            {/* Reports */}
            <Route path="reports/analytics" element={<Analytics />} />

            {/* Settings */}
            <Route path="settings/system" element={<SystemSettings />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>

        {/* Fallback for non-authenticated */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;


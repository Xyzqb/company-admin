import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  CalendarToday as CalendarIcon,
  Download as DownloadIcon,
  Phone as PhoneIcon,
  AccessTime as ClockIcon,
  TrendingUp as TrendingUpIcon,
  Group as UsersIcon,
} from "@mui/icons-material";

// Placeholder components for charts
import { CallVolumeChart } from "../CallVolumeChart";
import { AgentPerformanceChart } from "../AgentPerformanceChart";
import { DonutChart } from "../DonutChart";

// Metric Card
const MetricCard = ({ title, value, trend, trendValue, icon }) => (
  <Paper
    sx={{
      p: 2,
      display: "flex",
      flexDirection: "column",
      gap: 1,
      alignItems: "flex-start",
      bgcolor: "#1e293b",
      color: "#fff",
      borderRadius: 2,
    }}
  >
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>{icon}</Box>
    <Typography variant="subtitle2">{title}</Typography>
    <Typography variant="h6">{value}</Typography>
    {trend && <Typography variant="body2">{trendValue}</Typography>}
  </Paper>
);

// Chart Card
const ChartCard = ({ title, children, headerAction }) => (
  <Paper sx={{ p: 2, borderRadius: 2, bgcolor: "#1e293b", color: "#fff" }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      {headerAction && headerAction}
    </Box>
    {children}
  </Paper>
);

function PerformanceDashboard() {
  const [timeframe, setTimeframe] = useState("daily");

  const callDurationData = [
    { name: "Outstanding", value: 45, color: "#3b82f6" },
    { name: "Answering", value: 30, color: "#f97316" },
    { name: "Other", value: 25, color: "#10b981" },
  ];

  const missedCallData = [
    { name: "Answered", value: 75, color: "#22c55e" },
    { name: "Missed", value: 25, color: "#ef4444" },
  ];

  const departmentData = [
    { name: "Support", value: 40, color: "#3b82f6" },
    { name: "Sales", value: 35, color: "#f97316" },
    { name: "Reception", value: 25, color: "#10b981" },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#0f172a", minHeight: "100vh" }}>
      {/* Header */}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Grid item>
          <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold" }}>
            Overall Performance Reports
          </Typography>
        </Grid>
        <Grid item container spacing={2} xs={12} sm="auto">
          <Grid item>
            <TextField
              placeholder="Custom Date Range"
              size="small"
              InputProps={{
                startAdornment: <CalendarIcon sx={{ mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{ color: "#fff", borderColor: "#fff" }}
            >
              Export Data
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ bgcolor: "#3b82f6", color: "#fff" }}
            >
              Export Item
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Main Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} xl={8}>
          <ChartCard
            title="Call Volume Over Time"
            headerAction={
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: "#fff" }}>Timeframe</InputLabel>
                <Select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  label="Timeframe"
                  sx={{ color: "#fff" }}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            }
          >
            <CallVolumeChart timeframe={timeframe} />
          </ChartCard>
        </Grid>
        <Grid item xs={12} xl={4}>
          <ChartCard title="Average Call Duration">
            <DonutChart data={callDurationData} />
          </ChartCard>
        </Grid>
      </Grid>

      {/* Metrics Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Average Call Duration"
            value="3:46 min"
            trend="up"
            trendValue="2.5%"
            icon={<ClockIcon sx={{ fontSize: 40 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Missed Call Rate"
            value="4.2%"
            trend="down"
            trendValue="1.2%"
            icon={<PhoneIcon sx={{ fontSize: 40 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Total Calls"
            value="1.2K"
            trend="up"
            trendValue="5.8%"
            icon={<TrendingUpIcon sx={{ fontSize: 40 }} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Active Agents"
            value="24"
            trend="neutral"
            icon={<UsersIcon sx={{ fontSize: 40 }} />}
          />
        </Grid>
      </Grid>

      {/* Bottom Charts Row */}
      <Grid container spacing={3}>
        <Grid item xs={12} xl={8}>
          <ChartCard title="Agent Performance Leaderboard">
            <AgentPerformanceChart />
          </ChartCard>
        </Grid>
        <Grid item xs={12} xl={4} container direction="column" spacing={3}>
          <Grid item>
            <ChartCard title="Missed Call Duration">
              <DonutChart data={missedCallData} />
            </ChartCard>
          </Grid>
          <Grid item>
            <ChartCard title="Department-wise Performance">
              <DonutChart data={departmentData} />
            </ChartCard>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PerformanceReports;

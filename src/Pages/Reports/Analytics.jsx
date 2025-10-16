import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Analytics as AnalyticsIcon } from "@mui/icons-material";

// Dummy Data
const lineData = [
  { name: "282/3/9", Day: 100, Week: 200, Month: 250 },
  { name: "283/3/6", Day: 150, Week: 220, Month: 280 },
  { name: "310erts", Day: 200, Week: 240, Month: 300 },
  { name: "Notaps", Day: 250, Week: 260, Month: 330 },
  { name: "200/100", Day: 300, Week: 270, Month: 360 },
  { name: "302.01", Day: 400, Week: 290, Month: 400 },
];

const pieData1 = [
  { name: "Autotyping", value: 60 },
  { name: "Depressing", value: 40 },
];

const pieData2 = [
  { name: "Support", value: 30 },
  { name: "Sales", value: 50 },
  { name: "Account", value: 20 },
];

const barData = [
  { name: "202-314", calls: 15 },
  { name: "222-199", calls: 30 },
  { name: "51445", calls: 18 },
  { name: "202-119", calls: 22 },
  { name: "DOUS", calls: 28 },
  { name: "202/100", calls: 35 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Analytics = () => {
  return (
    <Box p={3}
    sx={{
      backgroundColor: "#1e293b",
      width:"100%",
       minHeight: "100vh",
    }}
    >
      <Grid container justifyContent="space-between" alignItems="center" mb={3} pt={3}>
        <Typography variant="h5" fontWeight="bold">
          Overall Performance Reports
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={2}>
          <TextField
            select
            size="small"
            defaultValue="custom"
            sx={{minWidth:{xs:"100%", sm:180 , color:"#fff"}}}
            // sx={{ minWidth: 180,}}
          >
            <MenuItem value="custom">Custom Date Range</MenuItem>
            <MenuItem value="last7">Last 7 Days</MenuItem>
            <MenuItem value="last30">Last 30 Days</MenuItem>
          </TextField>

          <Button variant="outlined" startIcon={<FileDownloadIcon />}
          sx={{width:{xs:"100%", sm:"auto"}}}
          >

            Export Data (CSV, PDF)
          </Button>
        </Box>
      </Grid>

      {/* Charts & Cards */}
      <Grid container spacing={2}>
        {/* Line Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Call Volume Over Time (Daily/Monthly)
              </Typography>
              {/* minWidth={550} */}
              <ResponsiveContainer width="100%" height={240} minWidth={550} >
                <LineChart data={lineData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Day" stroke="#8884d8" />
                  <Line type="monotone" dataKey="Week" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="Month" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Overage Call Duration
              </Typography>
              <ResponsiveContainer width="100%" height={240} minWidth={300}>
                <PieChart>
                  <Pie
                    data={pieData1}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    fill="#8884d8"
                  >
                    {pieData1.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Small Stat Cards */}
        <Grid item xs={12} sm={6} md={4}>
          {/* <Card sx={{height:"100%"}}> */}
          <Card sx={{ width: "300px", height: "85px", justifyItems: "center"}} >
            <CardContent>
              <Typography variant="body2" ml={2}>
                Average Call Duration
              </Typography>
              <Typography variant="h6" ml={5}>
                3:46 min
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ width: "300px", height: "85px", justifyItems: "center" }}>
            <CardContent>
              <Typography variant="body2" ml={2}>
                Missed Call Rate
              </Typography>
              <Typography variant="h6" ml={5}>
                4.2%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card 
          sx={{ width: "300px", height: "85px", justifyItems: "center" }}>
            <CardContent>
              <Typography variant="body2">
                Total Calls
              </Typography>
              <Typography variant="h6">
                1.2K
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Agent Performance Leaderboard
              </Typography>
              <ResponsiveContainer width="100%" height={250} minWidth={550} >
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calls" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Missed Call Pie */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Missed Call Duration
              </Typography>
              <ResponsiveContainer width="100%" height={250} minWidth={300}>
                <PieChart>
                  <Pie
                    data={pieData2}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                  >
                    {pieData2.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;


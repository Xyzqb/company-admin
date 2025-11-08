import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const plans = [
  {
    id: 1,
    name: "Basic Plan",
    price: 20000,
    call_limit: 500,
    sms_limit: 100,
    unlimited_calls: false,
    unlimited_sms: false,
    description: "A starter plan with limited calls and SMS, thank you",
  },
  {
    id: 5,
    name: "Unlimited Talk Plan",
    price: 30000,
    call_limit: "-",
    sms_limit: 200,
    unlimited_calls: true,
    unlimited_sms: false,
    description: "Unlimited calling with 200 SMS per month.",
  },
  {
    id: 8,
    name: "Premium Unlimited Plan",
    price: 50000,
    call_limit: "-",
    sms_limit: "-",
    unlimited_calls: true,
    unlimited_sms: true,
    description: "Unlimited calls and SMS with premium support.",
  },
];

const PlansList = () => {
  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={1}
        color="#1e293b"
        sx={{ p: 2, color: "white" }}
      >
        Available Company Plans
      </Typography>

      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={1} sm={1} md={3} key={plan.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0px 10px 20px",
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary"
                  textAlign="center"
                >
                  {plan.name}
                </Typography>

                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={1}
                >
                  <CurrencyRupeeIcon fontSize="small" />
                  <Typography variant="h5" fontWeight="bold" color="#1e293b">
                    {plan.price.toLocaleString()}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  textAlign="center"
                  color="text.secondary"
                >
                  per month
                </Typography>
                  {/* 📞 ✉️ */}
                <Divider sx={{ my: 2, mb:6}} />
                <Box sx={{ mb: 1, pb:1, textAlign: "center" }}>
                  <Typography variant="h6" color="text.secondary">
                     Call Limit:{" "}
                    <b>
                      {plan.call_limit === "-" ? "Unlimited" : plan.call_limit}
                    </b>
                  </Typography>

                  <Typography variant="h6" color="text.secondary">
                     SMS Limit:{" "}
                    <b>
                      {plan.sms_limit === "-" ? "Unlimited" : plan.sms_limit}
                    </b>
                  </Typography>

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mt={1}
                    gap={0.5}
                  >
                    {plan.unlimited_calls ? (
                      <CheckCircleIcon color="success" fontSize="small" />
                    ) : (
                      <CancelIcon color="error" fontSize="small" />
                    )}
                    <Typography variant="body2">Unlimited Calls</Typography>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mt={1}
                    gap={0.5}
                  >
                    {plan.unlimited_sms ? (
                      <CheckCircleIcon color="success" fontSize="small" />
                    ) : (
                      <CancelIcon color="error" fontSize="small" />
                    )}
                    <Typography variant="body2">Unlimited SMS</Typography>
                  </Box>
                </Box>

                <Chip
                  label={plan.description}
                  variant="outlined"
                  color="primary"
                  sx={{
                    fontSize: "0.8rem",
                    mb: 2,
                    display: "block",
                    textAlign: "center",
                    whiteSpace: "normal",
                  }}
                />

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    mt: 1,
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                  onClick={() => alert(`Selected ${plan.name}`)}
                >
                  Select Plan
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PlansList;



// import React from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import FolderIcon from "@mui/icons-material/Folder";
// import WorkIcon from "@mui/icons-material/Work";
// import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

// const plans = [
//   {
//     title: "Basic Package",
//     price: "$550 / month",
//     icon: <FolderIcon sx={{ fontSize: 40, color: "white" }} />,
//     color: "#6A4DF4",
//     features: [
//       { text: "Website Design", included: true },
//       { text: "Web Development", included: true },
//       { text: "Business Consulting", included: false },
//       { text: "24/7 Support", included: false },
//     ],
//   },
//   {
//     title: "Professional Package",
//     price: "$650 / month",
//     icon: <WorkIcon sx={{ fontSize: 40, color: "white" }} />,
//     color: "#6A4DF4",
//     features: [
//       { text: "Website Design", included: true },
//       { text: "Web Development", included: true },
//       { text: "Business Consulting", included: true },
//       { text: "24/7 Support", included: false },
//     ],
//   },
//   {
//     title: "Business Package",
//     price: "$750 / month",
//     icon: <DirectionsCarIcon sx={{ fontSize: 40, color: "white" }} />,
//     color: "#6A4DF4",
//     features: [
//       { text: "Website Design", included: true },
//       { text: "Web Development", included: true },
//       { text: "Business Consulting", included: true },
//       { text: "24/7 Support", included: true },
//     ],
//   },
// ];

// function PricingPlans() {
//   return (
//     <Box sx={{py: 8 }}>
//       <Container maxWidth="lg">
//         <Typography
//           variant="h4"
//           align="center"
//           fontWeight="bold"
//           gutterBottom
//           sx={{ mb: 6 }}
//         >
//           Pricing Plans
//         </Typography>
//         <Grid container spacing={4} justifyContent="center">
//           {plans.map((plan, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card
//                 sx={{
//                   borderRadius: 3,
//                   overflow: "hidden",
//                   boxShadow: 5,
//                   transition: "transform 0.3s",
//                   "&:hover": { transform: "scale(1.05)" },
//                 }}
//               >
//                 <Box
//                   sx={{
//                     bgcolor: plan.color,
//                     textAlign: "center",
//                     color: "white",
//                     py: 4,
//                   }}
//                 >
//                   {plan.icon}
//                   <Typography variant="h6" mt={1}>
//                     {plan.title}
//                   </Typography>
//                   <Typography variant="h5" fontWeight="bold" mt={1}>
//                     {plan.price}
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     sx={{
//                       mt: 2,
//                       bgcolor: "#FFD233",
//                       color: "#000",
//                       fontWeight: "bold",
//                       "&:hover": { bgcolor: "#ffcc00" },
//                     }}
//                   >
//                     Select Package
//                   </Button>
//                 </Box>
//                 <CardContent sx={{ bgcolor: "white" }}>
//                   <List dense>
//                     {plan.features.map((feature, i) => (
//                       <ListItem key={i}>
//                         <ListItemIcon>
//                           {feature.included ? (
//                             <CheckCircleIcon sx={{ color: "green" }} />
//                           ) : (
//                             <CancelIcon sx={{ color: "red" }} />
//                           )}
//                         </ListItemIcon>
//                         <ListItemText primary={feature.text} />
//                       </ListItem>
//                     ))}
//                   </List>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// }

// export default PricingPlans;
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
        mb={3}
        color="#1e293b"
        sx={{ p: 2, color: "white" }}
      >
        Available Company Plans
      </Typography>

      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0px 6px 16px rgba(0,0,0,0.1)",
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

                <Divider sx={{ my: 2 }} />

                {/* <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{alignContent:"center"}}>
                    📞 Call Limit:{" "}
                    <b>
                      {plan.call_limit === "-" ? "Unlimited" : plan.call_limit}
                    </b>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ✉️ SMS Limit:{" "}
                    <b>
                      {plan.sms_limit === "-" ? "Unlimited" : plan.sms_limit}
                    </b>
                  </Typography>

                  <Box display="flex" alignItems="center" mt={1}>
                    {plan.unlimited_calls ? (
                      <CheckCircleIcon color="success" fontSize="small" />
                    ) : (
                      <CancelIcon color="error" fontSize="small" />
                    )}
                    <Typography variant="body2" ml={1}>
                      Unlimited Calls
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mt={1}>
                    {plan.unlimited_sms ? (
                      <CheckCircleIcon color="success" fontSize="small" />
                    ) : (
                      <CancelIcon color="error" fontSize="small" />
                    )}
                    <Typography variant="body2" ml={1}>
                      Unlimited SMS
                    </Typography>
                  </Box>
                </Box> */}
                
                <Box sx={{ mb: 2, textAlign: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    📞 Call Limit:{" "}
                    <b>
                      {plan.call_limit === "-" ? "Unlimited" : plan.call_limit}
                    </b>
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    ✉️ SMS Limit:{" "}
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

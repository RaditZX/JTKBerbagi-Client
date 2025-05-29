import { useState } from "react";
import {
  Typography,
  Container,
  Box,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";
import { styled } from "@mui/system";

const CustomStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  width: 32,
  height: 32,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `2px solid ${
    ownerState.completed || ownerState.active
      ? theme.palette.primary.main
      : theme.palette.grey[400]
  }`,
  backgroundColor:
    ownerState.completed || ownerState.active
      ? theme.palette.primary.main
      : theme.palette.common.white,
  color:
    ownerState.completed || ownerState.active
      ? theme.palette.common.white
      : theme.palette.text.secondary,
  fontWeight: "bold",
  fontSize: "16px",
}));

function CustomStepIcon(props) {
  const { active, completed, icon } = props;
  return (
    <CustomStepIconRoot ownerState={{ completed, active }}>
      {completed ? "✓" : icon}
    </CustomStepIconRoot>
  );
}

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 16,
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderTopWidth: 3,
    borderColor: theme.palette.grey[300],
    transition: "border-color 0.3s ease",
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.primary.main,
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.primary.main,
  },
}));

const steps = ["Data Donatur", "Detail Donasi"];

function FormulirDonasi() {
  const [step, setStep] = useState(0);

  return (
    <Box sx={{ width: "100%", backgroundColor: "#fff", pt: 3 }}>
      <Box sx={{ width: "100%", maxWidth: "md", mx: "auto", px: 2 }}>
        <Box textAlign="center" sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            Pembayaran Donasi
          </Typography>
        </Box>

        <Stepper
          activeStep={step}
          alternativeLabel
          connector={<CustomConnector />}
          sx={{ mb: 4 }}
        >
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel StepIconComponent={CustomStepIcon}>
                <Typography
                  sx={{
                    color: step === index ? "primary.main" : "primary.main",
                    fontWeight: step === index ? "bold" : "normal",
                    fontSize: 15,
                  }}
                >
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Container maxWidth="sm">
        {/* Placeholder untuk konten formulir */}
      </Container>
    </Box>
  );
}

export default FormulirDonasi;
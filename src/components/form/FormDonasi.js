import { useState } from "react";
import {
  Typography,
  Container,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  const [formData, setFormData] = useState({
    namaDonatur: "",
    noTelepon: "",
    nominalDonasi: "",
  });
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openConfirmBack, setOpenConfirmBack] = useState(false);

  const isStepFilled = () => {
    if (step === 0) {
      return (
        formData.namaDonatur &&
        formData.noTelepon &&
        !errors.namaDonatur &&
        !errors.noTelepon
      );
    } else if (step === 1) {
      return formData.nominalDonasi && !errors.nominalDonasi;
    }
    return false;
  };

  const handleBackClick = () => {
    if (isStepFilled()) {
      setOpenConfirmBack(true);
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const confirmBack = (discardData = false) => {
    setOpenConfirmBack(false);
    if (discardData) {
      if (step === 0) {
        setFormData((prev) => ({
          ...prev,
          namaDonatur: "",
          noTelepon: "",
        }));
      } else if (step === 1) {
        setFormData((prev) => ({
          ...prev,
          nominalDonasi: "",
        }));
      }
    }
    setStep((prev) => prev - 1);
  };

  const renderDetailDonasiSection = () => (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBackClick}
        sx={{ mt: 2 }}
      >
        Kembali
      </Button>
    </Box>
  );

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
        {step === 0 && renderDataDonaturSection()}
        {step === 1 && renderDetailDonasiSection()}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            severity={snackbarSeverity}
            onClose={() => setOpenSnackbar(false)}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>

		<Dialog
          open={openConfirmBack}
          onClose={() => setOpenConfirmBack(false)}
        >
          <DialogTitle>Konfirmasi</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {step === 0
                ? "Data nama dan telepon yang telah diisi akan dihapus. Yakin ingin kembali?"
                : "Data nominal yang telah diisi akan dihapus. Yakin ingin kembali?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirmBack(false)}>Batal</Button>
            <Button onClick={() => confirmBack(true)} color="error">
              Hapus Data & Kembali
            </Button>
            <Button onClick={() => confirmBack(false)} color="primary">
              Simpan Data & Kembali
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}

export default FormulirDonasi;
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Typography,
  TextField,
  Container,
  Card,
  CardContent,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
  Snackbar,
  Alert,
  CircularProgress,
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
  border: `2px solid ${ownerState.completed || ownerState.active
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
  const { state } = useLocation();
  const penggalanganDanaId = state?.id || null;
  const judul = state?.judul || "Donasi";

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
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [openConfirmBack, setOpenConfirmBack] = useState(false);

  const MIN_DONASI = 10000;
  const MAX_DONASI = 100000000;
  const currentDate = new Date();
  const deadline = new Date(currentDate);
  deadline.setDate(currentDate.getDate() + 2);
  const deadlineString = `${deadline.getDate()} ${deadline.toLocaleString(
    "default",
    { month: "long" }
  )} ${deadline.getFullYear()} - ${deadline.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  useEffect(() => {
    console.log('Received state:', { penggalanganDanaId, judul });
  }, [penggalanganDanaId, judul]);   

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      process.env.REACT_APP_MIDTRANS_CLIENT_KEY ||
      "SB-Mid-client-QHKjxlLz91qK4Cg6"
    );
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const resetForm = () => {
    setStep(0);
    setFormData({
      namaDonatur: "",
      noTelepon: "",
      nominalDonasi: "",
    });
    setPaymentData(null);
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "namaDonatur") {
      setErrors((prev) => ({
        ...prev,
        namaDonatur: value ? "" : "Nama donatur harus diisi",
      }));
    }
    if (name === "noTelepon") {
      if (!value) {
        setErrors((prev) => ({ ...prev, noTelepon: "No telepon harus diisi" }));
      } else if (!/^\d+$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          noTelepon: "No telepon harus berupa angka",
        }));
      } else {
        setErrors((prev) => ({ ...prev, noTelepon: "" }));
      }
    }
    if (name === "nominalDonasi") {
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          nominalDonasi: "Nominal donasi harus diisi",
        }));
      } else if (isNaN(value) || Number(value) < MIN_DONASI) {
        setErrors((prev) => ({
          ...prev,
          nominalDonasi: `Minimal Rp${MIN_DONASI.toLocaleString()}`,
        }));
      } else if (Number(value) > MAX_DONASI) {
        setErrors((prev) => ({
          ...prev,
          nominalDonasi: `Maksimal Rp${MAX_DONASI.toLocaleString()}`,
        }));
      } else {
        setErrors((prev) => ({ ...prev, nominalDonasi: "" }));
      }
    }
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

  const handleNext = async () => {
    let hasError = false;
    const newErrors = {};

    if (step === 0) {
      // Validate penggalanganDanaId
      if (!penggalanganDanaId) {
        setSnackbarSeverity("error");
        setSnackbarMessage("ID penggalangan dana tidak ditemukan.");
        setOpenSnackbar(true);
        setIsLoading(false);
        return;
      }

      console.log('penggalangan_dana_id:', penggalanganDanaId);
      console.log('judul:', judul);


      if (!formData.namaDonatur) {
        newErrors.namaDonatur = "Nama donatur harus diisi";
        hasError = true;
      }
      if (!formData.noTelepon) {
        newErrors.noTelepon = "No telepon harus diisi";
        hasError = true;
      } else if (!/^\d+$/.test(formData.noTelepon)) {
        newErrors.noTelepon = "No telepon harus berupa angka";
        hasError = true;
      }
    }

    if (step === 1) {
      const nominal = Number(formData.nominalDonasi);
      if (!formData.nominalDonasi) {
        newErrors.nominalDonasi = "Nominal donasi harus diisi";
        hasError = true;
      } else if (
        isNaN(nominal) ||
        nominal < MIN_DONASI ||
        nominal > MAX_DONASI
      ) {
        newErrors.nominalDonasi = `Donasi antara Rp${MIN_DONASI.toLocaleString()} - Rp${MAX_DONASI.toLocaleString()}`;
        hasError = true;
      }
    }

    setErrors(newErrors);

    if (!hasError && step === 1) {
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://localhost:8000/v1/penggalangan/donasi/createDonasi",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: penggalanganDanaId,
              nama: formData.namaDonatur,
              nomor_telepon: formData.noTelepon,
              nominal_donasi: Number(formData.nominalDonasi),
            }),
          }
        );

        const data = await response.json();

        if (data.response_code !== 201) {
          throw new Error(
            data.response_message || "Terjadi kesalahan saat memproses donasi"
          );
        }

        setPaymentData({
          orderId: data.data.donasi?.nomor_referensi,
          redirectUrl: data.data.redirect_url,
          token: data.data.midtrans_token,
          status: data.data.donasi?.payment_status,
        });

        setIsLoading(false);

        if (data.data.midtrans_token && window.snap) {
          console.log(
            "Initiating Snap payment with token:",
            data.data.midtrans_token
          );
          window.snap.pay(data.data.midtrans_token, {
            onSuccess: (result) => {
              console.log("onSuccess triggered:", result);
              setPaymentData((prev) => ({ ...prev, status: 1 }));
              setSnackbarSeverity("success");
              setSnackbarMessage(
                "Pembayaran berhasil! Terima kasih atas donasi Anda."
              );
              setOpenSnackbar(true);
              resetForm();
            },
            onPending: (result) => {
              console.log("onPending triggered:", result);
              setPaymentData((prev) => ({ ...prev, status: 0 }));
              setSnackbarSeverity("info");
              setSnackbarMessage(
                "Pembayaran masih diproses, silakan cek kembali nanti."
              );
              setOpenSnackbar(true);
              resetForm();
            },
            onError: (result) => {
              console.log("onError triggered:", result);
              setSnackbarSeverity("error");
              setSnackbarMessage("Terjadi kesalahan saat pembayaran.");
              setOpenSnackbar(true);
            },
            onClose: () => {
              console.log("onClose triggered");
              setSnackbarSeverity("info");
              setSnackbarMessage(
                "Anda menutup halaman pembayaran. Silakan coba lagi."
              );
              setOpenSnackbar(true);
            },
          });
        } else {
          console.error("Snap.js failed to load or token missing");
          setSnackbarSeverity("error");
          setSnackbarMessage("Gagal memuat Snap.js. Silakan coba lagi.");
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setIsLoading(false);
        setSnackbarSeverity("error");
        setSnackbarMessage(error.message || "Terjadi kesalahan pada server");
        setOpenSnackbar(true);
      }
    } else if (!hasError) {
      setStep((prev) => prev + 1);
    }
  };

  const renderDataDonaturSection = () => (
    <Card
      sx={{
        width: "100%",
        boxShadow: "none",
        border: "1px solid #e0e0e0",
        my: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", color: "grey.800", mb: 3 }}
        >
          Data Donatur
        </Typography>
        <TextField
          label="Nama Donatur"
          name="namaDonatur"
          value={formData.namaDonatur}
          onChange={handleChange}
          fullWidth
          error={!!errors.namaDonatur}
          helperText={errors.namaDonatur}
          sx={{ mb: 2 }}
        />
        <TextField
          label="No Telepon"
          name="noTelepon"
          value={formData.noTelepon}
          onChange={handleChange}
          fullWidth
          error={!!errors.noTelepon}
          helperText={errors.noTelepon}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleNext}
        >
          Selanjutnya
        </Button>
      </CardContent>
    </Card>
  );

  const renderDetailDonasiSection = () => (
    <Card
      sx={{
        width: "100%",
        boxShadow: "none",
        border: "1px solid #e0e0e0",
        my: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "grey.800", mb: 3 }}
        >
          Detail Donasi
        </Typography>
        <Box sx={{ "& > *": { mb: 1 } }}>
          <Typography variant="body2">
            <strong>Donatur:</strong> {formData.namaDonatur}
          </Typography>
          <Typography variant="body2">
            <strong>Nomor Telepon:</strong> {formData.noTelepon}
          </Typography>
        </Box>
        <TextField
          label="Nominal Donasi"
          name="nominalDonasi"
          value={formData.nominalDonasi}
          onChange={handleChange}
          fullWidth
          error={!!errors.nominalDonasi}
          helperText={errors.nominalDonasi}
          sx={{ mb: 2, mt: 4 }}
          InputProps={{
            startAdornment: <Typography sx={{ mr: 1 }}>Rp</Typography>,
          }}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleNext}
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Lanjut Pembayaran"
          )}
        </Button>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackClick}
          sx={{ mt: 2 }}
        >
          Kembali
        </Button>
      </CardContent>
    </Card>
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
            Pembayaran Donasi - {judul || "Penggalangan Dana"}
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

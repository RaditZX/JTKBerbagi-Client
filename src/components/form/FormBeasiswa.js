import {
	Typography,
	TextField,
	Container,
	Card,
	CardContent,
	Box,
	Button,
	MenuItem,
	Grid,
	Alert,
	CircularProgress,
  } from "@mui/material";
  import Timeline from "@mui/lab/Timeline";
  import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
  import TimelineSeparator from "@mui/lab/TimelineSeparator";
  import TimelineConnector from "@mui/lab/TimelineConnector";
  import TimelineContent from "@mui/lab/TimelineContent";
  import TimelineDot from "@mui/lab/TimelineDot";
  import { useState } from "react";
  
  function FormulirBeasiswa() {
	const [namaMahasiswa, setNamaMahasiswa] = useState("");
	const [nimMahasiswa, setNimMahasiswa] = useState("");
	const [noTelepon, setNoTelepon] = useState("");
	const [noRekening, setNoRekening] = useState("");
	const [pemilikRekening, setPemilikRekening] = useState("");
	const [namaBank, setNamaBank] = useState("");
	const [deskripsi, setDeskripsi] = useState("");
	const [golUkt, setGolUkt] = useState("");
	const [kuitansiPembayaranUkt, setKuitansiPembayaranUkt] = useState("");
	const [nominalPenghasilan, setNominalPenghasilan] = useState("");
	const [slipGaji, setSlipGaji] = useState("");
	const [dokumenEsai, setDokumenEsai] = useState("");
	const [jumlahTanggungan, setJumlahTanggungan] = useState("");
	const [biayaTransportasi, setBiayaTransportasi] = useState("");
	const [biayaKonsumsi, setBiayaKonsumsi] = useState("");
	const [biayaInternet, setBiayaInternet] = useState("");
	const [biayaKos, setBiayaKos] = useState("");
	const [biayaPengeluaran, setBiayaPengeluaran] = useState("");
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [step, setStep] = useState(0);
  
	const formatRupiah = (value) => {
	  if (!value) return "";
	  const numberString = value.replace(/[^0-9]/g, "");
	  return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	  }).format(numberString);
	};
  
	const parseRupiah = (value) => {
	  return value.replace(/[^0-9]/g, "");
	};
  
	const handleNamaMahasiswaChange = (val) => {
	  setNamaMahasiswa(val);
	  setErrors((prev) => ({
		...prev,
		namaMahasiswa: val ? "" : "Nama wajib diisi",
	  }));
	};
  
	const handleNimMahasiswaChange = (val) => {
	  const numbersOnly = val.replace(/[^0-9]/g, "");
	  setNimMahasiswa(numbersOnly);
	  setErrors((prev) => ({
		...prev,
		nimMahasiswa: numbersOnly ? "" : "NIM wajib diisi",
	  }));
	};
  
	const handleNoTeleponChange = (val) => {
	  const numbersOnly = val.replace(/[^0-9]/g, "").slice(0, 13);
	  setNoTelepon(numbersOnly);
	  setErrors((prev) => ({
		...prev,
		noTelepon: numbersOnly
		  ? numbersOnly.length < 10
			? "Nomor telepon minimal 10 digit"
			: ""
		  : "Nomor telepon wajib diisi",
	  }));
	};
  
	const handleNoRekeningChange = (val) => {
	  const numbersOnly = val.replace(/[^0-9]/g, "");
	  setNoRekening(numbersOnly);
	  setErrors((prev) => ({
		...prev,
		noRekening: numbersOnly
		  ? numbersOnly.length < 8
			? "Nomor rekening minimal 8 digit"
			: ""
		  : "Nomor rekening wajib diisi",
	  }));
	};
  
	const handlePemilikRekeningChange = (val) => {
	  setPemilikRekening(val);
	  setErrors((prev) => ({
		...prev,
		pemilikRekening: val ? "" : "Nama pemilik rekening wajib diisi",
	  }));
	};
  
	const handleNamaBankChange = (val) => {
	  setNamaBank(val);
	  setErrors((prev) => ({
		...prev,
		namaBank: val ? "" : "Nama bank wajib diisi",
	  }));
	};
  
	const handleDeskripsi = (val) => {
	  setDeskripsi(val);
	  setErrors((prev) => ({
		...prev,
		deskripsi: val ? "" : "Deskripsi wajib diisi",
	  }));
	};
  
	const handleGolUkt = (val) => {
	  setGolUkt(val);
	  setErrors((prev) => ({
		...prev,
		golUkt: val ? "" : "Golongan UKT wajib dipilih",
	  }));
	};
  
	const handleKuitansiPembayaranUkt = (val) => {
	  setKuitansiPembayaranUkt(val);
	  setErrors((prev) => ({
		...prev,
		kuitansiPembayaranUkt: val ? "" : "Dokumen UKT wajib diunggah",
	  }));
	};
  
	const handleNominalPenghasilan = (val) => {
	  const numbersOnly = val.replace(/[^0-9]/g, "");
	  setNominalPenghasilan(numbersOnly);
	  setErrors((prev) => ({
		...prev,
		nominalPenghasilan: numbersOnly ? "" : "Nominal penghasilan wajib diisi",
	  }));
	};
  
	const handleSlipGaji = (val) => {
	  setSlipGaji(val);
	  setErrors((prev) => ({
		...prev,
		slipGaji: val ? "" : "Slip gaji wajib diunggah",
	  }));
	};
  
	const handleDokumenEsai = (val) => {
	  setDokumenEsai(val);
	  setErrors((prev) => ({
		...prev,
		dokumenEsai: val ? "" : "Dokumen esai wajib diunggah",
	  }));
	};
  
	const handleJumlahTanggungan = (val) => {
	  setJumlahTanggungan(val);
	  setErrors((prev) => ({
		...prev,
		jumlahTanggungan: val ? "" : "Jumlah tanggungan wajib dipilih",
	  }));
	};
  
	const handleBiayaTransportasi = (val) => {
	  const numbersOnly = val.replace(/[^0-9]/g, "");
	  setBiayaTransportasi(numbersOnly);
	  setErrors((prev) => ({
		...prev,
		biayaTransportasi: numbersOnly ? "" : "Biaya transportasi wajib diisi",
	  }));
	};
  
	const handleBiayaKonsumsi = (val) => {
	  const numbersOnly = val.replace(/[^0-9]/g, "");
	  setBiayaKonsumsi(numbersOnly);
	  setErrors((prev) => ({
		...prev,
		biayaKonsumsi: numbersOnly ? "" : "Biaya konsumsi wajib diisi",
	  }));
	};
  
	const handleBiayaInternet = (val) => {
	  const numbersOnly = val.replace(/[^0-9]/g, "");
	  setBiayaInternet(numbersOnly);
	  setErrors((prev) => ({
		...prev,
		biayaInternet: numbersOnly ? "" : "Biaya internet wajib diisi",
	  }));
	};
  
	const handleBiayaKos = (val) => {
	  const numbersOnly = val.replace(/[^0-9]/g, "");
	  setBiayaKos(numbersOnly);
	  setErrors((prev) => ({
		...prev,
		biayaKos: numbersOnly ? "" : "Biaya kos wajib diisi",
	  }));
	};
  
	const handleBiayaPengeluaran = (val) => {
	  const numbersOnly = val.replace(/[^0-9]/g, "");
	  setBiayaPengeluaran(numbersOnly);
	  setErrors((prev) => ({
		...prev,
		biayaPengeluaran: numbersOnly ? "" : "Biaya pengeluaran wajib diisi",
	  }));
	};
  
	const validateStep = (currentStep) => {
	  const newErrors = {};
	  if (currentStep === 0) {
		if (!namaMahasiswa) newErrors.namaMahasiswa = "Nama wajib diisi";
		if (!nimMahasiswa) newErrors.nimMahasiswa = "NIM wajib diisi";
		if (!noTelepon) newErrors.noTelepon = "Nomor telepon wajib diisi";
		else if (noTelepon.length < 10)
		  newErrors.noTelepon = "Nomor telepon minimal 10 digit";
		if (!noRekening) newErrors.noRekening = "Nomor rekening wajib diisi";
		else if (noRekening.length < 8)
		  newErrors.noRekening = "Nomor rekening minimal 8 digit";
		if (!pemilikRekening)
		  newErrors.pemilikRekening = "Nama pemilik rekening wajib diisi";
		if (!namaBank) newErrors.namaBank = "Nama bank wajib diisi";
	  } else {
		if (!deskripsi) newErrors.deskripsi = "Deskripsi wajib diisi";
		if (!golUkt) newErrors.golUkt = "Golongan UKT wajib dipilih";
		if (!kuitansiPembayaranUkt)
		  newErrors.kuitansiPembayaranUkt = "Dokumen UKT wajib diunggah";
		if (!nominalPenghasilan)
		  newErrors.nominalPenghasilan = "Nominal penghasilan wajib diisi";
		if (!slipGaji) newErrors.slipGaji = "Slip gaji wajib diunggah";
		if (!dokumenEsai) newErrors.dokumenEsai = "Dokumen esai wajib diunggah";
		if (!jumlahTanggungan)
		  newErrors.jumlahTanggungan = "Jumlah tanggungan wajib dipilih";
		if (!biayaTransportasi)
		  newErrors.biayaTransportasi = "Biaya transportasi wajib diisi";
		if (!biayaKonsumsi) newErrors.biayaKonsumsi = "Biaya konsumsi wajib diisi";
		if (!biayaInternet) newErrors.biayaInternet = "Biaya internet wajib diisi";
		if (!biayaKos) newErrors.biayaKos = "Biaya kos wajib diisi";
		if (!biayaPengeluaran)
		  newErrors.biayaPengeluaran = "Biaya pengeluaran wajib diisi";
	  }
	  setErrors(newErrors);
	  return Object.keys(newErrors).length === 0;
	};
  
	const createPengajuanBeasiswa = async () => {
	  if (!validateStep(1)) return;
	  setIsSubmitting(true);
	  try {
		const response = await fetch(
		  "http://localhost:8000/v1/pengajuan/pengajuan_bantuan/createPengajuanBeasiswa",
		  {
			mode: "cors",
			method: "POST",
			headers: {
			  Accept: "application/json",
			  "Content-Type": "application/json",
			  "Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
			  nama: namaMahasiswa,
			  nim: nimMahasiswa,
			  nomor_telepon: noTelepon,
			  nomor_rekening: noRekening,
			  nama_pemilik_rekening: pemilikRekening,
			  nama_bank: namaBank,
			  alasan_butuh_bantuan: deskripsi,
			  golongan_ukt: golUkt,
			  kuitansi_pembayaran_ukt: kuitansiPembayaranUkt,
			  gaji_orang_tua: parseRupiah(nominalPenghasilan),
			  bukti_slip_gaji_orang_tua: slipGaji,
			  esai: dokumenEsai,
			  jumlah_tanggungan_keluarga: jumlahTanggungan,
			  biaya_transportasi: parseRupiah(biayaTransportasi),
			  biaya_konsumsi: parseRupiah(biayaKonsumsi),
			  biaya_internet: parseRupiah(biayaInternet),
			  biaya_kos: parseRupiah(biayaKos),
			  total_pengeluaran_keluarga: parseRupiah(biayaPengeluaran),
			}),
		  }
		);
		const data = await response.json();
		console.log(data.id, "test id");
	  } catch (err) {
		console.log(err.message);
	  } finally {
		setIsSubmitting(false);
	  }
	};
  
	const golonganUKT = [
	  { value: "1", label: "Golongan 1" },
	  { value: "2", label: "Golongan 2" },
	  { value: "3", label: "Golongan 3" },
	  { value: "4", label: "Golongan 4" },
	  { value: "5", label: "Golongan 5" },
	  { value: "6", label: "Golongan 6" },
	  { value: "7", label: "Golongan 7" },
	  { value: "8", label: "Golongan 8" },
	];
  
	const tanggunganKeluarga = [
	  { value: "1", label: "1 Tanggungan" },
	  { value: "2", label: "2 Tanggungan" },
	  { value: "3", label: "3 Tanggungan" },
	  { value: "4", label: "4 Tanggungan" },
	  { value: "5", label: ">4 Tanggungan" },
	];
  
	const renderDataPribadiSection = () => {
	  return (
		<Grid container spacing={2} sx={{ py: { xs: 2, md: 4 } }}>
		  <Grid item xs={12} md={4}>
			<Timeline
			  sx={{
				[`& .${timelineItemClasses.root}:before`]: {
				  flex: 0,
				  padding: 0,
				},
			  }}
			>
			  <TimelineItem>
				<TimelineSeparator>
				  <TimelineDot color="error" variant="outlined" />
				  <TimelineConnector />
				</TimelineSeparator>
				<TimelineContent>
				  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
					Data Pribadi
				  </Typography>
				</TimelineContent>
			  </TimelineItem>
			  <TimelineItem>
				<TimelineSeparator>
				  <TimelineDot color="grey" />
				</TimelineSeparator>
				<TimelineContent>
				  <Typography variant="h6">Persyaratan</Typography>
				</TimelineContent>
			  </TimelineItem>
			</Timeline>
		  </Grid>
		  <Grid item xs={12} md={8}>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
			  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
				Identitas Calon Penerima Beasiswa
			  </Typography>
			  {errors.namaMahasiswa && (
				<Alert severity="error" sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
				  {errors.namaMahasiswa}
				</Alert>
			  )}
			  <Typography variant="body1" sx={{ color: "#636E72", fontWeight: "bold" }}>
				Nama Mahasiswa
			  </Typography>
			  <TextField
				variant="outlined"
				size="small"
				label="cth: John Doe"
				value={namaMahasiswa}
				onChange={(e) => handleNamaMahasiswaChange(e.target.value)}
				inputProps={{ "aria-label": "Nama Mahasiswa" }}
				sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}
				autoComplete="off"
			  />
			  {errors.nimMahasiswa && (
				<Alert severity="error" sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
				  {errors.nimMahasiswa}
				</Alert>
			  )}
			  <Typography variant="body1" sx={{ color: "#636E72", fontWeight: "bold" }}>
				Nomor Induk Mahasiswa
			  </Typography>
			  <TextField
				variant="outlined"
				size="small"
				label="Pilih NIM"
				value={nimMahasiswa}
				onChange={(e) => handleNimMahasiswaChange(e.target.value)}
				inputProps={{ "aria-label": "Nomor Induk Mahasiswa", pattern: "[0-9]*" }}
				type="text"
				sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}
				autoComplete="off"
			  />
			  {errors.noTelepon && (
				<Alert severity="error" sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
				  {errors.noTelepon}
				</Alert>
			  )}
			  <Typography variant="body1" sx={{ color: "#636E72", fontWeight: "bold" }}>
				Nomor Telepon
			  </Typography>
			  <TextField
				variant="outlined"
				size="small"
				label="cth: 082121445524"
				value={noTelepon}
				onChange={(e) => handleNoTeleponChange(e.target.value)}
				inputProps={{ "aria-label": "Nomor Telepon", pattern: "[0-9]*", maxLength: 13 }}
				type="text"
				sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}
				autoComplete="off"
			  />
			  {errors.pemilikRekening && (
				<Alert severity="error" sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
				  {errors.pemilikRekening}
				</Alert>
			  )}
			  <Typography variant="body1" sx={{ color: "#636E72", fontWeight: "bold" }}>
				Nama Pemilik Rekening
			  </Typography>
			  <TextField
				variant="outlined"
				size="small"
				label="cth: JOHN DOE"
				value={pemilikRekening}
				onChange={(e) => handlePemilikRekeningChange(e.target.value)}
				inputProps={{ "aria-label": "Nama Pemilik Rekening" }}
				sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}
				autoComplete="off"
			  />
			  {errors.namaBank && (
				<Alert severity="error" sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
				  {errors.namaBank}
				</Alert>
			  )}
			  <Typography variant="body1" sx={{ color: "#636E72", fontWeight: "bold" }}>
				Nama Bank
			  </Typography>
			  <TextField
				variant="outlined"
				size="small"
				label="cth: Mandiri"
				value={namaBank}
				onChange={(e) => handleNamaBankChange(e.target.value)}
				inputProps={{ "aria-label": "Nama Bank" }}
				sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}
				autoComplete="off"
			  />
			  {errors.noRekening && (
				<Alert severity="error" sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
				  {errors.noRekening}
				</Alert>
			  )}
			  <Typography variant="body1" sx={{ color: "#636E72", fontWeight: "bold" }}>
				Nomor Rekening
			  </Typography>
			  <TextField
				variant="outlined"
				size="small"
				label="cth: 1300046201001"
				value={noRekening}
				onChange={(e) => handleNoRekeningChange(e.target.value)}
				inputProps={{ "aria-label": "Nomor Rekening", pattern: "[0-9]*" }}
				type="text"
				sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}
				autoComplete="off"
			  />
			  <Button
				variant="contained"
				sx={{
				  mt: 2,
				  textTransform: "capitalize",
				  backgroundColor: "#1976d2",
				  width: { xs: "100%", sm: "200px" },
				  alignSelf: { xs: "stretch", sm: "flex-start" },
				}}
				onClick={() => {
				  if (validateStep(0)) setStep(1);
				}}
			  >
				Selanjutnya
			  </Button>
			</Box>
		  </Grid>
		</Grid>
	  );
	};
  
	const renderPersyaratanSection = () => {
	  return (
		<Grid container spacing={2} sx={{ py: { xs: 2, md: 4 } }}>
		  <Grid item xs={12} md={4}>
			<Timeline
			  sx={{
				[`& .${timelineItemClasses.root}:before`]: {
				  flex: 0,
				  padding: 0,
				},
			  }}
			>
			  <TimelineItem>
				<TimelineSeparator>
				  <TimelineDot color="success" variant="outlined" />
				  <TimelineConnector />
				</TimelineSeparator>
				<TimelineContent>
				  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
					Data Pribadi
				  </Typography>
				</TimelineContent>
			  </TimelineItem>
			  <TimelineItem>
				<TimelineSeparator>
				  <TimelineDot color="error" />
				</TimelineSeparator>
				<TimelineContent>
				  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
					Persyaratan
				  </Typography>
				</TimelineContent>
			  </TimelineItem>
			</Timeline>
		  </Grid>
		  <Grid item xs={12} md={8}>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
			  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
				Persyaratan Calon Penerima Beasiswa
			  </Typography>
			  {errors.deskripsi && (
				<Alert severity="error" sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
				  {errors.deskripsi}
				</Alert>
			  )}
			  <Typography variant="body1" sx={{ color: "#636E72", fontWeight: "bold" }}>
				Deskripsi Ajakan Galang Dana
			  </Typography>
			  <TextField
				variant="outlined"
				size="small"
				label="cth: Alasan membutuhkan biaya bantuan"
				value={deskripsi}
				onChange={(e) => handleDeskripsi(e.target.value)}
				multiline
				rows={4}
				inputProps={{ "aria-label": "Deskripsi Ajakan Galang Dana" }}
				sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}
				autoComplete="off"
			  />
			  {errors.golUkt && (
				<Alert severity="error" sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
				  {errors.golUkt}
				</Alert>
			  )}
			  <Typography variant="body1" sx={{ color: "#636E72", fontWeight: "bold" }}>
				Golongan UKT
			  </Typography>
			  <TextField
				select
				variant="outlined"
				size="small"
				label="Pilih Golongan UKT"
				value={golUkt}
				onChange={(e) => handleGolUkt(e.target.value)}
				inputProps={{ "aria-label": "Golongan UKT" }}
				sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}
				autoComplete="off"
			  >
				{golonganUKT.map((option) => (
				  <MenuItem key={option.value} value={option.value}>
					{option.label}
				  </MenuItem>
				))}
			  </TextField>
			  {errors.kuitansiPembayaranUkt && (
				<Alert severity="error" sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
				  {errors.kuitansiPembayaranUkt}
				</Alert>
			  )}
			  <Typography variant="body1" sx={{ color: "#636E72", fontWeight: "bold" }}>
				Bukti Dokumen Golongan UKT
			  </Typography>
			  <TextField
				type="file"
				onChange={(e) => handleKuitansiPembayaranUkt(e.target.files[0]?.name || "")}
				inputProps={{ "aria-label": "Bukti Dokumen Golongan UKT", accept: ".pdf,.jpg,.jpeg,.png" }}
				sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}
			  />
			  {errors.nominalPenghasilan && (
				<Alert severity="error" sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
				  {errors.nominalPenghasilan}
				</Alert>
			  )}
			  <Typography variant="body1" sx={{ color: "#636E72", fontWeight: "bold" }}>
				Biaya Penghasilan Orang Tua /Bulan
			  </Typography>
			  <TextField
				variant="outlined"
				size="small"
				label="Gaji Orangtua / bulan (Rp)"
				value={formatRupiah(nominalPenghasilan)}
				onChange={(e) => handleNominalPenghasilan(e.target.value)}
				inputProps={{ "aria-label": "Biaya Penghasilan Orang Tua", pattern: "[0-9]*" }}
				type="text"
				sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}
				autoComplete="off"
			  />
			  {errors.slipGaji && (
				<Alert severity="error" sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
				  {errors.slipGaji}
				</Alert>
			  )}
			  <Typography variant="body1" sx={{ color: "#636E72", fontWeight: "bold" }}>
				Bukti Dokumen Penghasilan Orang Tua
			  </Typography>
			  <TextField
				type="file"
				onChange={(e) => handleSlipGaji(e.target.files[0]?.name || "")}
				inputProps={{ "aria-label": "Bukti Dokumen Penghasilan Orang Tua", accept: ".pdf,.jpg,.jpeg,.png" }}
				sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}
			  />
			  {errors.jumlahTanggungan && (
				<Alert severity="error" sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
				  {errors.jumlahTanggungan}
				</Alert>
			  )}
			  <Typography variant="body1" sx={{ color: "#636E72", fontWeight: "bold" }}>
				Jumlah Tanggungan Anggota Keluarga
			  </Typography>
			  <TextField
				select
				variant="outlined"
				size="small"
				label="Pilih Jumlah"
				value={jumlahTanggungan}
				onChange={(e) => handleJumlahTanggungan(e.target.value)}
				inputProps={{ "aria-label": "Jumlah Tanggungan Anggota Keluarga" }}
				sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}
				autoComplete="off"
			  >
				{tanggunganKeluarga.map((option) => (
				  <MenuItem key={option.value} value={option.value}>
					{option.label}
				  </MenuItem>
				))}
			  </TextField>
			  <Typography variant="body1" sx={{ color: "#636E72", fontWeight: "bold" }}>
				Biaya Kebutuhan Perkuliahan
			  </Typography>
			  {errors.biayaKos && (
				<Alert severity="error" sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
				  {errors.biayaKos}
				</Alert>
			  )}
			  <TextField
				variant="outlined"
				size="small"
				label="Biaya Kos / bulan (Rp)"
				value={formatRupiah(biayaKos)}
				onChange={(e) => handleBiayaKos(e.target.value)}
				inputProps={{ "aria-label": "Biaya Kos", pattern: "[0-9]*" }}
				type="text"
				sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}
				autoComplete="off"
			  />
			  {errors.biayaInternet && (
				<Alert severity="error" sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
				  {errors.biayaInternet}
				</Alert>
			  )}
			  <TextField
				variant="outlined"
				size="small"
				label="Biaya Internet / bulan (Rp)"
				value={formatRupiah(biayaInternet)}
				onChange={(e) => handleBiayaInternet(e.target.value)}
				inputProps={{ "aria-label": "Biaya Internet", pattern: "[0-9]*" }}
				type="text"
				sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}
				autoComplete="off"
			  />
			  {errors.biayaKonsumsi && (
				<Alert severity="error" sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
				  {errors.biayaKonsumsi}
				</Alert>
			  )}
			  <TextField
				variant="outlined"
				size="small"
				label="Biaya Pangan / bulan (Rp)"
				value={formatRupiah(biayaKonsumsi)}
				onChange={(e) => handleBiayaKonsumsi(e.target.value)}
				inputProps={{ "aria-label": "Biaya Pangan", pattern: "[0-9]*" }}
				type="text"
				sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}
				autoComplete="off"
			  />
			  {errors.biayaTransportasi && (
				<Alert severity="error" sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
				  {errors.biayaTransportasi}
				</Alert>
			  )}
			  <TextField
				variant="outlined"
				size="small"
				label="Biaya Transportasi / bulan (Rp)"
				value={formatRupiah(biayaTransportasi)}
				onChange={(e) => handleBiayaTransportasi(e.target.value)}
				inputProps={{ "aria-label": "Biaya Transportasi", pattern: "[0-9]*" }}
				type="text"
				sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}
				autoComplete="off"
			  />
			  {errors.biayaPengeluaran && (
				<Alert severity="error" sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
				  {errors.biayaPengeluaran}
				</Alert>
			  )}
			  <Typography variant="body1" sx={{ color: "#636E72", fontWeight: "bold" }}>
				Biaya Pengeluaran Keluarga
			  </Typography>
			  <TextField
				variant="outlined"
				size="small"
				label="Biaya Pengeluaran / bulan (Rp)"
				value={formatRupiah(biayaPengeluaran)}
				onChange={(e) => handleBiayaPengeluaran(e.target.value)}
				inputProps={{ "aria-label": "Biaya Pengeluaran Keluarga", pattern: "[0-9]*" }}
				type="text"
				sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}
				autoComplete="off"
			  />
			  {errors.dokumenEsai && (
				<Alert severity="error" sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}>
				  {errors.dokumenEsai}
				</Alert>
			  )}
			  <Typography variant="body1" sx={{ color: "#636E72", fontWeight: "bold" }}>
				Dokumen Esai
			  </Typography>
			  <TextField
				type="file"
				onChange={(e) => handleDokumenEsai(e.target.files[0]?.name || "")}
				inputProps={{ "aria-label": "Dokumen Esai", accept: ".pdf" }}
				sx={{ mt: 1, maxWidth: { xs: "100%", sm: "400px" } }}
			  />
			  <Box
				sx={{
				  display: "flex",
				  gap: 1,
				  mt: 2,
				  flexDirection: { xs: "column", sm: "row" },
				  justifyContent: "flex-start",
				  alignItems: "center",
				}}
			  >
				<Button
				  variant="contained"
				  sx={{
					textTransform: "capitalize",
					backgroundColor: "#1976d2",
					width: { xs: "100%", sm: "200px" },
				  }}
				  onClick={createPengajuanBeasiswa}
				  disabled={isSubmitting}
				>
				  {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
				</Button>
				<Button
				  variant="outlined"
				  sx={{
					textTransform: "capitalize",
					width: { xs: "100%", sm: "200px" },
				  }}
				  onClick={() => setStep(0)}
				  disabled={isSubmitting}
				>
				  Sebelumnya
				</Button>
			  </Box>
			</Box>
		  </Grid>
		</Grid>
	  );
	};
  
	return (
	  <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
		<Card sx={{ width: "100%", maxWidth: 1200, p: 3 }}>
		  <CardContent>
			{step === 0 ? renderDataPribadiSection() : renderPersyaratanSection()}
		  </CardContent>
		</Card>
	  </Container>
	);
  }
  
  export default FormulirBeasiswa;

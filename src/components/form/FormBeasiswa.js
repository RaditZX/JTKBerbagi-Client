import { Typography, TextField, Container, Card, CardContent, Box, Button, MenuItem, Alert, CircularProgress } from "@mui/material";
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useState } from "react";

// FormulirBeasiswa dengan validasi wajib, validasi khusus untuk nomor telepon dan rekening yang hanya bisa menambahkan atau mengisi angka,
// Perbaikan juga bagian ui ny 
function FormulirBeasiswa() {
  const [namaMahasiswa, setNamaMahasiswa] = useState('');
  const [nimMahasiswa, setNimMahasiswa] = useState('');
  const [noTelepon, setNoTelepon] = useState('');
  const [noRekening, setNoRekening] = useState('');
  const [pemilikRekening, setPemilikRekening] = useState('');
  const [namaBank, setNamaBank] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [golUkt, setGolUkt] = useState('');
  const [kuitansiPembayaranUkt, setKuitansiPembayaranUkt] = useState('');
  const [nominalPenghasilan, setNominalPenghasilan] = useState('');
  const [slipGaji, setSlipGaji] = useState('');
  const [dokumenEsai, setDokumenEsai] = useState('');
  const [jumlahTanggungan, setJumlahTanggungan] = useState('');
  const [biayaTransportasi, setBiayaTransportasi] = useState('');
  const [biayaKonsumsi, setBiayaKonsumsi] = useState('');
  const [biayaInternet, setBiayaInternet] = useState('');
  const [biayaKos, setBiayaKos] = useState('');
  const [biayaPengeluaran, setBiayaPengeluaran] = useState('');
  const [errors, setErrors] = useState({}); // State untuk menyimpan pesan error
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [step, setStep] = useState(0);

  //  Handler untuk input dengan validasi
  const handleNamaMahasiswaChange = (val) => {
    setNamaMahasiswa(val);
    if (!val) setErrors((prev) => ({ ...prev, namaMahasiswa: 'Nama wajib diisi' }));
    else setErrors((prev) => ({ ...prev, namaMahasiswa: '' }));
  };

  const handleNimMahasiswaChange = (val) => {
    setNimMahasiswa(val);
    if (!val) setErrors((prev) => ({ ...prev, nimMahasiswa: 'NIM wajib diisi' }));
    else setErrors((prev) => ({ ...prev, nimMahasiswa: '' }));
  };

  const handleNoTeleponChange = (val) => {
    if (/^\d{0,13}$/.test(val)) { // : Validasi hanya angka, maksimal ny 13 digit
      setNoTelepon(val);
      if (!val) setErrors((prev) => ({ ...prev, noTelepon: 'Nomor telepon wajib diisi' }));
      else if (val.length < 10) setErrors((prev) => ({ ...prev, noTelepon: 'Nomor telepon minimal 10 digit' }));
      else setErrors((prev) => ({ ...prev, noTelepon: '' }));
    }
  };

  const handleNoRekeningChange = (val) => {
    if (/^\d{0,20}$/.test(val)) { // : Validasi hanya angka, maks 20 digit untuk ini dengan asumsi karena bank lokal maksimal itu 16 digit 
      setNoRekening(val);
      if (!val) setErrors((prev) => ({ ...prev, noRekening: 'Nomor rekening wajib diisi' }));
      else if (val.length < 8) setErrors((prev) => ({ ...prev, noRekening: 'Nomor rekening minimal 8 digit' }));
      else setErrors((prev) => ({ ...prev, noRekening: '' }));
    }
  };

  const handlePemilikRekeningChange = (val) => {
    setPemilikRekening(val);
    if (!val) setErrors((prev) => ({ ...prev, pemilikRekening: 'Nama pemilik rekening wajib diisi' }));
    else setErrors((prev) => ({ ...prev, pemilikRekening: '' }));
  };

  const handleNamaBankChange = (val) => {
    setNamaBank(val);
    if (!val) setErrors((prev) => ({ ...prev, namaBank: 'Nama bank wajib diisi' }));
    else setErrors((prev) => ({ ...prev, namaBank: '' }));
  };

  const handleDeskripsi = (val) => {
    setDeskripsi(val);
    if (!val) setErrors((prev) => ({ ...prev, deskripsi: 'Deskripsi wajib diisi' }));
    else setErrors((prev) => ({ ...prev, deskripsi: '' }));
  };

  const handleGolUkt = (val) => {
    setGolUkt(val);
    if (!val) setErrors((prev) => ({ ...prev, golUkt: 'Golongan UKT wajib dipilih' }));
    else setErrors((prev) => ({ ...prev, golUkt: '' }));
  };

  const handleKuitansiPembayaranUkt = (val) => {
    setKuitansiPembayaranUkt(val);
    if (!val) setErrors((prev) => ({ ...prev, kuitansiPembayaranUkt: 'Dokumen UKT wajib diunggah' }));
    else setErrors((prev) => ({ ...prev, kuitansiPembayaranUkt: '' }));
  };

  const handleNominalPenghasilan = (val) => {
    if (/^\d*$/.test(val)) { // : Menambahkan Validasi bagian ini  hanya angka
      setNominalPenghasilan(val);
      if (!val) setErrors((prev) => ({ ...prev, nominalPenghasilan: 'Nominal penghasilan wajib diisi' }));
      else setErrors((prev) => ({ ...prev, nominalPenghasilan: '' }));
    }
  };

  const handleSlipGaji = (val) => {
    setSlipGaji(val);
    if (!val) setErrors((prev) => ({ ...prev, slipGaji: 'Slip gaji wajib diunggah' }));
    else setErrors((prev) => ({ ...prev, slipGaji: '' }));
  };

  const handleDokumenEsai = (val) => {
    setDokumenEsai(val);
    if (!val) setErrors((prev) => ({ ...prev, dokumenEsai: 'Dokumen esai wajib diunggah' }));
    else setErrors((prev) => ({ ...prev, dokumenEsai: '' }));
  };

  const handleJumlahTanggungan = (val) => {
    setJumlahTanggungan(val);
    if (!val) setErrors((prev) => ({ ...prev, jumlahTanggungan: 'Jumlah tanggungan wajib dipilih' }));
    else setErrors((prev) => ({ ...prev, jumlahTanggungan: '' }));
  };

  const handleBiayaTransportasi = (val) => {
    if (/^\d*$/.test(val)) { // : Validasi hanya bisa isi angka
      setBiayaTransportasi(val);
      if (!val) setErrors((prev) => ({ ...prev, biayaTransportasi: 'Biaya transportasi wajib diisi' }));
      else setErrors((prev) => ({ ...prev, biayaTransportasi: '' }));
    }
  };

  const handleBiayaKonsumsi = (val) => {
    if (/^\d*$/.test(val)) { // : Validasi hanya angka 
      setBiayaKonsumsi(val);
      if (!val) setErrors((prev) => ({ ...prev, biayaKonsumsi: 'Biaya konsumsi wajib diisi' }));
      else setErrors((prev) => ({ ...prev, biayaKonsumsi: '' }));
    }
  };

  const handleBiayaInternet = (val) => {
    if (/^\d*$/.test(val)) { // : Validasi hanya angka
      setBiayaInternet(val);
      if (!val) setErrors((prev) => ({ ...prev, biayaInternet: 'Biaya internet wajib diisi' }));
      else setErrors((prev) => ({ ...prev, biayaInternet: '' }));
    }
  };

  const handleBiayaKos = (val) => {
    if (/^\d*$/.test(val)) { // : Validasi hanya bisa isi angka
      setBiayaKos(val);
      if (!val) setErrors((prev) => ({ ...prev, biayaKos: 'Biaya kos wajib diisi' }));
      else setErrors((prev) => ({ ...prev, biayaKos: '' }));
    }
  };

  const handleBiayaPengeluaran = (val) => {
    if (/^\d*$/.test(val)) { // : Validasi hanya angka
      setBiayaPengeluaran(val);
      if (!val) setErrors((prev) => ({ ...prev, biayaPengeluaran: 'Biaya pengeluaran wajib diisi' }));
      else setErrors((prev) => ({ ...prev, biayaPengeluaran: '' }));
    }
  };

  // : Validasi sebelum pindah step atau submit
  const validateStep = (step) => {
    const newErrors = {};
    if (step === 0) {
      if (!namaMahasiswa) newErrors.namaMahasiswa = 'Nama wajib diisi';
      if (!nimMahasiswa) newErrors.nimMahasiswa = 'NIM wajib diisi';
      if (!noTelepon) newErrors.noTelepon = 'Nomor telepon wajib diisi';
      else if (noTelepon.length < 10) newErrors.noTelepon = 'Nomor telepon minimal 10 digit';
      if (!noRekening) newErrors.noRekening = 'Nomor rekening wajib diisi';
      else if (noRekening.length < 8) newErrors.noRekening = 'Nomor rekening minimal 8 digit';
      if (!pemilikRekening) newErrors.pemilikRekening = 'Nama pemilik rekening wajib diisi';
      if (!namaBank) newErrors.namaBank = 'Nama bank wajib diisi';
    } else {
      if (!deskripsi) newErrors.deskripsi = 'Deskripsi wajib diisi';
      if (!golUkt) newErrors.golUkt = 'Golongan UKT wajib dipilih';
      if (!kuitansiPembayaranUkt) newErrors.kuitansiPembayaranUkt = 'Dokumen UKT wajib diunggah';
      if (!nominalPenghasilan) newErrors.nominalPenghasilan = 'Nominal penghasilan wajib diisi';
      if (!slipGaji) newErrors.slipGaji = 'Slip gaji wajib diunggah';
      if (!dokumenEsai) newErrors.dokumenEsai = 'Dokumen esai wajib diunggah';
      if (!jumlahTanggungan) newErrors.jumlahTanggungan = 'Jumlah tanggungan wajib dipilih';
      if (!biayaTransportasi) newErrors.biayaTransportasi = 'Biaya transportasi wajib diisi';
      if (!biayaKonsumsi) newErrors.biayaKonsumsi = 'Biaya konsumsi wajib diisi';
      if (!biayaInternet) newErrors.biayaInternet = 'Biaya internet wajib diisi';
      if (!biayaKos) newErrors.biayaKos = 'Biaya kos wajib diisi';
      if (!biayaPengeluaran) newErrors.biayaPengeluaran = 'Biaya pengeluaran wajib diisi';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createPengajuanBeasiswa = async () => {
    if (!validateStep(1)) return;
    setIsSubmitting(true); 
    try {
      const response = await fetch('http://localhost:8000/v1/pengajuan/pengajuan_bantuan/createPengajuanBeasiswa', {
        mode: 'cors',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
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
          gaji_orang_tua: nominalPenghasilan,
          bukti_slip_gaji_orang_tua: slipGaji,
          esai: dokumenEsai,
          jumlah_tanggungan_keluarga: jumlahTanggungan,
          biaya_transportasi: biayaTransportasi,
          biaya_konsumsi: biayaKonsumsi,
          biaya_internet: biayaInternet,
          biaya_kos: biayaKos,
          total_pengeluaran_keluarga: biayaPengeluaran,
        }),
      });
      const data = await response.json();
      console.log(data.id, 'test id');
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsSubmitting(false); 
    }
  };

  const golonganUKT = [
    { value: '1', label: 'Golongan 1' },
    { value: '2', label: 'Golongan 2' },
    { value: '3', label: 'Golongan 3' },
    { value: '4', label: 'Golongan 4' },
    { value: '5', label: 'Golongan 5' },
    { value: '6', label: 'Golongan 6' },
    { value: '7', label: 'Golongan 7' },
    { value: '8', label: 'Golongan 8' },
  ];

  const tanggunganKeluarga = [
    { value: '1', label: '1 Tanggungan' },
    { value: '2', label: '2 Tanggungan' },
    { value: '3', label: '3 Tanggungan' },
    { value: '4', label: '4 Tanggungan' },
    { value: '5', label: '>4 Tanggungan' },
  ];

  const renderDataPribadiSection = () => {
    return (
      <Box sx={{ width: { xs: '100%', md: '70%' }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ width: { xs: '100%', md: '30%' }, display: { xs: 'none', sm: 'block' } }}>
          { }
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
              },
            }}
          >
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="error" variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ width: 'max-content' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  Daftar Beasiswa
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent variant="h5" sx={{ width: 'max-content' }}>
                Data Pribadi
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent variant="body1">Persyaratan</TimelineContent>
            </TimelineItem>
          </Timeline>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 4, width: { xs: '100%', md: '65%' } }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Identitas Calon Penerima Beasiswa
          </Typography>
          {errors.namaMahasiswa && <Alert severity="error" sx={{ mt: 2 }}>{errors.namaMahasiswa}</Alert>}
          <Typography variant="body1" sx={{ mt: 3, color: '#636E72', fontWeight: 'bold' }}>
            Nama Mahasiswa
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            label="cth: John Doe"
            value={namaMahasiswa}
            onChange={(e) => handleNamaMahasiswaChange(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
            inputProps={{ 'aria-label': 'Nama Mahasiswa' }} 
          />
          {errors.nimMahasiswa && <Alert severity="error" sx={{ mt: 2 }}>{errors.nimMahasiswa}</Alert>}
          <Typography variant="body1" sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>
            Nomor Induk Mahasiswa
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            label="Pilih NIM"
            value={nimMahasiswa}
            onChange={(e) => handleNimMahasiswaChange(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
            inputProps={{ 'aria-label': 'Nomor Induk Mahasiswa' }}
          />
          {errors.noTelepon && <Alert severity="error" sx={{ mt: 2 }}>{errors.noTelepon}</Alert>}
          <Typography variant="body1" sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>
            Nomor Telepon
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            label="cth: 082121445524"
            value={noTelepon}
            onChange={(e) => handleNoTeleponChange(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
            inputProps={{ 'aria-label': 'Nomor Telepon' }}
          />
          {errors.pemilikRekening && <Alert severity="error" sx={{ mt: 2 }}>{errors.pemilikRekening}</Alert>}
          <Typography variant="body1" sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>
            Nama Pemilik Rekening
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            label="cth: JOHN DOE"
            value={pemilikRekening}
            onChange={(e) => handlePemilikRekeningChange(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
            inputProps={{ 'aria-label': 'Nama Pemilik Rekening' }}
          />
          {errors.namaBank && <Alert severity="error" sx={{ mt: 2 }}>{errors.namaBank}</Alert>}
          <Typography variant="body1" sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>
            Nama Bank
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            label="cth: Mandiri"
            value={namaBank}
            onChange={(e) => handleNamaBankChange(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
            inputProps={{ 'aria-label': 'Nama Bank' }}
          />
          {errors.noRekening && <Alert severity="error" sx={{ mt: 2 }}>{errors.noRekening}</Alert>}
          <Typography variant="body1" sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>
            Nomor Rekening
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            label="cth: 1300046201001"
            value={noRekening}
            onChange={(e) => handleNoRekeningChange(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
            inputProps={{ 'aria-label': 'Nomor Rekening' }}
          />
          <Button
            size="medium"
            variant="contained"
            sx={{ mt: 4, textTransform: 'capitalize' }}
            onClick={() => {
              if (validateStep(0)) setStep(1);
            }}
          >
            Selanjutnya
          </Button>
        </Box>
      </Box>
    );
  };

  const renderPersyaratanSection = () => {
    return (
      <Box sx={{ width: { xs: '100%', md: '70%' }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ width: { xs: '100%', md: '30%' }, display: { xs: 'none', sm: 'block' } }}>
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
              },
            }}
          >
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="error" variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ width: 'max-content' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  Daftar Beasiswa
                </Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="success" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent variant="body1" sx={{ width: 'max-content' }}>
                Data Pribadi
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent variant="h5">Persyaratan</TimelineContent>
            </TimelineItem>
          </Timeline>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 4, width: { xs: '100%', md: '65%' } }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Persyaratan Calon Penerima Beasiswa
          </Typography>
          {errors.deskripsi && <Alert severity="error" sx={{ mt: 2 }}>{errors.deskripsi}</Alert>}
          <Typography variant="body1" sx={{ mt: 3, color: '#636E72', fontWeight: 'bold' }}>
            Deskripsi Ajakan Galang Dana
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            label="cth: Alasan membutuhkan biaya bantuan"
            value={deskripsi}
            onChange={(e) => handleDeskripsi(e.target.value)}
            fullWidth
            multiline
            rows={4} 
            sx={{ mt: 1 }}
            inputProps={{ 'aria-label': 'Deskripsi Ajakan Galang Dana' }}
          />
          {errors.golUkt && <Alert severity="error" sx={{ mt: 2 }}>{errors.golUkt}</Alert>}
          <Typography variant="body1" sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>
            Golongan UKT
          </Typography>
          <TextField
            select
            variant="outlined"
            size="small"
            label="Pilih Golongan UKT"
            value={golUkt}
            onChange={(e) => handleGolUkt(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
            inputProps={{ 'aria-label': 'Golongan UKT' }}
          >
            {golonganUKT.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {errors.kuitansiPembayaranUkt && <Alert severity="error" sx={{ mt: 2 }}>{errors.kuitansiPembayaranUkt}</Alert>}
          <Typography variant="body1" sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>
            Bukti Dokumen Golongan UKT
          </Typography>
          <TextField
            type="file"
            onChange={(e) => handleKuitansiPembayaranUkt(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
            inputProps={{ 'aria-label': 'Bukti Dokumen Golongan UKT', accept: '.pdf,.jpg,.jpeg,.png' }} // : Batasi jenis file
          />
          {errors.nominalPenghasilan && <Alert severity="error" sx={{ mt: 2 }}>{errors.nominalPenghasilan}</Alert>}
          <Typography variant="body1" sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>
            Biaya Penghasilan Orang Tua /Bulan
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            label="Gaji Orangtua / bulan (Rp)"
            value={nominalPenghasilan}
            onChange={(e) => handleNominalPenghasilan(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
            inputProps={{ 'aria-label': 'Biaya Penghasilan Orang Tua' }}
          />
          {errors.slipGaji && <Alert severity="error" sx={{ mt: 2 }}>{errors.slipGaji}</Alert>}
          <Typography variant="body1" sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>
            Bukti Dokumen Penghasilan Orang Tua
          </Typography>
          <TextField
            type="file"
            onChange={(e) => handleSlipGaji(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
            inputProps={{ 'aria-label': 'Bukti Dokumen Penghasilan Orang Tua', accept: '.pdf,.jpg,.jpeg,.png' }}
          />
          {errors.jumlahTanggungan && <Alert severity="error" sx={{ mt: 2 }}>{errors.jumlahTanggungan}</Alert>}
          <Typography variant="body1" sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>
            Jumlah Tanggungan Anggota Keluarga
          </Typography>
          <TextField
            select
            variant="outlined"
            size="small"
            label="Pilih Jumlah"
            value={jumlahTanggungan}
            onChange={(e) => handleJumlahTanggungan(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
            inputProps={{ 'aria-label': 'Jumlah Tanggungan Anggota Keluarga' }}
          >
            {tanggunganKeluarga.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Typography variant="body1" sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>
            Biaya Kebutuhan Perkuliahan
          </Typography>
          {errors.biayaKos && <Alert severity="error" sx={{ mt: 2 }}>{errors.biayaKos}</Alert>}
          <TextField
            variant="outlined"
            size="small"
            label="Biaya Kos / bulan (Rp)"
            value={biayaKos}
            onChange={(e) => handleBiayaKos(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
            inputProps={{ 'aria-label': 'Biaya Kos' }}
          />
          {errors.biayaInternet && <Alert severity="error" sx={{ mt: 2 }}>{errors.biayaInternet}</Alert>}
          <TextField
            variant="outlined"
            size="small"
            label="Biaya Internet / bulan (Rp)"
            value={biayaInternet}
            onChange={(e) => handleBiayaInternet(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
            inputProps={{ 'aria-label': 'Biaya Internet' }}
          />
          {errors.biayaKonsumsi && <Alert severity="error" sx={{ mt: 2 }}>{errors.biayaKonsumsi}</Alert>}
          <TextField
            variant="outlined"
            size="small"
            label="Biaya Pangan / bulan (Rp)"
            value={biayaKonsumsi}
            onChange={(e) => handleBiayaKonsumsi(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
            inputProps={{ 'aria-label': 'Biaya Pangan' }}
          />
          {errors.biayaTransportasi && <Alert severity="error" sx={{ mt: 2 }}>{errors.biayaTransportasi}</Alert>}
          <TextField
            variant="outlined"
            size="small"
            label="Biaya Transportasi / bulan (Rp)"
            value={biayaTransportasi}
            onChange={(e) => handleBiayaTransportasi(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
            inputProps={{ 'aria-label': 'Biaya Transportasi' }}
          />
          {errors.biayaPengeluaran && <Alert severity="error" sx={{ mt: 2 }}>{errors.biayaPengeluaran}</Alert>}
          <Typography variant="body1" sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>
            Biaya Pengeluaran Keluarga
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            label="Biaya Pengeluaran / bulan (Rp)"
            value={biayaPengeluaran}
            onChange={(e) => handleBiayaPengeluaran(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
            inputProps={{ 'aria-label': 'Biaya Pengeluaran Keluarga' }}
          />
          {errors.dokumenEsai && <Alert severity="error" sx={{ mt: 2 }}>{errors.dokumenEsai}</Alert>}
          <Typography variant="body1" sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>
            Dokumen Esai
          </Typography>
          <TextField
            type="file"
            onChange={(e) => handleDokumenEsai(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
            inputProps={{ 'aria-label': 'Dokumen Esai', accept: '.pdf' }} // Batasi hanya PDF untuk esai
          />
          <Box sx={{ display: 'flex', gap: 1, mt: 4 }}>
            <Button
              size="medium"
              variant="contained"
              sx={{ textTransform: 'capitalize' }}
              onClick={createPengajuanBeasiswa}
              disabled={isSubmitting} // : Nonaktifkan tombol saat submitting
            >
              {isSubmitting ? <CircularProgress size={24} /> : 'Submit'} {/* : Indikator loading */}
            </Button>
            <Button
              size="medium"
              variant="outlined"
              sx={{ textTransform: 'capitalize' }}
              onClick={() => setStep(0)}
              disabled={isSubmitting}
            >
              Sebelumnya
            </Button>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', py: 4, px: { xs: 2, md: 4 } }}>
      <Card sx={{ width: '100%', maxWidth: 1200, p: 3 }}>
        <CardContent>
          {step === 0 ? renderDataPribadiSection() : renderPersyaratanSection()}
        </CardContent>
      </Card>
    </Container>
  );
}

export default FormulirBeasiswa;
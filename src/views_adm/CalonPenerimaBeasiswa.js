// Komponen untuk menampilkan daftar calon penerima beasiswa dengan pencarian dan tabel
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Box, Container, Modal, Typography, MenuItem, Alert, AlertTitle } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

// Styling untuk sel tabel
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: { xs: 12, sm: 14 },
    padding: { xs: '8px', sm: '16px' },
    whiteSpace: 'nowrap',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: { xs: 12, sm: 14 },
    padding: { xs: '8px', sm: '16px' },
    whiteSpace: 'nowrap',
  },
}));

// Styling untuk baris tabel
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#E1F1FF',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function CalonPenerimaBeasiswa() {
  // State untuk data tabel, pencarian, dan UI
  const [dataTable, setDataTable] = React.useState([]);
  const [jenis, setJenis] = React.useState('Beasiswa');
  const [penilaianEsai, setPenilaianEsai] = React.useState('');
  const [approve, setApprove] = React.useState('true');
  const [status, setStatus] = React.useState('true');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [kuotaBeasiswa, setKuotaBeasiswa] = React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);

  // Handler untuk perubahan penilaian esai
  const handlePenilaianEsaiChange = (val) => {
    setPenilaianEsai(val);
    console.log('Penilaian esai changed:', val);
  };

  // Handler untuk pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handler untuk kuota beasiswa
  const handleChangeKuotaBeasiswa = (val) => {
    setKuotaBeasiswa(val);
  };

  // Handler untuk input pencarian
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setShowAlert(false); // Sembunyikan alert saat pengguna mengetik
  };

  // Fungsi untuk mengambil data dari backend
  const dataTableCalonBeasiswa = async () => {
    try {
      console.log('Fetching data with params:', { jenis, is_pengajuan: status, search: searchQuery });
      const response = await fetch('http://localhost:8000/v1/pengajuan/pengajuan_bantuan/getPengajuanBantuan', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          jenis: jenis,
          is_pengajuan: status,
          search: searchQuery,
        }),
      });
      const data = await response.json();
      console.log('Raw response:', data); // Log untuk debugging
      if (data.response_code === '00') {
        const fetchedData = data.data || [];
        setDataTable(fetchedData);
        setShowAlert(fetchedData.length === 0 && searchQuery !== '');
        console.log('Data fetched:', fetchedData);
      } else {
        console.error('Error fetching data:', data.response_message);
        setDataTable([]);
        setShowAlert(searchQuery !== '');
      }
    } catch (err) {
      console.error('Fetch error:', err.message);
      setDataTable([]);
      setShowAlert(searchQuery !== '');
    }
  };

  // Effect untuk memicu pencarian dengan debounce
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dataTableCalonBeasiswa();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, jenis, status]);

  // Fungsi untuk membuat penilaian esai
  const createPenilaianEsai = async (id, penilaianEsai) => {
    try {
      const response = await fetch('http://localhost:8000/v1/pengajuan/pengajuan_bantuan/createPenilaianEsai', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          id: id,
          penilaian_esai: penilaianEsai,
        }),
      });
      const data = await response.json();
      console.log('Penilaian esai created:', data.data);
    } catch (err) {
      console.error('Error creating penilaian esai:', err.message);
    }
  };

  // Fungsi untuk menyetujui pengajuan
  const approvePengajuanBeasiswa = async (id) => {
    try {
      const response = await fetch('http://localhost:8000/v1/pengajuan/pengajuan_bantuan/approvalPengajuanBeasiswa', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          id: id,
          is_approve: approve,
        }),
      });
      const data = await response.json();
      console.log('Approval response:', data.data);
    } catch (err) {
      console.error('Error approving pengajuan:', err.message);
    }
  };

  // Fungsi untuk membuat kuota beasiswa
  const createKuotaBeasiswa = async () => {
    try {
      const response = await fetch('http://localhost:8000/v1/pengajuan/pengajuan_bantuan/createKuotaBeasiswa', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          kuota_beasiswa: kuotaBeasiswa,
        }),
      });
      const data = await response.json();
      console.log('Kuota beasiswa created:', data.data);
    } catch (err) {
      console.error('Error creating kuota beasiswa:', err.message);
    }
  };

  // Effect untuk mengambil kuota beasiswa saat komponen dimuat
  React.useEffect(() => {
    const getKuotaBeasiswa = async () => {
      try {
        const response = await fetch('http://localhost:8000/v1/pengajuan/pengajuan_bantuan/getKuotaBeasiswa', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
        const data = await response.json();
        console.log('Kuota beasiswa:', data.data);
      } catch (err) {
        console.error('Error fetching kuota beasiswa:', err.message);
      }
    };
    getKuotaBeasiswa();
  }, []);

  // Opsi untuk dropdown penilaian esai
  const nilaiEsai = [
    { label: 'Kurang', value: 'Kurang' },
    { label: 'Cukup', value: 'Cukup' },
    { label: 'Baik', value: 'Baik' },
    { label: 'Sangat Baik', value: 'SangatBaik' },
  ];

  // Definisi kolom tabel
  const headers = [
    { title: 'NIM', id: 'nim', parentId: 'mahasiswa' },
    { title: 'Nama', id: 'nama', parentId: 'mahasiswa' },
    { title: 'No Telepon', id: 'nomor_telepon', parentId: 'mahasiswa' },
    { title: 'Golongan UKT', id: 'golongan_ukt' },
    { title: 'Dokumen Golongan UKT', id: 'kuitansi_pembayaran_ukt' },
    { title: 'Gaji Orang Tua', id: 'gaji_orang_tua' },
    { title: 'Dokumen Slip Gaji', id: 'bukti_slip_gaji_orang_tua' },
    { title: 'Jumlah Tanggungan Keluarga', id: 'jumlah_tanggungan_keluarga' },
    { title: 'Dokumen Esai', id: 'esai' },
    { title: 'Penilaian Esai', id: 'penilaian_esai' },
    { title: 'Biaya Pengeluaran Keluarga', id: 'total_pengeluaran_keluarga' },
    { title: 'Biaya Transportasi', id: 'biaya_transportasi' },
    { title: 'Biaya Konsumsi', id: 'biaya_konsumsi' },
    { title: 'Biaya Internet', id: 'biaya_internet' },
    { title: 'Biaya Kos', id: 'biaya_kos' },
    { title: 'Status', id: 'status_pengajuan' },
  ];

  // Styling untuk modal
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: { xs: 2, sm: 4 },
    width: { xs: '90%', sm: 400 },
    borderRadius: '4px',
  };

  const styleBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 500 },
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '4px 4px 4px 4px',
    maxHeight: '90vh',
    overflowY: 'auto',
  };

  // State untuk modal
  const [openModalKuota, setOpenModalKuota] = React.useState(false);
  const handleOpenModalKuota = () => setOpenModalKuota(true);
  const handleCloseModalKuota = () => setOpenModalKuota(false);

  const [openModalUkt, setOpenModalUkt] = React.useState(false);
  const handleOpenModalUkt = () => setOpenModalUkt(true);
  const handleCloseModalUkt = () => setOpenModalUkt(false);

  const [openModalSlipGaji, setOpenModalSlipGaji] = React.useState(false);
  const handleOpenModalSlipGaji = () => setOpenModalSlipGaji(true);
  const handleCloseModalSlipGaji = () => setOpenModalSlipGaji(false);

  const [openModalEsai, setOpenModalEsai] = React.useState(false);
  const handleOpenModalEsai = () => setOpenModalEsai(true);
  const handleCloseModalEsai = () => setOpenModalEsai(false);

  return (
    <Container
      disableGutters
      maxWidth="xl"
      sx={{
        width: '100%',
        minHeight: '100vh',
        p: { xs: 1, sm: 2 },
      }}
    >
      {/* Header halaman */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          padding: { xs: 1, sm: 2 },
          backgroundColor: '#1559E6',
          color: 'white',
          borderRadius: '4px',
          gap: 1,
        }}
      >
        <PeopleAltIcon fontSize="small" />
        <Typography variant="h4" sx={{ ml: { xs: 0, sm: 1 }, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Daftar Calon Penerima Bantuan Dana Beasiswa
        </Typography>
      </Box>
      {/* Kolom pencarian dan tombol seleksi */}
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', sm: 'auto' }, gap: 1 }}>
          <TextField
            size="small"
            label="Cari berdasarkan NIM atau Nama"
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ minWidth: { xs: '100%', sm: 350 } }}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
          {showAlert && (
            <Alert severity="info" onClose={() => setShowAlert(false)} sx={{ mt: 1 }}>
              <AlertTitle>Informasi</AlertTitle>
              Data tidak ditemukan untuk NIM atau nama yang dicari.
            </Alert>
          )}
        </Box>
        <Box>
          <Button
            variant="contained"
            onClick={handleOpenModalKuota}
            size="small"
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Seleksi Beasiswa
          </Button>
          <Modal open={openModalKuota} onClose={handleCloseModalKuota}>
            <Box sx={style}>
              <Typography variant="h6" sx={{ mb: 2, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Masukkan Kuota Beasiswa
              </Typography>
              <TextField
                variant="outlined"
                label="cth: 6"
                onChange={(val) => handleChangeKuotaBeasiswa(val.target.value)}
                fullWidth
                size="small"
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                <Button
                  variant="contained"
                  onClick={createKuotaBeasiswa}
                  size="small"
                  sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCloseModalKuota}
                  size="small"
                  sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                  Tutup
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
      {/* Tabel data */}
      <Box sx={{ mt: 2 }}>
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: { xs: 'auto', sm: 700 } }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                {headers.map((header) => (
                  <StyledTableCell key={header.id} sx={{ textAlign: 'center' }}>
                    {header.title}
                  </StyledTableCell>
                ))}
                <StyledTableCell sx={{ textAlign: 'center' }}>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataTable.length > 0 ? (
                dataTable.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <StyledTableRow key={row.bantuan_dana_beasiswa_id || index}>
                    <StyledTableCell>{page * rowsPerPage + index + 1}</StyledTableCell>
                    {headers.map((header) => (
                      <StyledTableCell key={header.id} sx={{ textAlign: 'center' }}>
                        {header.id === 'penilaian_esai' ? (
                          <TextField
                            select
                            variant="outlined"
                            size="small"
                            label="Masukkan nilai"
                            sx={{ width: { xs: 120, sm: 150 } }}
                            onChange={(val) => createPenilaianEsai(row.bantuan_dana_beasiswa_id, val.target.value)}
                            defaultValue={row.penilaian_esai || ''}
                          >
                            {nilaiEsai.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        ) : header.id === 'kuitansi_pembayaran_ukt' ? (
                          <>
                            <Button onClick={handleOpenModalUkt} size="small">
                              <u style={{ textTransform: 'capitalize' }}>Details</u>
                            </Button>
                            <Modal open={openModalUkt} onClose={handleCloseModalUkt}>
                              <Box sx={styleBox}>
                                <Box sx={{ backgroundColor: '#1559E6', borderRadius: '4px 4px 0 0', p: 2 }}>
                                  <Typography
                                    variant="h3"
                                    color="white"
                                    sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
                                  >
                                    Bukti Struk Pembayaran
                                  </Typography>
                                </Box>
                                <Box sx={{ p: 2 }}>{row.kuitansi_pembayaran_ukt || 'Tidak ada dokumen'}</Box>
                              </Box>
                            </Modal>
                          </>
                        ) : header.id === 'bukti_slip_gaji_orang_tua' ? (
                          <>
                            <Button onClick={handleOpenModalSlipGaji} size="small">
                              <u style={{ textTransform: 'capitalize' }}>Details</u>
                            </Button>
                            <Modal open={openModalSlipGaji} onClose={handleCloseModalSlipGaji}>
                              <Box sx={styleBox}>
                                <Box sx={{ backgroundColor: '#1559E6', borderRadius: '4px 4px 0 0', p: 2 }}>
                                  <Typography
                                    variant="h3"
                                    color="white"
                                    sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
                                  >
                                    Bukti Slip Gaji Orang Tua
                                  </Typography>
                                </Box>
                                <Box sx={{ p: 2 }}>{row.bukti_slip_gaji_orang_tua || 'Tidak ada dokumen'}</Box>
                              </Box>
                            </Modal>
                          </>
                        ) : header.id === 'esai' ? (
                          <>
                            <Button onClick={handleOpenModalEsai} size="small">
                              <u style={{ textTransform: 'capitalize' }}>Details</u>
                            </Button>
                            <Modal open={openModalEsai} onClose={handleCloseModalEsai}>
                              <Box sx={styleBox}>
                                <Box sx={{ backgroundColor: '#1559E6', borderRadius: '4px 4px 0 0', p: 2 }}>
                                  <Typography
                                    variant="h3"
                                    color="white"
                                    sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
                                  >
                                    Dokumen Esai
                                  </Typography>
                                </Box>
                                <Box sx={{ p: 2 }}>{row.esai || 'Tidak ada dokumen'}</Box>
                              </Box>
                            </Modal>
                          </>
                        ) : header.id === 'status_pengajuan' ? (
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            disabled
                            sx={{ backgroundColor: '#CFACAD', px: { xs: 1, sm: 2 } }}
                          >
                            <Typography
                              style={{ textTransform: 'capitalize', color: '#A30D11', fontSize: { xs: 10, sm: 12 } }}
                            >
                              {row.status_pengajuan || 'Pending'}
                            </Typography>
                          </Button>
                        ) : (
                          <span>
                            {header?.parentId ? row?.[header.parentId]?.[header.id] ?? '-' : row?.[header.id] ?? '-'}
                          </span>
                        )}
                      </StyledTableCell>
                    ))}
                    <StyledTableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button
                        onClick={() => approvePengajuanBeasiswa(row.bantuan_dana_beasiswa_id)}
                        size="small"
                      >
                        <TaskAltIcon sx={{ mr: { xs: 0, sm: 1 } }} color="primary" />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={headers.length + 2} sx={{ textAlign: 'center' }}>
                    Tidak ada data untuk ditampilkan
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={dataTable.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ mt: 1, '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { fontSize: { xs: 12, sm: 14 } } }}
        />
      </Box>
    </Container>
  );
}

export default CalonPenerimaBeasiswa;

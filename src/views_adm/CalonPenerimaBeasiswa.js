import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TableAdmin from '../components/molekul/tabel/Tabel';
import { styled } from '@mui/material/styles';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Box, Checkbox, Container, Modal, Typography, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ButtonBase from '../components/base/Button';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

// : Styling tabel untuk ponsel dan desktop
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#E1F1FF',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function CalonPenerimaBeasiswa() {
  const [dataTable, setDataTable] = React.useState([]);
  const [jenis, setJenis] = React.useState('Beasiswa');
  const [id, setId] = React.useState('');
  const [penilaianEsai, setPenilaianEsai] = React.useState('');
  const [approve, setApprove] = React.useState('true');
  const [status, setStatus] = React.useState('true');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [kuotaBeasiswa, setKuotaBeasiswa] = React.useState('');

  const handlePenilaianEsaiChange = (val) => {
    setPenilaianEsai(val);
    console.log(val);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeKuotaBeasiswa = (val) => {
    setKuotaBeasiswa(val);
  };

  React.useEffect(() => {
    const dataTableCalonBeasiswa = async () => {
      await fetch('http://localhost:8000/v1/pengajuan/pengajuan_bantuan/getPengajuanBantuan', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          jenis: jenis,
          is_pengajuan: status,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          let arrayData = [];
          for (let i = 0; i < data.data.length; i++) {
            arrayData.push(data.data[i]);
          }
          setDataTable(arrayData);
          console.log(arrayData);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    dataTableCalonBeasiswa();
  }, []);

  const createPenilaianEsai = async (id, penilaianEsai) => {
    await fetch('http://localhost:8000/v1/pengajuan/pengajuan_bantuan/createPenilaianEsai', {
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
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
      });
  };

  const approvePengajuanBeasiswa = async (id) => {
    await fetch('http://localhost:8000/v1/pengajuan/pengajuan_bantuan/approvalPengajuanBeasiswa', {
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
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
      });
  };

  const createKuotaBeasiswa = async () => {
    await fetch('http://localhost:8000/v1/pengajuan/pengajuan_bantuan/createKuotaBeasiswa', {
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
  };

  React.useEffect(() => {
    const getKuotaBeasiswa = async () => {
      await fetch('http://localhost:8000/v1/pengajuan/pengajuan_bantuan/getKuotaBeasiswa', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data + 'coba');
        });
    };
    getKuotaBeasiswa();
  }, []);

  const nilaiEsai = [
    { label: 'Kurang', value: 'Kurang' },
    { label: 'Cukup', value: 'Cukup' },
    { label: 'Baik', value: 'Baik' },
    { label: 'Sangat Baik', value: 'SangatBaik' },
  ];

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
    overflowY: 'auto', // : Scroll jika konten panjang
  };

  const [openModalKuota, setOpenModalKuota] = React.useState(false);
  const handleOpenModalKuota = () => {
    setOpenModalKuota(true);
  };
  const handleCloseModalKuota = () => {
    setOpenModalKuota(false);
  };

  const [openModalUkt, setOpenModalUkt] = React.useState(false);
  const handleOpenModalUkt = () => {
    setOpenModalUkt(true);
  };
  const handleCloseModalUkt = () => {
    setOpenModalUkt(false);
  };

  const [openModalSlipGaji, setOpenModalSlipGaji] = React.useState(false);
  const handleOpenModalSlipGaji = () => {
    setOpenModalSlipGaji(true);
  };
  const handleCloseModalSlipGaji = () => {
    setOpenModalSlipGaji(false);
  };

  const [openModalEsai, setOpenModalEsai] = React.useState(false);
  const handleOpenModalEsai = () => {
    setOpenModalEsai(true);
  };
  const handleCloseModalEesai = () => {
    setOpenModalEsai(false);
  };

  console.log(headers);

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
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, // : Responsif untuk pencarian dan tombol
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: { xs: '100%', sm: 'auto' } }}>
          <TextField
            size="small"
            label="Search"
            type="search"
            sx={{ minWidth: { xs: '100%', sm: 350 } }} // : Lebar responsif untuk pencarian
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
        </Box>
        <Box>
          <Button
            variant="contained"
            onClick={handleOpenModalKuota}
            size="small" // : Ukuran tombol kecil di ponsel
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
              {dataTable.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  {Object.entries(headers).map(([key, val]) => (
                    <StyledTableCell key={val.id} sx={{ textAlign: 'center' }}>
                      {val.id === 'penilaian_esai' ? (
                        <TextField
                          select
                          variant="outlined"
                          size="small"
                          label="Masukkan nilai"
                          sx={{ width: { xs: 120, sm: 150 } }} 
                          onChange={(val) => createPenilaianEsai(row.bantuan_dana_beasiswa_id, val.target.value)}
                        >
                          {nilaiEsai.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      ) : val.id === 'kuitansi_pembayaran_ukt' ? (
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
                              <Box sx={{ p: 2 }}>{row.kuitansi_pembayaran_ukt}</Box>
                            </Box>
                          </Modal>
                        </>
                      ) : val.id === 'bukti_slip_gaji_orang_tua' ? (
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
                              <Box sx={{ p: 2 }}>{row.bukti_slip_gaji_orang_tua}</Box>
                            </Box>
                          </Modal>
                        </>
                      ) : val.id === 'esai' ? (
                        <>
                          <Button onClick={handleOpenModalEsai} size="small">
                            <u style={{ textTransform: 'capitalize' }}>Details</u>
                          </Button>
                          <Modal open={openModalEsai} onClose={handleCloseModalEesai}>
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
                              <Box sx={{ p: 2 }}>{row.esai}</Box>
                            </Box>
                          </Modal>
                        </>
                      ) : val.id === 'status_pengajuan' ? (
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
                            Pending
                          </Typography>
                        </Button>
                      ) : (
                        <span>{val?.parentId ? row?.[val.parentId]?.[val.id] : row?.[val.id]}</span>
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
              ))}
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
          sx={{ mt: 1, '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { fontSize: { xs: 12, sm: 14 } } }} // : Teks responsif
        />
      </Box>
    </Container>
  );
}

export default CalonPenerimaBeasiswa;
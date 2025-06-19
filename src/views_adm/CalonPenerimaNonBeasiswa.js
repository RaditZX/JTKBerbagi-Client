import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { useState, useEffect } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { red } from '@mui/material/colors';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

function CalonPenerimaNonBeasiswa() {
  const styleBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '4px 4px 4px 4px',
  };

  const [openModal, setOpenModal] = useState(false);
  const [jenisBantuan, setJenisBantuan] = useState('NonBeasiswa');
  const [kategori, setKategori] = useState('Semua Kategori');
  const [dataTable, setDataTable] = useState([]);
  const [status, setStatus] = useState('true');
  const [pengajuan, setPengajuan] = useState('true');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenDeleteDialog = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteId(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleKategoriChange = (val) => {
    setKategori(val);
    console.log(val);
    if (val === 'Semua Kategori') {
      getPengajuanBantuan();
    } else {
      getPengajuanNonBeasiswaByKategori(val);
    }
  };

  const listKategori = [
    { label: 'Semua Kategori', value: 'Semua Kategori' },
    { label: 'Medis', value: 'Medis' },
    { label: 'Bencana', value: 'Bencana' },
    { label: 'Duka', value: 'Duka' },
  ];

  const getPengajuanBantuan = async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/v1/pengajuan/pengajuan_bantuan/getPengajuanBantuan',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jenis: jenisBantuan,
            is_pengajuan: pengajuan,
          }),
        }
      );
      const data = await response.json();
      
      if (data.data) {
        setDataTable(data.data);
        console.log('Data received:', data.data);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setSnackbar({ open: true, message: 'Gagal mengambil data', severity: 'error' });
    }
  };

  const getPengajuanNonBeasiswaByKategori = async (selectedKategori) => {
    try {
      const response = await fetch(
        'http://localhost:8000/v1/pengajuan/pengajuan_bantuan/getNonBeasiswaByKategori',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            kategori: selectedKategori,
            is_pengajuan: pengajuan,
          }),
        }
      );
      const data = await response.json();
      
      if (data.data) {
        setDataTable(data.data);
        console.log('Filtered data:', data.data);
      }
    } catch (err) {
      console.error('Error fetching filtered data:', err);
      setSnackbar({ open: true, message: 'Gagal mengambil data berdasarkan kategori', severity: 'error' });
    }
  };

  const approvalPengajuanNonBeasiswa = async (id) => {
    try {
      const response = await fetch(
        'http://localhost:8000/v1/pengajuan/pengajuan_bantuan/approvalPengajuanNonBeasiswa',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
            is_approve: status,
          }),
        }
      );
      const text = await response.text();
      console.log('Approval response text:', text);
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Invalid JSON response:', e);
        setSnackbar({ open: true, message: 'Respons server tidak valid', severity: 'error' });
        return;
      }
      
      if (response.ok && data.response_code === 'success') {
        if (kategori === 'Semua Kategori') {
          getPengajuanBantuan();
        } else {
          getPengajuanNonBeasiswaByKategori(kategori);
        }
        setSnackbar({ open: true, message: 'Pengajuan berhasil disetujui', severity: 'success' });
      } else {
        setSnackbar({ open: true, message: data.response_message || 'Gagal menyetujui pengajuan', severity: 'error' });
      }
    } catch (err) {
      console.error('Error approving:', err);
      setSnackbar({ open: true, message: 'Gagal menyetujui pengajuan: ' + err.message, severity: 'error' });
    }
  };

  const deletePengajuanNonBeasiswa = async (id) => {
    try {
      console.log('Sending DELETE request with ID:', id);
      const response = await fetch(
        'http://localhost:8000/v1/pengajuan/pengajuan_bantuan/deletePengajuanNonBeasiswa',
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
          }),
        }
      );

      console.log('Response status:', response.status);
      const text = await response.text();
      console.log('Delete response text:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Invalid JSON response:', e);
        let errorMessage = 'Respons server tidak valid';
        if (response.status === 404) {
          errorMessage = 'Endpoint tidak ditemukan. Silakan periksa konfigurasi server.';
        }
        setSnackbar({ open: true, message: errorMessage, severity: 'error' });
        return;
      }

      if (response.ok && data.response_code === 'success') {
        if (kategori === 'Semua Kategori') {
          getPengajuanBantuan();
        } else {
          getPengajuanNonBeasiswaByKategori(kategori);
        }
        handleCloseDeleteDialog();
        setSnackbar({ open: true, message: data.data.message, severity: 'success' });
      } else {
        setSnackbar({ open: true, message: data.response_message || 'Gagal menghapus pengajuan', severity: 'error' });
      }
    } catch (err) {
      console.error('Error deleting data:', err);
      setSnackbar({ open: true, message: 'Gagal menghapus pengajuan: ' + err.message, severity: 'error' });
    }
  };

  useEffect(() => {
    getPengajuanBantuan();
  }, [jenisBantuan]);

  const headers = [
    { title: 'NIM/NIP Penanggung Jawab', id: 'nomor_induk', parentId: 'penanggung_jawab_non_beasiswa_id' },
    { title: 'Nama Penanggung Jawab', id: 'nama', parentId: 'penanggung_jawab_non_beasiswa_id' },
    { title: 'No Telepon Penanggung Jawab', id: 'nomor_telepon', parentId: 'penanggung_jawab_non_beasiswa_id' },
    { title: 'NIM/NIP Penerima Dana Bantuan', id: 'nomor_induk', parentId: 'penerima_non_beasiswa' },
    { title: 'Nama Penerima Dana Bantuan', id: 'nama', parentId: 'penerima_non_beasiswa' },
    { title: 'No Telepon Penerima Dana Bantuan', id: 'nomor_telepon', parentId: 'penerima_non_beasiswa' },
    { title: 'Kategori', id: 'kategori' },
    { title: 'Judul Bantuan', id: 'judul_galang_dana' },
    { title: 'Dana yang Dibutuhkan', id: 'dana_yang_dibutuhkan' },
    { title: 'Bukti Butuh Bantuan', id: 'bukti_butuh_bantuan' },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        width: '100%',
        height: '100%',
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          padding: 2,
          backgroundColor: '#1559E6',
          color: 'white',
          borderRadius: '4px',
          alignItems: 'center',
        }}
      >
        <PeopleAltIcon fontSize="small" />
        <Typography variant="h4" sx={{ ml: 1 }}>
          Daftar Calon Penerima Bantuan Dana Non Beasiswa
        </Typography>
      </Box>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          size="small"
          label="Search"
          type="search"
          sx={{ minWidth: 350 }}
        />
        <TextField
          select
          variant="outlined"
          size="small"
          label="Pilih kategori"
          value={kategori}
          onChange={(e) => handleKategoriChange(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {listKategori.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ mt: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                {headers.map((header, index) => (
                  <StyledTableCell key={index} sx={{ textAlign: 'center' }}>
                    {header.title}
                  </StyledTableCell>
                ))}
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataTable
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    {headers.map((header, headerIndex) => (
                      <StyledTableCell
                        key={headerIndex}
                        sx={{ textAlign: 'center' }}
                      >
                        {header.id === 'bukti_butuh_bantuan' ? (
                          <Button onClick={handleOpenModal}>
                            <u style={{ textTransform: 'capitalize' }}>Details</u>
                          </Button>
                        ) : (
                          <span>
                            {header.parentId
                              ? row?.[header.parentId]?.[header.id]
                              : row?.[header.id]}
                          </span>
                        )}
                      </StyledTableCell>
                    ))}
                    <StyledTableCell sx={{ display: 'flex', py: 5 }}>
                      <Button
                        onClick={() =>
                          approvalPengajuanNonBeasiswa(
                            row.bantuan_dana_non_beasiswa_id
                          )
                        }
                      >
                        <TaskAltIcon sx={{ mr: 1 }} color="primary" />
                      </Button>
                      <Button
                        onClick={() =>
                          handleOpenDeleteDialog(row.bantuan_dana_non_beasiswa_id)
                        }
                      >
                        <DeleteOutlineIcon sx={{ color: red[500] }} />
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
        />
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleBox}>
          <Box
            sx={{
              backgroundColor: '#1559E6',
              borderRadius: '4px 4px 0 0',
              p: 2,
            }}
          >
            <Typography variant="h6" color="white">
              Bukti Butuh Bantuan
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <Typography>Detail bukti bantuan akan ditampilkan di sini</Typography>
          </Box>
        </Box>
      </Modal>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah Anda yakin ingin menghapus pengajuan ini? Tindakan ini tidak
            dapat dibatalkan.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Batal</Button>
          <Button
            onClick={() => deletePengajuanNonBeasiswa(deleteId)}
            color="error"
            autoFocus
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default CalonPenerimaNonBeasiswa;
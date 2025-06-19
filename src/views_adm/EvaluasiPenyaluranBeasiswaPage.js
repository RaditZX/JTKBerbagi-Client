import React, { useState, useEffect, useCallback } from 'react';
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
import DescriptionIcon from '@mui/icons-material/Description';
import { Box, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useDropzone } from 'react-dropzone';
import TablePagination from '@mui/material/TablePagination';
import MenuItem from '@mui/material/MenuItem'; // Impor yang hilang ditambahkan

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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

function EvaluasiPenyaluranBeasiswaPage() {
  const [evaluasiData, setEvaluasiData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedNIM, setSelectedNIM] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle file upload with dropzone
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
  });

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  // Fetch data from GET /evaluasipenyaluranbeasiswa
  const fetchEvaluasiData = async () => {
    try {
      const response = await fetch('http://localhost:8000/v1/evaluasipenyaluranbeasiswa', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      const data = await response.json();
      setEvaluasiData(data.data || []);
    } catch (error) {
      console.error('Error fetching evaluasi data:', error);
    }
  };

  useEffect(() => {
    fetchEvaluasiData();
  }, []);

  // Handle form submission to POST /evaluasipenyaluranbeasiswa
  const handleSubmit = async () => {
    if (!selectedNIM || !selectedReason || files.length === 0) {
      alert('Please fill all fields and upload a file.');
      return;
    }

    const formData = new FormData();
    formData.append('nim', selectedNIM);
    formData.append('alasan', selectedReason);
    formData.append('file', files[0]);

    try {
      const response = await fetch('http://localhost:8000/v1/evaluasipenyaluranbeasiswa', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert('Evaluation submitted successfully!');
        handleCloseModal();
        fetchEvaluasiData(); // Refresh data after submission
      } else {
        alert('Failed to submit evaluation: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting evaluation:', error);
      alert('An error occurred while submitting.');
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedNIM('');
    setSelectedReason('');
    setFiles([]);
  };

  const headers = [
    { title: 'NIM', id: 'nim' },
    { title: 'Nama', id: 'nama' },
    { title: 'Alasan', id: 'alasan' },
    { title: 'File', id: 'file_url' },
    { title: 'Status', id: 'status' },
    { title: 'Tanggal Pengajuan', id: 'created_at' },
  ];

  return (
    <Container disableGutters maxWidth={false} sx={{ width: '100%', height: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', padding: 2, backgroundColor: '#1559E6', color: 'white', borderRadius: '4px', alignItems: 'center' }}>
        <DescriptionIcon />
        <Typography variant='h4' sx={{ ml: 1 }}>Evaluasi Penyaluran Beasiswa</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleOpenModal} sx={{ mb: 2 }}>
          Tambah Evaluasi
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <StyledTableCell sx={{ textAlign: 'center' }}>{header.title}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {evaluasiData
                .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                .map((row, index) => (
                  <StyledTableRow key={index}>
                    {headers.map((header) => (
                      <StyledTableCell sx={{ textAlign: 'center' }}>
                        {row[header.id] || '-'}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={evaluasiData.length}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button onClick={handleCloseModal}>✕</Button>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            backgroundColor: '#1559e6', 
            p: 2, 
            borderRadius: 1 
          }}>
            <Typography 
              id="modal-modal-title" 
              variant="h4" 
              align='center'
              component="h1" 
              sx={{ color: '#ffffff', alignItems: 'center' }}
            >
              Evaluasi Penyaluran Beasiswa
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              select
              fullWidth
              label="NIM"
              value={selectedNIM}
              onChange={(e) => setSelectedNIM(e.target.value)}
              sx={{ mb: 2 }}
            >
              {['23151038', '23151039', '23151040'].map((nim) => (
                <MenuItem key={nim} value={nim}>{nim}</MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Nama"
              value={selectedNIM ? 'Daffa Al Ghifari' : ''} // Dummy data, replace with actual mapping if needed
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              select
              fullWidth
              label="Alasan"
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="Alpha Melebihi Batas">Alpha Melebihi Batas</MenuItem>
              <MenuItem value="Mendapatkan Surat Peringatan">Mendapatkan Surat Peringatan</MenuItem>
              <MenuItem value="Keluar/Dikeluarkan dari Kampus">Keluar/Dikeluarkan dari Kampus</MenuItem>
            </TextField>
            <Box
              {...getRootProps()}
              sx={{
                border: '1px dashed #ccc',
                borderRadius: '4px',
                p: 2,
                textAlign: 'center',
                mb: 2,
                backgroundColor: isDragActive ? '#e1f0ff' : 'transparent',
                cursor: 'pointer',
              }}
            >
              <input {...getInputProps()} />
              {files.length > 0 ? (
                <Typography>{files[0].name} (Uploaded)</Typography>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  {isDragActive ? 'Drop the file here...' : 'Drag & drop a file to attach it, or click to browse'}
                </Typography>
              )}
            </Box>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={files.length === 0}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

export default EvaluasiPenyaluranBeasiswaPage;
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SidebarAdmin from "../components/molekul/sidebar/SidebarAdmin";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import DescriptionIcon from "@mui/icons-material/Description";
import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { red } from "@mui/material/colors";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TablePagination from "@mui/material/TablePagination";
import Modal from "@mui/material/Modal";

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
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const dialogStyle = {
  '& .MuiDialog-paper': {
    borderRadius: '8px',
  },
};

function LaporanRekapitulasiBeasiswa() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataTableDonatur, setDataTableDonatur] = useState([]);
  const [dataTablePenerima, setDataTablePenerima] = useState([]);
  const [monthArray, setMonthArray] = useState([]);
  const [indexMonth, setIndexMonth] = useState([]);
  const [status, setStatus] = useState('true');
  const [nominal, setNominal] = useState('');
  const [nominalError, setNominalError] = useState('');
  const [id, setId] = useState('');
  const [infoDana, setInfoDana] = useState([]);
  const [jenis, setJenis] = useState('Beasiswa');
  const [bulanPenyaluran, setBulanPenyaluran] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openSisaSaldoDialog, setOpenSisaSaldoDialog] = useState(false);
  const [selectedPenerima, setSelectedPenerima] = useState(null);
  const [sisaSaldo, setSisaSaldo] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleNominalChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value >= 0) {
      setNominal(value);
      setNominalError('');
    } else {
      setNominalError('Nominal harus berupa angka positif');
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [batch, setBatch] = useState([]);

  const handleChange = (event) => {
    setBatch(event.target.value);
  };

  const handleOpenModal = (penerima) => {
    setSelectedPenerima(penerima);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPenerima(null);
    setNominal('');
    setNominalError('');
  };

  const handleOpenSisaSaldoDialog = () => {
    if (selectedPenerima && nominal) {
      const totalDibutuhkan = selectedPenerima.total_dana_dibutuhkan || 0;
      const totalDisalurkanLama = selectedPenerima.nominal_penyaluran[bulanPenyaluran - 1] || 0;
      const totalDisalurkanBaru = totalDisalurkanLama + parseInt(nominal || 0);
      const sisa = totalDibutuhkan - totalDisalurkanBaru;
      setSisaSaldo(sisa > 0 ? sisa : 0);
      setOpenSisaSaldoDialog(true);
    }
  };

  const handleCloseSisaSaldoDialog = () => {
    setOpenSisaSaldoDialog(false);
  };

  const handleSalurkanDana = () => {
    if (selectedPenerima && !nominalError && nominal) {
      handleOpenSisaSaldoDialog();
    } else if (!nominal) {
      setNominalError('Nominal tidak boleh kosong');
    }
  };

  const handleConfirmSalurkanDana = () => {
    if (selectedPenerima && nominal) {
      // Simulasi pembaruan data (harus diperbarui via API di aplikasi nyata)
      const updatedPenerima = [...dataTablePenerima];
      const index = updatedPenerima.findIndex(p => p === selectedPenerima);
      const totalDisalurkanLama = selectedPenerima.nominal_penyaluran[bulanPenyaluran - 1] || 0;
      updatedPenerima[index] = {
        ...selectedPenerima,
        nominal_penyaluran: [
          ...selectedPenerima.nominal_penyaluran.slice(0, bulanPenyaluran - 1),
          totalDisalurkanLama + parseInt(nominal),
          ...selectedPenerima.nominal_penyaluran.slice(bulanPenyaluran),
        ],
      };
      setDataTablePenerima(updatedPenerima);

      selectPenyaluranDanaBeasiswa(selectedPenerima.bantuan_dana_beasiswa_id);
      handleCloseSisaSaldoDialog();
      handleCloseModal();
    }
  };

  const headers = [
    { title: 'Nama Donatur', id: 'nama', parentId: 'donatur_id' },
    { title: 'Nomor Telepon', id: 'nomor_telepon', parentId: 'donatur_id' },
    { title: 'Nominal Donasi (Rp)', id: 'nominal_donasi' },
    { title: 'Nomor Referensi', id: 'nomor_referensi' },
    { title: 'Bukti Transfer', id: 'struk_pembayaran' },
    { title: 'Status', id: 'status' },
  ];

  const headers2 = [
    { title: 'NIM', id: 'nim', parentId: 'mahasiswa' },
    { title: 'Nama', id: 'nama', parentId: 'mahasiswa' },
    { title: 'Nomor Telepon', id: 'nomor_telepon', parentId: 'mahasiswa' },
    { title: 'Nomor Rekening', id: 'nomor_rekening', parentId: 'rekening_bank' },
    { title: 'Nama Bank', id: 'nama_bank', parentId: 'rekening_bank' },
    { title: 'Nama Pemilik Rekening', id: 'nama_pemilik_rekening', parentId: 'rekening_bank' },
    { title: 'Total Dana Dibutuhkan (Rp)', id: 'total_dana_dibutuhkan' },
    { title: 'Total Dana Disalurkan (Rp)', id: 'nominal_penyaluran' },
    { title: 'Status Beasiswa', id: 'status' },
    { title: 'Alasan', id: 'alasan' },
  ];

  useEffect(() => {
    const getAllPenggalanganDana = async () => {
      await fetch(
        'http://localhost:8000/v1/penggalangan/penggalangan_dana/getAllPenggalanganDana',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setId(data.data[0].penggalangan_dana_id);
        });
    };
    getAllPenggalanganDana();
  }, []);

  useEffect(() => {
    const getAllBatchRekapitulasiBeasiswa = async () => {
      await fetch(
        'http://localhost:8000/v1/rekapitulasi/getAllBatchRekapitulasiBeasiswa',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          let arrayBatch = [];
          for (let i = 0; i < data.data.length; i++) {
            arrayBatch.push({
              label: i + 1,
              value: data.data[i],
            });
          }
          setBatch(arrayBatch);
        });
    };
    getAllBatchRekapitulasiBeasiswa();
  }, []);

  const getBulanRekapitulasiBeasiswa = async (batch) => {
    await fetch(
      'http://localhost:8000/v1/rekapitulasi/getBulanRekapitulasiBeasiswa',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          id: batch,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        let arrayMonth = [];
        for (let i = 0; i < data.data.length; i++) {
          arrayMonth.push({
            name: data.data[i],
            value: data.data[i],
            index: i,
          });
        }
        setMonthArray(arrayMonth);
      });
  };

  const getRekapitulasiBeasiswa = async (monthSelect) => {
    const startBulanPenyaluran = monthArray?.[5]?.name;
    const aprilMonthIndex = monthArray?.find(
      (month) => month?.name === startBulanPenyaluran
    )?.index;
    let aprilMonthToNow = monthArray?.filter(
      (month, index) => index >= aprilMonthIndex
    );
    let monthLeft = monthArray?.filter(
      (month) => !aprilMonthToNow.includes(month)
    );
    aprilMonthToNow.push(...monthLeft);
    let fixedMonthArray = aprilMonthToNow.map((month, index) => ({
      ...month,
      index,
    }));
    fixedMonthArray?.map((month) => {
      const monthName = month?.name;
      if (monthName === monthSelect) {
        setBulanPenyaluran(month.index);
      }
    });
    await fetch(
      'http://localhost:8000/v1/rekapitulasi/getRekapitulasiBeasiswa',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          id: id,
          month: monthSelect,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        let arrayPenerima = [];
        let arrayDonatur = [];
        let arrayDana = [];
        for (let i = 0; i < data.data.penerima_beasiswa.length; i++) {
          arrayPenerima.push(data.data.penerima_beasiswa[i]);
        }
        for (let i = 0; i < data.data.rekapitulasi_donasi.length; i++) {
          arrayDonatur.push(data.data.rekapitulasi_donasi[i]);
        }
        arrayDana.push(data.data.rekapitulasi_dana);
        setInfoDana(arrayDana);
        setDataTablePenerima(arrayPenerima);
        setDataTableDonatur(arrayDonatur);
      });
  };

  const selectPenyaluranDanaBeasiswa = async (id) => {
    await fetch(
      'http://localhost:8000/v1/rekapitulasi/selectPenyaluranBeasiswa',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          is_penyaluran: status,
          id: id,
          nominal_penyaluran: nominal,
          bulan_penyaluran: bulanPenyaluran,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        let arrayData = [];
        arrayData.push(data.data.nominal_penyaluran);
      })
      .catch((err) => {
        console.log(err.message);
      });
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
        <DescriptionIcon />
        <Typography variant="h4" sx={{ ml: 1 }}>
          Laporan Rekapitulasi Dana Beasiswa
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ mt: 2, display: 'flex' }}>
          <Box sx={{ minWidth: 120 }}>
            <TextField
              select
              variant="outlined"
              size="small"
              label="Pilih batch"
              sx={{ minWidth: 200 }}
              onChange={(val) =>
                getBulanRekapitulasiBeasiswa(val.target.value)
              }
            >
              {batch.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ ml: 1 }}>
            <TextField
              select
              variant="outlined"
              size="small"
              label="Pilih bulan"
              sx={{ minWidth: 200 }}
              onChange={(val) =>
                getRekapitulasiBeasiswa(val.target.value)
              }
            >
              {monthArray.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                >
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            size="small"
            label="Search"
            type="search"
          ></TextField>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <StyledTableCell>No</StyledTableCell>
                {headers2.map((header) => (
                  <StyledTableCell sx={{ textAlign: 'center' }}>
                    {header.title}
                  </StyledTableCell>
                ))}
                <StyledTableCell sx={{ textAlign: 'center' }}>
                  Aksi
                </StyledTableCell>
              </TableHead>
              <TableBody>
                {dataTablePenerima
                  .slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  .map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{index + 1}</StyledTableCell>
                      {headers2.map((header) => (
                        <StyledTableCell sx={{ textAlign: 'center' }}>
                          {header.id === 'status' ? (
                            <Button
                              size="small"
                              variant="outlined"
                              color="success"
                              sx={{ backgroundColor: '#EBF9F1' }}
                            >
                              <Typography
                                style={{
                                  textTransform: 'capitalize',
                                  color: '#1F9254',
                                  fontSize: '12px',
                                }}
                              >
                                Approved
                              </Typography>
                            </Button>
                          ) : header.id === 'nominal_penyaluran' ? (
                            <Typography>
                              {row.nominal_penyaluran[bulanPenyaluran - 1] ||
                                0}
                            </Typography>
                          ) : (
                            <span>
                              {header?.parentId
                                ? row?.[header.parentId]?.[header.id]
                                : row?.[header.id] || '-'}
                            </span>
                          )}
                        </StyledTableCell>
                      ))}
                      <StyledTableCell sx={{ textAlign: 'center' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpenModal(row)}
                        >
                          Detail
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: 2 }}
            >
              Penyaluran Dana
            </Typography>
            {selectedPenerima && (
              <Box>
                <TextField
                  label="NIM"
                  value={selectedPenerima?.mahasiswa?.nim || '-'}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Nama"
                  value={selectedPenerima?.mahasiswa?.nama || '-'}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Nomor Rekening"
                  value={
                    selectedPenerima?.rekening_bank?.nomor_rekening || '-'
                  }
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Nama Bank"
                  value={selectedPenerima?.rekening_bank?.nama_bank || '-'}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Nominal yang akan ditransfer (Rp)"
                  value={nominal}
                  onChange={handleNominalChange}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  type="number"
                  inputProps={{ min: 0 }}
                  error={!!nominalError}
                  helperText={nominalError}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSalurkanDana}
                  disabled={!!nominalError || !nominal}
                >
                  Salurkan Dana
                </Button>
              </Box>
            )}
          </Box>
        </Modal>

        <Dialog
          open={openSisaSaldoDialog}
          onClose={handleCloseSisaSaldoDialog}
          sx={dialogStyle}
        >
          <DialogTitle>Sisa Saldo</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Sisa total dana yang dibutuhkan (Rp)
            </Typography>
            <TextField
              value={sisaSaldo}
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 2 }}
              InputProps={{
                readOnly: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSisaSaldoDialog} color="secondary">
              Batal
            </Button>
            <Button onClick={handleConfirmSalurkanDana} color="primary" variant="contained">
              Konfirmasi
            </Button>
          </DialogActions>
        </Dialog>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h4">List Donatur</Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <StyledTableCell>No</StyledTableCell>
                {headers.map((header) => (
                  <StyledTableCell sx={{ textAlign: 'center' }}>
                    {header.title}
                  </StyledTableCell>
                ))}
              </TableHead>
              <TableBody>
                {dataTableDonatur
                  .slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  .map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{index + 1}</StyledTableCell>
                      {Object.entries(headers).map(([key, val]) => (
                        <StyledTableCell sx={{ textAlign: 'center' }}>
                          {val.id === 'struk_pembayaran' ? (
                            <Button>Open</Button>
                          ) : val.id === 'status' ? (
                            <Button
                              size="small"
                              variant="outlined"
                              color="success"
                              sx={{ backgroundColor: '#EBF9F1' }}
                            >
                              <Typography
                                style={{
                                  textTransform: 'capitalize',
                                  color: '#1F9254',
                                  fontSize: '12px',
                                }}
                              >
                                Approved
                              </Typography>
                            </Button>
                          ) : (
                            <span>
                              {val?.parentId
                                ? row?.[val.parentId]?.[val.id]
                                : row?.[val.id]}
                            </span>
                          )}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <TablePagination
          component="div"
          count={dataTableDonatur.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Box>
          {infoDana.map((info, index) => (
            <Box key={index}>
              <Typography>Saldo awal : {info.saldo_awal}</Typography>
              <Typography>Saldo akhir : {info.saldo_akhir}</Typography>
              <Typography>Total Pemasukan : {info.total_pemasukan}</Typography>
              <Typography>
                Total Pengeluaran : {info.total_pengeluaran}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default LaporanRekapitulasiBeasiswa;




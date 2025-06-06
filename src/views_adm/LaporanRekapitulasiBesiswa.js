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
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { orange } from "@mui/material/colors";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TablePagination from "@mui/material/TablePagination";
import { ExportButtonWithValidation } from "../components/export/exportPenyaluranBeasiswaToPDF";
import { ModalFormRekening } from "../components/form/FormUpdateRekening";

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
  "&:nth-of-type(odd)": {
    backgroundColor: "#E1F1FF",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function LaporanRekapitulasiBeasiswa() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataTableDonatur, setDataTableDonatur] = useState([]);
  const [dataTablePenerima, setDataTablePenerima] = useState([]);
  const [monthArray, setMonthArray] = useState([]);
  const [status, setStatus] = useState("true");
  const [nominal, setNominal] = useState("");
  const [id, setId] = useState("");
  const [infoDana, setInfoDana] = useState([]);
  const [bulanPenyaluran, setBulanPenyaluran] = useState("");
  const [penerimaBeasiswa, setPenerimaBeasiswa] = useState([]);
  const [openModal, setOpenModal] = useState(false);  
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [rowIndex, setRowIndex] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleNominalChange = (val) => {
    setNominal(val);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [batch, setBatch] = useState([]);


  const headers = [
    { title: "Nama Donatur", id: "nama", parentId: "donatur_id" },
    { title: "Nomor Telepon", id: "nomor_telepon", parentId: "donatur_id" },
    { title: "Nominal Donasi (Rp)", id: "nominal_donasi" },
    { title: "Nomor Referensi", id: "nomor_referensi" },
    { title: "Bukti Transfer", id: "struk_pembayaran" },
    { title: "Status", id: "status" },
  ];

  const headers2 = [
    { title: "NIM", id: "nim", parentId: "mahasiswa" },
    { title: "Nama", id: "nama", parentId: "mahasiswa" },
    { title: "Nomor Telepon", id: "nomor_telepon", parentId: "mahasiswa" },
    {
      title: "Nomor Rekening",
      id: "nomor_rekening",
      parentId: "rekening_bank",
    },
    { title: "Nama Bank", id: "nama_bank", parentId: "rekening_bank" },
    {
      title: "Nama Pemilik Rekening",
      id: "nama_pemilik_rekening",
      parentId: "rekening_bank",
    },
  ];

  useEffect(() => {
    const getAllPenggalanganDana = async () => {
      await fetch(
        "http://localhost:8000/v1/penggalangan/penggalangan_dana/getAllPenggalanganDana",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Response getAllPenggalanganDana:", data);
          if (data.data && Array.isArray(data.data) && data.data.length > 0) {
            setId(data.data[0].penggalangan_dana_id);
          } else {
            console.error(
              "Data penggalangan dana kosong atau tidak sesuai:",
              data
            );
          }
        });
    };
    getAllPenggalanganDana();
  }, []);

  useEffect(() => {
    const getAllBatchRekapitulasiBeasiswa = async () => {
      await fetch(
        "http://localhost:8000/v1/rekapitulasi/getAllBatchRekapitulasiBeasiswa",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          let arrayBatch = [];
          for (let i = 0; i < data.data.length; i++) {
            arrayBatch.push({
              label: i + 1,
              value: data.data[i],
            });
          }
          setBatch(arrayBatch);
          console.log(arrayBatch);
        });
    };
    getAllBatchRekapitulasiBeasiswa();
  }, []);
  const getBulanRekapitulasiBeasiswa = async (batch) => {
    await fetch(
      "http://localhost:8000/v1/rekapitulasi/getBulanRekapitulasiBeasiswa",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          id: batch,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        let arrayMonth = [];
        for (let i = 0; i < data.data.length; i++) {
          arrayMonth.push({
            name: data.data[i],
            value: data.data[i],
            index: i,
          });
        }
        setMonthArray(arrayMonth);
        console.dir(arrayMonth);
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
    console.dir(fixedMonthArray);

    fixedMonthArray?.map((month) => {
      const monthName = month?.name;
      if (monthName === monthSelect) {
        setBulanPenyaluran(month.index);
        console.log("bulanpenyaluran:" + month.index);
      }
    });
    const params = new URLSearchParams({
      id: id,
      month: monthSelect,
    }).toString();

    await fetch(
      `http://localhost:8000/v1/rekapitulasi/getRekapitulasiBeasiswa?${params}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        let arrayPenerima = [];
        let arrayDonatur = [];
        let arrayDana = [];
        for (let i = 0; i < data.data.penerima_beasiswa.length; i++) {
          arrayPenerima.push(data.data.penerima_beasiswa[i]);
        }
        setPenerimaBeasiswa(arrayPenerima);
        for (let i = 0; i < data.data.rekapitulasi_donasi.length; i++) {
          arrayDonatur.push(data.data.rekapitulasi_donasi[i]);
        }
        arrayDana.push(data.data.rekapitulasi_dana);
        setInfoDana(arrayDana);
        setDataTablePenerima(arrayPenerima);
        setDataTableDonatur(arrayDonatur);
        console.log(arrayDonatur);
        console.log(arrayPenerima);
        console.log(arrayDana);
      });
  };
  const selectPenyaluranDanaBeasiswa = async (id) => {
    await fetch(
      `http://localhost:8000/v1/rekapitulasi/selectPenyaluranBeasiswa`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
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
        console.log(data.data.nominal_penyaluran);
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
        width: "100%",
        height: "100%",
        p: 2,
      }}
    >
      <ModalFormRekening
        isOpen={openModal}
        onClose={openModal ? handleCloseModal : null}
        initialData={penerimaBeasiswa[rowIndex]}
      />
      <Box
        sx={{
          display: "flex",
          padding: 2,
          backgroundColor: "#1559E6",
          color: "white",
          borderRadius: "4px",
          alignItems: "center",
        }}
      >
        <DescriptionIcon />
        <Typography variant="h4" sx={{ ml: 1 }}>
          Laporan Rekapitulasi Dana Beasiswa
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ mt: 2, display: "flex" }}>
          <Box sx={{ minWidth: 120 }}>
            <TextField
              select
              variant="outlined"
              size="small"
              label="Pilih batch"
              sx={{ minWidth: 200 }}
              onChange={(val) => {
                getBulanRekapitulasiBeasiswa(val.target.value);
                setId(val.target.value);
              }}
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
              onChange={(val) => getRekapitulasiBeasiswa(val.target.value)}
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
          <ExportButtonWithValidation
            penerimaBeasiswa={penerimaBeasiswa}
            monthArray={monthArray}
            id={id}
          />

          <TextField
            search
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
                  <StyledTableCell sx={{ textAlign: "center" }}>
                    {header.title}
                  </StyledTableCell>
                ))}
                <StyledTableCell sx={{ textAlign: "center" }}>
                  Total Dana Disalurkan (Rp)
                </StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                  Action
                </StyledTableCell>
              </TableHead>
              <TableBody>
                {dataTablePenerima
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{index + 1}</StyledTableCell>
                      {Object.entries(headers2).map(([key, val]) => (
                        <StyledTableCell sx={{ textAlign: "center" }}>
                          {val.id === "status" ? (
                            <Button
                              size="small"
                              variant="outlined"
                              color="success"
                              sx={{ backgroundColor: "#EBF9F1" }}
                            >
                              <Typography
                                style={{
                                  textTransform: "capitalize",
                                  color: "#1F9254",
                                  fontSize: "12px",
                                }}
                              >
                                Approved
                              </Typography>
                            </Button>
                          ) : val.id === "dokumen_kehadiran_perkuliahan" ? (
                            <Button>Open</Button>
                          ) : (
                            <span>
                              {val?.parentId
                                ? row?.[val.parentId]?.[val.id]
                                : row?.[val.id]}
                            </span>
                          )}
                        </StyledTableCell>
                      ))}
                      <StyledTableCell sx={{ textAlign: "center" }}>
                        {row.nominal_penyaluran[bulanPenyaluran - 1] === 0 ? (
                          <TextField
                            label="Cth: 400000"
                            variant="outlined"
                            sx={{ minWidth: 150 }}
                            onChange={(val) => {
                              handleNominalChange(parseInt(val.target.value));
                            }}
                          />
                        ) : (
                          <Typography>
                            Rp{row.nominal_penyaluran[bulanPenyaluran - 1]?row.nominal_penyaluran[bulanPenyaluran - 1].toLocaleString("id-ID"):"0".toLocaleString("id-ID")}
                          </Typography>
                        )}
                      </StyledTableCell>

                      <StyledTableCell sx={{ display: "flex",justifyContent:"center",textAlign: "center" }}>
                        <Button
                          onClick={(val) => {
                            selectPenyaluranDanaBeasiswa(
                              row.bantuan_dana_beasiswa_id
                            );
                          }}
                        >
                          <TaskAltIcon sx={{ mr: 2 }} color="primary" />
                        </Button>
                        <Button
                          onClick={(val) => {
                            handleOpenModal();
                            setRowIndex(index);
                          }}
                        >
                          <AccountBalanceOutlinedIcon sx={{ color: orange[500], mr: 2 }} />
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h4">List Donatur</Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <StyledTableCell>No</StyledTableCell>
                {headers.map((header) => (
                  <StyledTableCell sx={{ textAlign: "center" }}>
                    {header.title}
                  </StyledTableCell>
                ))}
              </TableHead>
              <TableBody>
                {dataTableDonatur
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{index + 1}</StyledTableCell>
                      {Object.entries(headers).map(([key, val]) => (
                        <StyledTableCell sx={{ textAlign: "center" }}>
                          {val.id === "struk_pembayaran" ? (
                            <Button>Open</Button>
                          ) : val.id === "status" ? (
                            <Button
                              size="small"
                              variant="outlined"
                              color="success"
                              sx={{ backgroundColor: "#EBF9F1" }}
                            >
                              <Typography
                                style={{
                                  textTransform: "capitalize",
                                  color: "#1F9254",
                                  fontSize: "12px",
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
        ></TablePagination>
        <Box>
          {infoDana.map((info, index) => (
            <Box>
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

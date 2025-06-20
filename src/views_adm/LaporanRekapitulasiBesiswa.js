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
import { useEffect, useState, useCallback } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { red } from '@mui/material/colors';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TablePagination from '@mui/material/TablePagination';
import Modal from '@mui/material/Modal';
import { useDropzone } from 'react-dropzone'; // Import react-dropzone

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

function LaporanRekapitulasiBeasiswa() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dataTableDonatur, setDataTableDonatur] = useState([]);
    const [dataTablePenerima, setDataTablePenerima] = useState([]);
    const [monthArray, setMonthArray] = useState([]);
    const [indexMonth, setIndexMonth] = useState([]);
    const [status, setStatus] = useState('true');
    const [nominal, setNominal] = useState('');
    const [id, setId] = useState('');
    const [infoDana, setInfoDana] = useState([]);
    const [jenis, setJenis] = useState('Beasiswa');
    const [bulanPenyaluran, setBulanPenyaluran] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [files, setFiles] = useState([]);
    const [selectedReason, setSelectedReason] = useState('');
    const [selectedNIM, setSelectedNIM] = useState('');

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

    const handleChange = (event) => {
        setBatch(event.target.value);
    };

    const handleOpenModal = (row = null) => {
    if (row) {
        setSelectedStudent(row);
    }
    setOpenModal(true);
    };

    useEffect(() => {
    }, []);

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedNIM('');
        setSelectedStudent(null);
        setSelectedReason('');
        setFiles([]);
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
    ];

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
                    console.log(data.data[0].penggalangan_dana_id);
                    setId(data.data[0].penggalangan_dana_id);
                });
        };
        getAllPenggalanganDana();
    }, []);

    useEffect(() => {
        const getAllBatchRekapitulasiBeasiswa = async () => {
            await fetch('http://localhost:8000/v1/rekapitulasi/getAllBatchRekapitulasiBeasiswa', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
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
        await fetch('http://localhost:8000/v1/rekapitulasi/getBulanRekapitulasiBeasiswa', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                id: batch,
            }),
        })
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
                console.log(arrayMonth);
            });
    };

    const getRekapitulasiBeasiswa = async (monthSelect) => {
        const startBulanPenyaluran = monthArray?.[5]?.name;
        const aprilMonthIndex = monthArray?.find((month) => month?.name === startBulanPenyaluran)?.index;
        let aprilMonthToNow = monthArray?.filter((month, index) => index >= aprilMonthIndex);
        let monthLeft = monthArray?.filter((month) => !aprilMonthToNow.includes(month));
        aprilMonthToNow.push(...monthLeft);
        let fixedMonthArray = aprilMonthToNow.map((month, index) => ({ ...month, index }));
        console.log(fixedMonthArray);
        fixedMonthArray?.map((month) => {
            const monthName = month?.name;
            if (monthName === monthSelect) {
                setBulanPenyaluran(month.index);
                console.log(month.index);
            }
        });
        await fetch('http://localhost:8000/v1/rekapitulasi/getRekapitulasiBeasiswa', {
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
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
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
                console.log(arrayDonatur);
                console.log(arrayPenerima);
                console.log(arrayDana);
            });
    };

    const selectPenyaluranDanaBeasiswa = async (id) => {
        await fetch('http://localhost:8000/v1/rekapitulasi/selectPenyaluranBeasiswa', {
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
        })
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
                width: '100%',
                height: '100%',
                p: 2,
            }}
        >
            <Box sx={{ display: 'flex', padding: 2, backgroundColor: '#1559E6', color: 'white', borderRadius: '4px', alignItems: 'center' }}>
                <DescriptionIcon />
                <Typography variant='h4' sx={{ ml: 1 }}>Laporan Rekapitulasi Dana Beasiswa</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ mt: 2, display: 'flex' }}>
                    <Box sx={{ minWidth: 120 }}>
                        <TextField
                            select
                            variant="outlined"
                            size="small"
                            label='Pilih batch'
                            sx={{ minWidth: 200 }}
                            onChange={(val) => getBulanRekapitulasiBeasiswa(val.target.value)}
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
                            label='Pilih bulan'
                            sx={{ minWidth: 200 }}
                            onChange={(val) => getRekapitulasiBeasiswa(val.target.value)}
                        >
                            {monthArray.map((option) => (
                                <MenuItem key={option.value} value={option.value} label={option.label}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        search
                        size='small'
                        label="Search"
                        type='search'
                    ></TextField>
                </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
                {/* {<Button variant="contained" onClick={handleOpenModal} sx={{ mb: 2 }}>
                    Open Modal for Testing
                </Button>} */}

                <Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <StyledTableCell>No</StyledTableCell>
                                {headers2.map((header) => (
                                    <StyledTableCell sx={{ textAlign: 'center' }}>{header.title}</StyledTableCell>
                                ))}
                                <StyledTableCell sx={{ textAlign: 'center' }}>Total Dana Disalurkan (Rp)</StyledTableCell>
                                <StyledTableCell sx={{ textAlign: 'center' }}>Action</StyledTableCell>
                            </TableHead>
                            <TableBody>
                                {dataTablePenerima
                                    .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                                    .map((row, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell>{index + 1}</StyledTableCell>
                                            {Object.entries(headers2).map(([key, val]) => (
                                                <StyledTableCell sx={{ textAlign: 'center' }}>
                                                    {val.id === 'status' ? (
                                                        <Button size='small' variant='outlined' color='success' sx={{ backgroundColor: '#EBF9F1' }}>
                                                            <Typography style={{ textTransform: "capitalize", color: '#1F9254', fontSize: '12px' }}>
                                                                Approved
                                                            </Typography>
                                                        </Button>
                                                    ) : val.id === 'dokumen_kehadiran_perkuliahan' ? (
                                                        <Button>Open</Button>
                                                    ) : (
                                                        <span>{val?.parentId ? row?.[val.parentId]?.[val.id] : row?.[val.id]}</span>
                                                    )}
                                                </StyledTableCell>
                                            ))}
                                            <StyledTableCell>
                                                {row.nominal_penyaluran[bulanPenyaluran - 1] === 0 ? (
                                                    <TextField
                                                        label="Cth: 400000"
                                                        variant='outlined'
                                                        sx={{ minWidth: 150 }}
                                                        onChange={(val) => { handleNominalChange(parseInt(val.target.value)) }}
                                                    />
                                                ) : (
                                                    <Typography>{row.nominal_penyaluran[bulanPenyaluran - 1]}</Typography>
                                                )}
                                            </StyledTableCell>
                                            <StyledTableCell sx={{ display: 'flex' }}>
                                                <Button onClick={(val) => { selectPenyaluranDanaBeasiswa(row.bantuan_dana_beasiswa_id, val.target.value) }}>
                                                    <TaskAltIcon sx={{ mr: 2 }} color='primary' />
                                                </Button>
                                                <Button onClick={() => handleOpenModal(row)}>
                                                    <Typography sx={{ color: 'primary.main' }}>Evaluasi</Typography>
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
								sx={{ 
									color: '#ffffff', 
									alignItems: 'center'
								}}
							>
								Evaluasi Penyaluran Beasiswa
							</Typography>
						</Box>
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                select
                                fullWidth
                                label="NIM"
                                value={selectedNIM || selectedStudent?.mahasiswa?.nim || ''}
                                onChange={(e) => {
                                const nim = e.target.value;
                                setSelectedNIM(nim);
                                const student = dataTablePenerima.find(
                                    (row) => row.mahasiswa.nim === nim
                                );
                                setSelectedStudent(student || null);
                                }}
                                sx={{ mb: 2 }}
                            >
                                {dataTablePenerima.map((row) => (
                                <MenuItem key={row.mahasiswa.nim} value={row.mahasiswa.nim}>
                                    {row.mahasiswa.nim}
                                </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                label="Nama"
                                value={selectedStudent?.mahasiswa?.nama || ''}
                                InputProps={{
                                readOnly: true,
                                }}
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
                                onClick={handleCloseModal}
                                disabled={files.length === 0}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Modal>

                <Box sx={{ mt: 3 }}>
                    <Typography variant='h4'>List Donatur</Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <StyledTableCell>No</StyledTableCell>
                                {headers.map((header) => (
                                    <StyledTableCell sx={{ textAlign: 'center' }}>{header.title}</StyledTableCell>
                                ))}
                            </TableHead>
                            <TableBody>
                                {dataTableDonatur
                                    .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                                    .map((row, index) => (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell>{index + 1}</StyledTableCell>
                                            {Object.entries(headers).map(([key, val]) => (
                                                <StyledTableCell sx={{ textAlign: 'center' }}>
                                                    {val.id === "struk_pembayaran" ? <Button>Open</Button> : val.id === 'status' ?
                                                        <Button size='small' variant='outlined' color='success' sx={{ backgroundColor: '#EBF9F1' }}>
                                                            <Typography style={{ textTransform: "capitalize", color: '#1F9254', fontSize: '12px' }}>Approved</Typography>
                                                        </Button>
                                                        : <span>{val?.parentId ? row?.[val.parentId]?.[val.id] : row?.[val.id]}</span>
                                                    }
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
                    {infoDana
                        .map((info, index) =>
                            <Box key={index}>
                                <Typography>Saldo awal        : {info.saldo_awal}</Typography>
                                <Typography>Saldo akhir       : {info.saldo_akhir}</Typography>
                                <Typography>Total Pemasukan   : {info.total_pemasukan}</Typography>
                                <Typography>Total Pengeluaran : {info.total_pengeluaran}</Typography>
                            </Box>
                        )
                    }
                </Box>
            </Box>
        </Container>
    );
}

export default LaporanRekapitulasiBeasiswa;

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SidebarAdmin from '../components/molekul/sidebar/SidebarAdmin'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TableAdmin from '../components/molekul/tabel/Tabel';
import { styled } from '@mui/material/styles';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { red } from '@mui/material/colors';
import TablePagination from '@mui/material/TablePagination';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

function EvaluasiPenyaluranDanaBeasiswa() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dataTable, setDataTable] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const sampleData = [
    //     { 
    //         nim: '12345678', 
    //         nama: 'John Doe', 
    //         statusBeasiswa: 'Aktif', 
    //         alasan: 'Memenuhi persyaratan' 
    //     },
    //     { 
    //         nim: '87654321', 
    //         nama: 'Jane Smith', 
    //         statusBeasiswa: 'Non-Aktif', 
    //         alasan: 'IPK di bawah standar' 
    //     },
    // ];

    // useEffect(() => {
    //     // ini buat API
    //     // getRekapitulasiNonBeasiswa();
    //     setDataTable(sampleData); // ini buat data dummy
    // }, []);

    const filteredData = dataTable.filter(row => 
        row.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.statusBeasiswa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.alasan.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container
            disableGutters
            maxWidth={false}
            sx={{
                width: '100%',
                height: '100%',
                p: 2
            }}
        >
            <Box sx={{ display: 'flex', padding: 2, backgroundColor: '#1559E6', color: 'white', borderRadius: '4px', alignItems: 'center' }}>
                <PeopleAltIcon></PeopleAltIcon>
                <Typography variant='h4' sx={{ ml: 1 }}>Evaluasi Penyaluran Dana Beasiswa</Typography>
            </Box>
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <TextField 
                    label="Search" 
                    type='search'
                    sx={{ minWidth: 350 }}
                    size='small'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                ></TextField>
            </Box>
            
            <Box sx={{ mt: 2 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="evaluasi beasiswa table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell>NIM</StyledTableCell>
                                <StyledTableCell>Nama Mahasiswa</StyledTableCell>
                                <StyledTableCell>Status Beasiswa</StyledTableCell>
                                <StyledTableCell>Alasan</StyledTableCell>
                                <StyledTableCell>Detail</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{page * rowsPerPage + index + 1}</StyledTableCell>
                                        <StyledTableCell>{row.nim}</StyledTableCell>
                                        <StyledTableCell>{row.nama}</StyledTableCell>
                                        <StyledTableCell>
                                            <Button 
                                                size='small' 
                                                variant='outlined' 
                                                color={row.statusBeasiswa === 'Aktif' ? 'success' : 'error'}
                                                sx={{ 
                                                    backgroundColor: row.statusBeasiswa === 'Aktif' ? '#EBF9F1' : '#FBEFEF',
                                                    minWidth: 100
                                                }}
                                            >
                                                <Typography 
                                                    style={{ 
                                                        textTransform: "capitalize", 
                                                        color: row.statusBeasiswa === 'Aktif' ? '#1F9254' : '#A30D11',
                                                        fontSize: '12px' 
                                                    }}
                                                >
                                                    {row.statusBeasiswa}
                                                </Typography>
                                            </Button>
                                        </StyledTableCell>
                                        <StyledTableCell>{row.alasan}</StyledTableCell>
                                        <StyledTableCell>
                                            <Button size='small' color='primary'>
                                                <p style={{ textTransform: "capitalize", fontSize: '12px' }}>Detail</p>
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={filteredData.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Container>
    );
}

export default EvaluasiPenyaluranDanaBeasiswa;
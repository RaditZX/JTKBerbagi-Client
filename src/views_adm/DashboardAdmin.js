import '../App.css';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import ButtonBase from '../components/base/Button';
import Grid from '@mui/material/Grid';
import { Box, Container, Fade, CircularProgress, Alert, IconButton } from '@mui/material';
import CardInfo from '../components/molekul/card/CardInfo';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { useLocation, Link } from 'react-router-dom';


import AutoComplete from '../components/molekul/autocomplete/AutoComplete';

import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelIcon from '@mui/icons-material/Cancel';
import DownloadIcon from '@mui/icons-material/Download';

// import Item from '@mui/material';


function Dashboard() {
	const styleBox = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 'auto',
		bgcolor: 'background.paper',
		boxShadow: 24,
		borderRadius: '4px 4px 4px 4px'
	}

	const [uploadedFile, setUploadedFile] = React.useState(null);
	const [isUploading, setIsUploading] = React.useState(false);
	const [uploadStatus, setUploadStatus] = React.useState(null);

	const [deskripsi, setDeskripsi] = React.useState('');
	const [jumlahPenerimaBantuan, setJumlahPenerimaBantuan] = React.useState('')
	const [jumlahDonasi, setJumlahDonasi] = React.useState('')
	const [openModal, setOpenModal] = React.useState(false);
	const [openModalImportData, setOpenModalImportData] = React.useState(false);
	const [openModalNonBeasiswa, setOpenModalNonBeasiswa] = React.useState(false);
	const [openModalGalangDana, setOpenModalGalangDana] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [jumlahPengajuan, setJumlahPengajuan] = React.useState('')
	const [jumlahDana, setJumlahDana] = React.useState('')
	const [namaPenanggungJawab, setNamaPenanggungJawab] = React.useState('');
	const [nomorIndukPenanggungJawab, setNomorIndukPenanggungJawab] = React.useState('');
	const [nomorTeleponPenanggungJawab, setNomorTeleponPenanggungJawab] = React.useState([]);
	const [nomorRekening, setNomorRekening] = React.useState([]);
	const [namaPemilikRekening, setNamaPemilikRekening] = React.useState([]);
	const [namaBank, setNamaBank] = React.useState([]);
	const [judul, setJudul] = React.useState([]);
	const [waktuBerakhir, setWaktuBerakhir] = React.useState([]);
	const [kebutuhanDana, setKebutuhanDana] = React.useState([]);
	const [namaPenerima, setNamaPenerima] = React.useState('');
	const [nomorIndukPenerima, setNomorIndukPenerima] = React.useState('');
	const [nomorTeleponPenerima, setNomorTeleponPenerima] = React.useState([]);
	const [kategori, setKategori] = React.useState([]);
	const [judulGalangDana, setJudulGalangDana] = React.useState([]);
	const [targetDana, setTargetDana] = React.useState('');
	const [targetPenerima, setTargetPenerima] = React.useState('');
	const [jenis, setJenis] = React.useState('NonBeasiswa');

	const handleOpenImportData = () => {
		setOpenModalImportData(true);
	};

	const handleCloseModalImportData = () => {
		setOpenModalImportData(false);
		setUploadedFile(null);
		setUploadStatus(null);
	};

	const handleJudulGalangDanaChange = (val) => {
		setJudulGalangDana(val)
	}
	const handleDeskripsiChange = (val) => {
		setDeskripsi(val)
	}
	const handleTargetPenerimaChange = (val) => {
		setTargetPenerima(val)
	}
	const handleTargetDana = (val) => {
		setTargetDana(val)
	}
	const handleNamaPenanggungJawabChange = (val) => {
	    if (typeof val === 'object' && val !== null) {
			setNamaPenanggungJawab(val.nama || '');
			setNomorIndukPenanggungJawab(val.nomor_induk || '');
		} else {
			setNamaPenanggungJawab(val); // allow manual input
		}
	}
	const handleNomorIndukPenanggungJawabChange = (val) => {
	    if (typeof val === 'object' && val !== null) {
			setNomorIndukPenanggungJawab(val.nomor_induk || '');
			setNamaPenanggungJawab(val.nama || '');
		} else {
			setNomorIndukPenanggungJawab(val); // allow manual input
		}
	}
	const handleNomorTeleponPenanggungJawabChange = (val) => {
		setNomorTeleponPenanggungJawab(val)
	}
	const handleNomorRekeningChange = (val) => {
		setNomorRekening(val)
	}
	const handleNamaPemilikRekeningChange = (val) => {
		setNamaPemilikRekening(val)
	}
	const handleNamaBankChange = (val) => {
		setNamaBank(val)
	}
	const handleWaktuBerakhirChange = (val) => {
		setWaktuBerakhir(val)
	}
	const handleKebutuhanDanaChange = (val) => {
		setKebutuhanDana(val)
	}
	const handleNamaPenerimaChange = (val) => {
	    if (typeof val === 'object' && val !== null) {
			setNamaPenerima(val.nama || '');
			setNomorIndukPenerima(val.nomor_induk || '');
		} else {
			setNamaPenerima(val); // allow manual input
		}
	}
	const handleNomorIndukPenerimaChange = (val) => {
	    if (typeof val === 'object' && val !== null) {
			setNomorIndukPenerima(val.nomor_induk || '');
			setNamaPenerima(val.nama || '');
		} else {
			setNomorIndukPenerima(val || '');
		}
	}
	const handleNomorTeleponPenerimaChange = (val) => {
		setNomorTeleponPenerima(val)
	}
	const handleKategoriChange = (val) => {
		setKategori(val)
	}
	const open = Boolean(anchorEl)
	const handleCloseMenu = () => setAnchorEl(null)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const cardList = [
		{ title: 'Pengajuan Bantuan Dana Non Beasiswa', description: 'Pengajuan', value: jumlahPengajuan },
		{ title: 'Penggalangan Dana Berlangsung', description: 'Penggalangan Dana', value: jumlahPenerimaBantuan },
		{ title: 'Daftar Donasi', description: 'Donatur', value: jumlahDonasi },
		{ title: 'Dana Terkumpul', description: 'Total Dana Terkumpul', value: jumlahDana }
	]
	var menuList = cardList;
	const location = useLocation()
	const currentLocationData = menuList.reduce((result, item) => item.url === location.pathname ? [...result, item] : result, []);
	const handleOpen = () => {
		setOpenModal(true);
		setAnchorEl(null);
	};
	const handleOpenNonBeasiswa = () => {
		setOpenModalNonBeasiswa(true);
		setAnchorEl(null);
	}
	const handleOpenGalangDana = () => {
		setOpenModalGalangDana(true);
		setOpenModalNonBeasiswa(false);
	}
	const handleCloseModalNonBeasiswa = () => setOpenModalNonBeasiswa(false);
	const handleCloseModalGalangDana = () => setOpenModalGalangDana(false);
	const handleCloseModal = () => setOpenModal(false);

	const handleDownloadTemplate = () => {
		const templateUrl = '../templates/import.xlsx';

		const link = document.createElement('a');
		link.href = templateUrl;
		link.download = 'import.xlsx';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: {

		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
		},
		onDrop: (acceptedFiles) => {
		setUploadedFile(acceptedFiles[0]);
		setUploadStatus(null);
		},
		multiple: false,
	});

	const handleRemoveFile = () => {
		setUploadedFile(null);
		setUploadStatus(null);
	};

	const importDataCivitasAkademika = async () => {
		if (!uploadedFile) {
		setUploadStatus({ type: 'error', message: 'Silakan unggah file terlebih dahulu.' });
		return;
		}

		// Validasi ukuran file (maksimum 5MB)
		const maxSize = 5 * 1024 * 1024; // 5MB dalam byte
		if (uploadedFile.size > maxSize) {
		setUploadStatus({ type: 'error', message: 'Ukuran file melebihi 5MB. Silakan unggah file yang lebih kecil.' });
		return;
		}

		// Validasi ekstensi file
		const validExtensions = ['.xlsx'];
		const fileExtension = uploadedFile.name.slice(((uploadedFile.name.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
		if (!validExtensions.includes(`.${fileExtension}`)) {
		setUploadStatus({ type: 'error', message: 'File harus berupa atau .xlsx.' });
		return;
		}

		setIsUploading(true);
		setUploadStatus(null);

		const formData = new FormData();
		formData.append('file', uploadedFile);

		try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 30000); // Timeout 30 detik

		const response = await fetch(
			'http://localhost:8000/v1/civitas_akademika/importExcelCivitasAkademika',
			{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: formData,
			signal: controller.signal,
			}
		);

		clearTimeout(timeoutId);

		const data = await response.json();

		if (!response.ok) {
			if (data.response_message && data.response_message.includes('nomor_induk')) {
			setUploadStatus({
				type: 'error',
				message: 'Gagal memperbarui data. Silakan coba lagi atau periksa format file pada nomor induk anda.',
			});
			} else if (data.response_message && data.response_message.includes('nama')) {
			setUploadStatus({
				type: 'error',
				message: 'Gagal memperbarui data. Silakan periksa kolom nama pada file Anda.',
			});
			} else {
			setUploadStatus({
				type: 'error',
				message: data.response_message || 'Gagal memperbarui data. Silakan coba lagi atau periksa format file Anda.',
			});
			}
		} else {
			setUploadStatus({ type: 'success', message: 'Data berhasil diperbarui!' });
			setTimeout(() => {
			handleCloseModalImportData();
			}, 1500);
		}
		} catch (err) {
		if (err.name === 'AbortError') {
			setUploadStatus({
			type: 'error',
			message: 'Waktu koneksi habis. Silakan coba lagi nanti.',
			});
		} else {
			setUploadStatus({
			type: 'error',
			message: 'Terjadi kesalahan saat mengunggah file. Silakan coba lagi nanti.',
			});
		}
		} finally {
		setIsUploading(false);
		}
	};
	const getTotalCalonPengajuan = async () => {
		await fetch(
			'http://localhost:8000/v1/pengajuan/pengajuan_bantuan/getTotalCalonPengajuan',
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify({
					jenis: jenis
				})
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.data)
				let arrayData = []
				arrayData.push(data.data)
				setJumlahPengajuan(arrayData)
			})

	}
	const getTotalDanaTerkumpul = async () => {
		await fetch(
			'http://localhost:8000/v1/penggalangan/donasi/getTotalAllDonasi',
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			})
			.then((response) => response.json())
			.then((data) => {
				console.log(data.data)
				let arrayData = []
				arrayData.push(data.data)
				setJumlahDana(arrayData)
			})
	}
	const getTotalNewDonasi = async () => {
		await fetch(
			'http://localhost:8000/v1/penggalangan/donasi/getTotalNewDonasi',
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			})
			.then((response) => response.json())
			.then((data) => {
				console.log(data.data)
				let arrayData = []
				arrayData.push(data.data)
				setJumlahDonasi(arrayData)
			})
	}
	const getTotalPenerimaBantuan = async () => {
		await fetch(
			'http://localhost:8000/v1/pengajuan/pengajuan_bantuan/getTotalPenerimaBantuan',
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			})
			.then((response) => response.json())
			.then((data) => {
				console.log(data.data.penerima_bantuan_admin)
				let arrayData = []
				arrayData.push(data.data.penerima_bantuan_admin)
				setJumlahPenerimaBantuan(arrayData)
			})
	}
	React.useEffect(() => {
		getTotalPenerimaBantuan()
		getTotalNewDonasi()
		getTotalCalonPengajuan()
		getTotalDanaTerkumpul()
	}, [])
	const createPenggalanganDanaBeasiswa = async () => {
		await fetch('http://localhost:8000/v1/penggalangan/penggalangan_dana/createPenggalanganDanaBeasiswa',
			{
				mode: 'cors',
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify({
					judul: judulGalangDana,
					deskripsi: deskripsi,
					target_dana: targetDana,
					target_penerima: targetPenerima
				}),
			})
			.then((response) => response.json())
			.then((data) => {
				console.log(data.id, 'test id');
			})
			.catch((err) => {
				console.log(err.message);
			})
	}
	const createPenggalanganDanaNonBeasiswa = async () => {
		await fetch('http://localhost:8000/v1/penggalangan/penggalangan_dana/createPenggalanganDanaNonBeasiswa',
			{
				mode: 'cors',
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify({
					nama_penanggung_jawab: namaPenanggungJawab,
					nomor_induk_penanggung_jawab: nomorIndukPenanggungJawab,
					nomor_telepon_penanggung_jawab: nomorTeleponPenanggungJawab,
					nomor_rekening: nomorRekening,
					nama_pemilik_rekening: namaPemilikRekening,
					nama_bank: namaBank,
					judul_galang_dana: judulGalangDana,
					waktu_galang_dana: waktuBerakhir,
					deskripsi_galang_dana: deskripsi,
					dana_yang_dibutuhkan: kebutuhanDana,
					nama_penerima: namaPenerima,
					nomor_induk_penerima: nomorIndukPenerima,
					nomor_telepon_penerima: nomorTeleponPenerima,
					kategori: kategori
				}),
			})
			.then((response) => response.json())
			.then((data) => {
				console.log(data.id, 'test id');
			})
			.catch((err) => {
				console.log(err.message);
			})
	}
	const kategoriSelect = [
		{
			value: 'Medis',
			label: 'Medis'
		},
		{
			value: 'Bencana',
			label: 'Bencana',
		},
		{
			value: 'Duka',
			label: 'Duka'
		}
	]
	const jumlahPenerima = [
		{
			value: 1,
			label: '1',
		},
		{
			value: 2,
			label: '2',
		},
		{
			value: 3,
			label: '3',
		},
		{
			value: 4,
			label: '4',
		},
		{
			value: 5,
			label: '5',
		},
	]
	return (
		<Container
			disableGutters
			sx={{
				minWidth: '100%',
				minHeight: '100%',
				p: 2
			}}
		>
			<Box sx={{ display: 'flex', padding: 2, backgroundColor: '#1559E6', color: 'white', borderRadius: '4px', alignItems: 'center' }}>
				<DashboardIcon fontSize='small'></DashboardIcon>
				<Typography variant='h4' sx={{ ml: 1 }}>Dashboard</Typography>
			</Box>
			<Box sx={{ mt: 2 }}>
				<Box>
					<Typography variant="h3">
						Selamat Datang, Admin!
					</Typography>
				</Box>
				<Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
					<Button variant='contained'
						id="basic-button"
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
					>
						<Typography>Buat Galang Dana!</Typography>
					</Button>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
					>
						<MenuItem onClick={handleOpen}>Beasiswa</MenuItem>
						<MenuItem onClick={handleOpenNonBeasiswa}>Non Beasiswa</MenuItem>
					</Menu>
					<Button variant="outlined" sx={{ ml: 2 }} onClick={handleOpenImportData}>
						<Typography>Import Data</Typography>
						</Button>
					</Box>

					{/* Modal Impor Data dengan Fitur yang Ditingkatkan */}
					<Modal open={openModalImportData} onClose={handleCloseModalImportData}>
						<Fade in={openModalImportData}>
						<Box sx={styleBox}>
							<Box
							sx={{
								backgroundColor: '#1559E6',
								borderRadius: '4px 4px 0 0',
								p: 2,
							}}
							>
							<Typography variant="h3" color={'white'}>
								Import Data Civitas Akademika JTK POLBAN
							</Typography>
							</Box>
							<Box sx={{ p: 2 }}>
							<Box
								{...getRootProps()}
								sx={{
								border: '2px dashed #1559E6',
								borderRadius: '4px',
								p: 4,
								textAlign: 'center',
								bgcolor: isDragActive ? '#e3f2fd' : '#f5f5f5',
								cursor: 'pointer',
								transition: 'background-color 0.3s ease',
								'&:hover': {
									bgcolor: '#e3f2fd',
								},
								}}
							>
								<input {...getInputProps()} />
								<CloudUploadIcon sx={{ fontSize: 40, color: '#1559E6', mb: 1 }} />
								{isDragActive ? (
								<Typography>Letakkan berkas di sini...</Typography>
								) : uploadedFile ? (
								<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
									<Typography sx={{ mr: 1 }}>
									Berkas yang diunggah: {uploadedFile.name}
									</Typography>
									<IconButton onClick={handleRemoveFile} size="small">
									<CancelIcon sx={{ color: '#1559E6' }} />
									</IconButton>
								</Box>
								) : (
								<Typography>
									Seret dan lepaskan berkas Excel (.xlsx) di sini, atau klik di sini untuk mengunggah berkas
								</Typography>
								)}
							</Box>

							{uploadStatus && (
								<Fade in={!!uploadStatus}>
								<Box sx={{ mt: 2 }}>
									<Alert severity={uploadStatus.type}>{uploadStatus.message}</Alert>
								</Box>
								</Fade>
							)}

							<Box
								sx={{
								display: 'flex',
								justifyContent: 'flex-end',
								mt: 2,
								}}
							>
								<Button
									variant="outlined"
									startIcon={<DownloadIcon />}
									onClick={handleDownloadTemplate}
									sx={{ mr: 'auto' }}
								>
									Download Template
								</Button>
								<Button
								variant="contained"
								onClick={importDataCivitasAkademika}
								disabled={!uploadedFile || isUploading}
								startIcon={isUploading && <CircularProgress size={20} />}
								sx={{ minWidth: 100, ml: 1 }}
								>
								{isUploading ? 'Uploading...' : 'Submit'}
								</Button>
								<Button
								variant="outlined"
								onClick={handleCloseModalImportData}
								sx={{ ml: 1 }}
								disabled={isUploading}
								>
								Cancel
								</Button>
							</Box>
							</Box>
						</Box>
						</Fade>
					</Modal>
				<Modal
					open={openModal}
					onClose={handleCloseModal}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={styleBox}>
						<Box sx={{ backgroundColor: '#1559E6', borderRadius: '4px 4px 0 0', p: 2 }}>
							<Typography variant='h3' color={'white'}>Formulir Galang Dana Beasiswa</Typography>
						</Box>
						<Box sx={{ p: 2, }}>
							<Box sx={{display: 'flex'}}>
								<Box sx={{ width: '100%'}}>
									<Typography>Judul Galang Dana</Typography>
									<TextField size='small' variant='outlined' label='cth: Beasiswa JTK' onChange={(val) => { handleJudulGalangDanaChange(val.target.value) }} sx={{width: '100%'}} />
								</Box>
								<Box sx={{ml: 2, width: '100%'}}>
									<Typography>Target Penerima</Typography>
									<TextField select size='small' variant='outlined' label='cth: 6' onChange={(val) => { handleTargetPenerimaChange(val.target.value) }} sx={{width: '100%'}} >
										{
											jumlahPenerima.map((option) => (
												<MenuItem key={option.value} value={option.value}>
													{option.label}
												</MenuItem>
											))
										}
									</TextField>
								</Box>
								<Box sx={{ml: 2, width: '100%'}}>
									<Typography>Target Bantuan Dana</Typography>
									<TextField size='small' variant='outlined' label='cth: 600000' onChange={(val) => { handleTargetDana(val.target.value)}} sx={{width: '100%'}}/>
								</Box>
							</Box>
							<Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
								<Typography>Deskripsi Galang Dana</Typography>
								<TextField size='small' variant='outlined' label='Deskprisi' onChange={(val) => { handleDeskripsiChange(val.target.value) }}/>
							</Box>
							<Box sx={{ pt: 2, display: 'flex', justifyContent: 'flex-end' }}>
								<Button variant='contained' onClick={createPenggalanganDanaBeasiswa}>Submit</Button>
								<Button variant='outlined' onClick={handleCloseModal} sx={{ ml: 1 }}>Cancel</Button>
							</Box>
						</Box>
					</Box>
				</Modal>
				<Modal
					open={openModalNonBeasiswa}
					onClose={handleCloseModalNonBeasiswa}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={styleBox}>
						<Box sx={{ backgroundColor: '#1559E6', borderRadius: '4px 4px 0 0', p: 2 }}>
							<Typography variant='h3' color={'white'}>Formulir Galang Dana Non Beasiswa</Typography>
						</Box>
						<Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
							<Box sx={{ pb: 1 }}>
								<Typography variant='h3'>Identitas Penanggung Jawab</Typography>
							</Box>
							<Divider />
							<Box sx={{ pt: 1, display: 'flex', width: '100%' }}>
								<Box>
									<Typography>Nama</Typography>
									<AutoComplete onChange={handleNamaPenanggungJawabChange} placeholder='cth: Hasbi' textFieldLabel='cth: Hasbi' tableName='civitas_akademika' columnName='nama' suggestionDisplayField='nama' suggestionValueField='nama' value={namaPenanggungJawab}/>
								</Box>
								<Box sx={{ ml: 2 }}>
									<Typography>NIM/NIP</Typography>
									<AutoComplete onChange={handleNomorIndukPenanggungJawabChange} placeholder='cth: 191524024' textFieldLabel='cth: 191524024' tableName='civitas_akademika' columnName='nomor_induk' suggestionDisplayField='nomor_induk' suggestionValueField='nomor_induk' value={nomorIndukPenanggungJawab}/>
								</Box>
								<Box sx={{ ml: 2 }}>
									<Typography>No Telepon</Typography>
									<TextField size='small' variant='outlined' label='cth: 082121441234' sx={{width: '100%'}} onChange={(val) => {handleNomorTeleponPenanggungJawabChange(val.target.value)}} />
								</Box>
							</Box>
							<Box sx={{ pb: 1, pt: 3 }}>
								<Typography variant='h3'>Identitas Penerima Dana</Typography>
							</Box>
							<Divider />
							<Box sx={{ display: 'flex', mt: 1 }}>
								<Box>
									<Typography>Nama</Typography>
									<AutoComplete onChange={handleNamaPenerimaChange} placeholder='cth: Hasbi' textFieldLabel='cth: Hasbi' tableName='civitas_akademika' columnName='nama' suggestionDisplayField='nama' suggestionValueField='nama' value={namaPenerima}/>
								</Box>
								<Box sx={{ml: 2}}>
									<Typography>NIM/NIP</Typography>
									<AutoComplete onChange={handleNomorIndukPenerimaChange} placeholder='cth: 231511000' textFieldLabel='cth: 231511000' tableName='civitas_akademika' columnName='nomor_induk' suggestionDisplayField='nomor_induk' suggestionValueField='nomor_induk' value={nomorIndukPenerima}/>	
								</Box>
								<Box sx={{ml: 2}}>
									<Typography>No Telepon</Typography>
									<TextField size='small' variant='outlined' label='cth: 082121441234' sx={{ width: '100%' }} onChange={(val) => {handleNomorTeleponPenerimaChange(val.target.value)}}/>
								</Box>
							</Box>
							<Box sx={{ display: 'flex', mt: 1}}>
								<Box >
									<Typography>Nama Pemilik Rekening</Typography>
									<TextField size='small' variant='outlined' label='cth: Hasbi Islahi' sx={{ width: '100%' }} onChange={(val) => {handleNamaPemilikRekeningChange(val.target.value)}}/>
								</Box>
								<Box sx={{ml: 2}}>
									<Typography>Bank Rekening</Typography>
									<TextField size='small' variant='outlined' label='cth: Mandiri' sx={{ width: '100%' }} onChange={(val) => {handleNamaBankChange(val.target.value)}}/>
								</Box>
								<Box sx={{ ml: 2 }}>
									<Typography>Nomor Rekening</Typography>
									<TextField size='small' variant='outlined' label='cth: 13000462110001' sx={{ width: '100%' }} onChange={(val) => {handleNomorRekeningChange(val.target.value)}}/>
								</Box>

							</Box>
							<Box sx={{ pt: 2, display: 'flex', justifyContent: 'flex-end' }}>
								<Button variant='contained' onClick={handleOpenGalangDana}>Selanjutnya</Button>
								<Button variant='outlined' onClick={handleCloseModalNonBeasiswa} sx={{ ml: 1 }}>Batal</Button>
							</Box>
						</Box>
					</Box>
				</Modal>
				<Modal
					open={openModalGalangDana}
					onClose={handleCloseModalGalangDana}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={styleBox}>
						<Box sx={{ backgroundColor: '#1559E6', borderRadius: '4px 4px 0 0', p: 2 }}>
							<Typography variant='h3' color={'white'}>Formulir Galang Dana Non Beasiswa</Typography>
						</Box>
						<Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
							<Box sx={{ pb: 1 }}>
								<Typography variant='h3'>Informasi Galang Dana</Typography>
							</Box>
							<Divider />
							<Box sx={{ display: 'flex', pt: 1, width: '100%' }}>
								<Box sx={{width: '100%'}}>
									<Typography>Judul Galang Dana</Typography>
									<TextField size='small' variant='outlined' label='cth: Bantuan Dana Penyakit Usus Buntu' sx={{ width: '100%' }} onChange={(val) => {handleJudulGalangDanaChange(val.target.value)}}/>
								</Box>
								<Box sx={{ml: 2, width: '100%'}}>
									<Typography>Kategori Bantuan</Typography>
									<TextField select size='small' variant='outlined' label='cth: Beasiswa JTK' sx={{ width: '100%' }} onChange={(val) => {handleKategoriChange(val.target.value)}}>
									{
											kategoriSelect.map((option) => (
												<MenuItem key={option.value} value={option.value}>
													{option.label}
												</MenuItem>
											))
										}
									</TextField>
								</Box>
							</Box>
							<Box sx={{ pt: 1 }}>
								<Typography>Deskripsi</Typography>
								<TextField size='small' variant='outlined' label='cth: Bantuan dana untuk menanggulangi kebakaran rumah salah satu keluarga kita' sx={{ width: '468px' }} onChange={(val) => {handleDeskripsiChange(val.target.value)}}/>
							</Box>
							<Box sx={{ display: 'flex', pt: 1, width: '100%'}}>
								<Box sx={{width: '100%'}}>
									<Typography>Tanggal Berakhir</Typography>
									<TextField size='small' type='date' sx={{ width: '100%' }} onChange={(val) => {handleWaktuBerakhirChange(val.target.value)}}/>
								</Box>
								<Box sx={{ ml: 2, width: '100%' }}>
									<Typography>Nominal Dana Dibutuhkan</Typography>
									<TextField size='small' variant='outlined' label='cth: 5000000' sx={{ width: '100%' }} onChange={(val) => {handleKebutuhanDanaChange(val.target.value)}}/>
								</Box>
							</Box>
							<Box sx={{ pt: 2, display: 'flex', justifyContent: 'flex-end' }}>
								<Button variant='contained' onClick={createPenggalanganDanaNonBeasiswa}>Submit</Button>
								<Button variant='outlined' onClick={handleOpenNonBeasiswa} sx={{ ml: 1 }}>Sebelumnya</Button>
								<Button variant='outlined' onClick={handleCloseModalGalangDana} sx={{ ml: 1 }}>Batal</Button>
							</Box>
						</Box>
					</Box>
				</Modal>
			</Box>
			<Box >
				<Grid container spacing={2}>
					{cardList.map((info, index) =>
					(
						<Grid item md={6} >
							<CardInfo title={info.title} description={info.description} value={info.value} index={index} />
						</Grid>
					))}
				</Grid>
			</Box>
		</Container>
	);
}
export default Dashboard;
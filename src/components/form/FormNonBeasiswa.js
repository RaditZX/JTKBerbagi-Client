import { Typography, TextField, Container, MenuItem, Box, Button, FormControl, InputLabel, Select } from "@mui/material";
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useState } from "react";

import AutoComplete from "../molekul/autocomplete/AutoComplete";

function FormulirNonBeasiswa() {

	const [namaPenanggungJawab, setNamaPenanggungJawab] = useState('');
	const [noIdentitasPenanggungJawab, setNoIdentitasPenanggungJawab] = useState('');
	const [noTeleponPenanggungJawab, setNoTeleponPenanggungJawab] = useState('');
	const [namaPenerima, setNamaPenerima] = useState('');
	const [noIdentitasPenerima, setNoIdentitasPenerima] = useState('');
	const [noTeleponPenerima, setNoTeleponPenerima] = useState('');
	const [kategori, setKategori] = useState('');
	const [judulGalangDana, setJudulGalangDana] = useState('');
	const [deskripsi, setDeskripsi] = useState('');
	const [dokumenBantuan, setDokumenBantuan] = useState('');
	const [danaBantuan, setDanaBantuan] = useState('');
	const [tanggalBerakhir, setTanggalBerakhir] = useState('');
	const [namaPemilikRekening, setNamaPemilikRekening] = useState('');
	const [bankRekening, setBankRekening] = useState('');
	const [nomorRekening, setNomorRekening] = useState('');

	const handleNamaPenanggungJawabChange = (val) => {
		if (typeof val === 'object' && val !== null) {
			setNamaPenanggungJawab(val.nama || '');
			setNoIdentitasPenanggungJawab(val.nomor_induk || '');
		} else {
			setNamaPenanggungJawab(val); // allow manual input
		}
	}
	const handleNoIdentitasPenanggungJawabChange = (val) => {
		if (typeof val === 'object' && val !== null) {
			setNoIdentitasPenanggungJawab(val.nomor_induk || '');
			setNamaPenanggungJawab(val.nama || '');
		} else {
			setNoIdentitasPenanggungJawab(val); // allow manual input
		}
	}
	const handleNoTeleponPenanggungJawabChange = (val) => {
		setNoTeleponPenanggungJawab(val)
	}
	const handleNamaPenerimaChange = (val) => {
		if (typeof val === 'object' && val !== null) {
			setNamaPenerima(val.nama || '');
			setNoIdentitasPenerima(val.nomor_induk || '');
		} else {
			setNamaPenerima(val); // allow manual input
		}
	}
	const handleNoIdentitasPenerimaChange = (val) => {
		if (typeof val === 'object' && val !== null) {
			setNoIdentitasPenerima(val.nomor_induk || '');
			setNamaPenerima(val.nama || '');
		} else {
			setNoIdentitasPenerima(val.nomor_induk || '');
		}
	}
	const handleNoTeleponPenerimaChange = (val) => {
		setNoTeleponPenerima(val)
	}
	const handleKategoriChange = (val) => {
		setKategori(val)
	}
	const handleJudulGalangDanaChange = (val) => {
		setJudulGalangDana(val)
	}
	const handleDeskripsiChange = (val) => {
		setDeskripsi(val)
	}
	const handleDokumenBantuanChange = (val) => {
		setDokumenBantuan(val)
		console.log(val)
	}
	const handleDanaBantuanChange = (val) => {
		setDanaBantuan(val)
	}
	const handleTanggalBerakhirChange = (val) => {
		setTanggalBerakhir(val)
	}
	const handleNamaPemilikRekeningChange = (val) => {
		setNamaPemilikRekening(val)
	}
	const handleBankRekeningChange = (val) => {
		setBankRekening(val)
	}
	const handleNomorRekeningChange = (val) => {
		setNomorRekening(val)
	}

	const kategoriSelect = [
		{
			value: 'Medis',
			label: 'Medis'
		},
		{
			value: 'Bencana',
			label: 'Bencana',
		}
	]
	const createPengajuanNonBeasiswa = async () => {
		await fetch('http://localhost:8000/v1/pengajuan/pengajuan_bantuan/createPengajuanNonBeasiswa',
			{
				mode: 'cors',
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify({
					"nama_penanggung_jawab": namaPenanggungJawab,
					"nomor_induk_penanggung_jawab": noIdentitasPenanggungJawab,
					"nomor_telepon_penanggung_jawab": noTeleponPenanggungJawab,
					"nomor_rekening": nomorRekening,
					"nama_pemilik_rekening": namaPemilikRekening,
					"nama_bank": bankRekening,
					"judul_galang_dana": judulGalangDana,
					"waktu_galang_dana": tanggalBerakhir,
					"deskripsi_galang_dana": deskripsi,
					"dana_yang_dibutuhkan": danaBantuan,
					"nama_penerima": namaPenerima,
					"nomor_induk_penerima": noIdentitasPenerima,
					"nomor_telepon_penerima": noTeleponPenerima,
					"bukti_butuh_bantuan": dokumenBantuan,
					"kategori": kategori
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
	const renderPenanggungJawabSection = () => {
		return (
			<Box sx={{ width: '70%', display: 'flex', justifyContent: 'space-between' }}>
				<Box sx={{ minWidth: '50%' }}>
					<Timeline
						sx={{
							[`& .${timelineItemClasses.root}:before`]: {
								flex: 0,
							},
						}}
					>
						<TimelineItem>
							{/* <TimelineSeparator>
								<TimelineDot color="error" variant="outlined" />
								<TimelineConnector />
							</TimelineSeparator> */}
							<TimelineContent sx={{ width: 'max-content' }}><Typography variant='h3' sx={{ fontWeight: 'bold' }}>Pengajuan Bantuan Dana</Typography></TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineSeparator>
								<TimelineDot color="info" variant="outlined"/>
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent variant='h4' sx={{ width: 'max-content', fontWeight: '0' }}>Penanggung Jawab</TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineSeparator>
								<TimelineDot />
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent variant='body1' sx={{ width: 'max-content', fontWeight: '0' }}>Calon Penerima Bantuan Dana</TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineSeparator>
								<TimelineDot />
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent variant='body1'>Persyaratan</TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineSeparator>
								<TimelineDot />
							</TimelineSeparator>
							<TimelineContent variant='body1'>Informasi Lainnya</TimelineContent>
						</TimelineItem>
					</Timeline>
				</Box>
				<Box sx={{ minWidth: '50%', display: 'flex', flexDirection: 'column', mt: 4 }}>
					<Typography variant='h3' sx={{ fontWeight: 'bold' }}>Identitas Penanggung Jawab</Typography>
					<Typography variant='body1' sx={{ mt: 3, color: '#636E72', fontWeight: 'bold' }} >Nama Penanggung Jawab</Typography>
					{/* <TextField variant="outlined" size="small" label='cth: John Doe' onChange={(val) => { handleNamaPenanggungJawabChange(val.target.value) }}></TextField> */}
					<AutoComplete onChange={handleNamaPenanggungJawabChange} placeholder='cth: John Doe' textFieldLabel='cth: John' tableName='civitas_akademika' columnName='nama' suggestionDisplayField="nama" suggestionValueField="nama" value={namaPenanggungJawab}/>
					<Typography variant='body1' sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>NIM/NIP</Typography>
					{/* <TextField variant="outlined" size="small" label='Pilih NIM' onChange={(val) => { handleNoIdentitasPenanggungJawabChange(val.target.value) }}></TextField> */}
					<AutoComplete onChange={handleNoIdentitasPenanggungJawabChange} placeholder='cth: 231511000' textFieldLabel='cth: 231511000' tableName='civitas_akademika' columnName='nomor_induk' suggestionDisplayField="nomor_induk" suggestionValueField="nomor_induk" value={noIdentitasPenanggungJawab}/>
					<Typography variant='body1' sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>Nomor Telepon</Typography>
					<TextField variant="outlined" size="small" label='cth: 082121445524' onChange={(val) => { handleNoTeleponPenanggungJawabChange(val.target.value) }}></TextField>
					<div>
						<Button size="medium" variant="contained" onClick={() => setStep(1)} sx={{ mt: 4, textTransform: 'capitalize' }}>Selanjutnya</Button>
					</div>
				</Box>
			</Box>
		)
	}
	const renderCalonPenerimaBantuanDanaSection = () => {
		return (
			<Box sx={{ width: '70%', display: 'flex', justifyContent: 'space-between' }}>
				<Box sx={{ minWidth: '50%' }}>
					<Timeline
						sx={{
							[`& .${timelineItemClasses.root}:before`]: {
								flex: 0,
							},
						}}
					>
						<TimelineItem>
							{/* <TimelineSeparator>
								<TimelineDot color="error" variant="outlined" />
								<TimelineConnector />
							</TimelineSeparator> */}
							<TimelineContent sx={{ width: 'max-content' }}><Typography variant='h3' sx={{ fontWeight: 'bold' }}>Pengajuan Bantuan Dana</Typography></TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineSeparator>
								<TimelineDot color="success" />
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent variant='body1' sx={{ width: 'max-content', fontWeight: '0' }}>Penanggung Jawab</TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineSeparator>
								<TimelineDot color="info" variant="outlined"/>
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent variant='h4' sx={{ width: 'max-content', fontWeight: '0' }}>Calon Penerima Bantuan Dana</TimelineContent>
						</TimelineItem>

						<TimelineItem>
							<TimelineSeparator>
								<TimelineDot />
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent variant='body1'>Persyaratan</TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineSeparator>
								<TimelineDot />
							</TimelineSeparator>
							<TimelineContent variant='body1'>Informasi Lainnya</TimelineContent>
						</TimelineItem>
					</Timeline>
				</Box>
				<Box sx={{ minWidth: '50%', display: 'flex', flexDirection: 'column', mt: 4 }}>
					<Typography variant='h3' sx={{ fontWeight: 'bold' }}>Identitas Calon Penerima Bantuan Dana</Typography>
					<Typography variant='body1' sx={{ mt: 3, color: '#636E72', fontWeight: 'bold' }}>Pilih Kategori Bantuan</Typography>
					<TextField select variant="outlined" size="small" label='Pilih Kategori' onChange={(val) => { handleKategoriChange(val.target.value) }}>
						{
							kategoriSelect.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))
						}
					</TextField>
					<Typography variant='body1' sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>Nama Penerima</Typography>
					{/* <TextField variant="outlined" size="small" label='cth: John Doe' onChange={(val) => { handleNamaPenerimaChange(val.target.value) }}></TextField> */}
					<AutoComplete onChange={handleNamaPenerimaChange} placeholder='cth: John Doe' textFieldLabel='cth: John Doe' tableName='civitas_akademika' columnName='nama' suggestionDisplayField="nama" suggestionValueField="nama" value={namaPenerima}/>
					<Typography variant='body1' sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>NIM/NIP</Typography>
					{/* <TextField variant="outlined" size="small" label='Pilih NIM' onChange={(val) => { handleNoIdentitasPenerimaChange(val.target.value) }}></TextField> */}
					<AutoComplete onChange={handleNoIdentitasPenerimaChange} placeholder='cth: 231511000' textFieldLabel='cth: 231511000' tableName='civitas_akademika' columnName='nomor_induk' suggestionDisplayField="nomor_induk" suggestionValueField="nomor_induk" value={noIdentitasPenerima}/>
					<Typography variant='body1' sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>Nomor Telepon</Typography>
					<TextField variant="outlined" size="small" label='cth: 082121445524' onChange={(val) => { handleNoTeleponPenerimaChange(val.target.value) }}></TextField>
					<div>
						<Button size="medium" variant="contained" onClick={() => setStep(2)} sx={{ mt: 4, textTransform: 'capitalize' }}>Selanjutnya</Button>
						<Button size="medium" variant="outlined" onClick={() => setStep(0)} sx={{ mt: 4, ml: 2, textTransform: 'capitalize' }}>Sebelumnya</Button>
					</div>
				</Box>
			</Box>
		)
	}
	const formPersyaratanMedis = () => {
		return (
			<Box sx={{ minWidth: '50%', display: 'flex', flexDirection: 'column' }}>
				<Typography variant='body1' sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>Riwayat Medis</Typography>
				<TextField type="file" variant="outlined" size="small" onChange={(val) => { handleDokumenBantuanChange(val.target.files[0].name) }}></TextField>
				<Typography variant="caption" sx={{ color: 'red' }}>*Dokumen bukti riwayat medis</Typography>
			</Box>
		)
	}
	const formPersyaratanBencana = () => {
		return (
			<Box sx={{ minWidth: '50%', display: 'flex', flexDirection: 'column' }}>
				<Typography variant='body1' sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>Foto Bukti Butuh Bantuan</Typography>
				<TextField type="file" variant="outlined" size="small" onChange={(val) => { handleDokumenBantuanChange(val.target.value) }}></TextField>
				{/* <Typography variant="caption" sx={{ color: 'red' }}>*Gambar barang/bangunan yang terkena dampak bencana</Typography> */}
			</Box>
		)
	}
	const renderPersyaratanSection = () => {
		return (
			<Box sx={{ width: '70%', display: 'flex', justifyContent: 'space-between' }}>
				<Box sx={{ minWidth: '50%' }}>
					<Timeline
						sx={{
							[`& .${timelineItemClasses.root}:before`]: {
								flex: 0,
							},
						}}
					>
						<TimelineItem>
							{/* <TimelineSeparator>
								<TimelineDot color="error" variant="outlined" />
								<TimelineConnector />
							</TimelineSeparator> */}
							<TimelineContent sx={{ width: 'max-content' }}><Typography variant='h3' sx={{ fontWeight: 'bold' }}>Pengajuan Bantuan Dana</Typography></TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineSeparator>
								<TimelineDot color="success" />
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent variant='body1' sx={{ width: 'max-content', fontWeight: '0' }}>Penanggung Jawab</TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineSeparator>
								<TimelineDot color="success" />
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent variant='body1' sx={{ width: 'max-content', fontWeight: '0' }}>Calon Penerima Bantuan Dana</TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineSeparator>
								<TimelineDot color="info" variant="outlined"/>
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent variant='h4'>Persyaratan</TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineSeparator>
								<TimelineDot />
							</TimelineSeparator>
							<TimelineContent variant='body1'>Informasi Lainnya</TimelineContent>
						</TimelineItem>
					</Timeline>
				</Box>
				<Box sx={{ minWidth: '50%', display: 'flex', flexDirection: 'column', mt: 4 }}>
					<Typography variant='h3' sx={{ fontWeight: 'bold' }}>Persyaratan Pengajuan Bantuan Dana</Typography>
					<Typography variant='body1' sx={{ mt: 3, color: '#636E72', fontWeight: 'bold' }}>Judul Galang Dana</Typography>
					<TextField variant="outlined" size="small" label='cth: Bantuan Dana Untuk Operasi Jantung' onChange={(val) => { handleJudulGalangDanaChange(val.target.value) }}></TextField>
					<Typography variant='body1' sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>Deskripsi</Typography>
					<TextField variant="outlined" size="small" label='Ceritakan alasanmu mengajukan bantuan dana' onChange={(val) => { handleDeskripsiChange(val.target.value) }}></TextField>
					{
						kategori === "Medis" ? formPersyaratanMedis() : formPersyaratanBencana()
					}
					<div>
						<Button size="medium" variant="contained" onClick={() => setStep(3)} sx={{ mt: 4, textTransform: 'capitalize' }}>Selanjutnya</Button>
						<Button size="medium" variant="outlined" onClick={() => setStep(1)} sx={{ mt: 4, ml: 2, textTransform: 'capitalize' }}>Sebelumnya</Button>
					</div>
				</Box>

			</Box>
		)
	}

	const renderInfoGalangDanaSection = () => {
		return (
			<Box sx={{ width: '70%', display: 'flex', justifyContent: 'space-between' }}>
				<Box sx={{ minWidth: '50%' }}>
					<Timeline
						sx={{
							[`& .${timelineItemClasses.root}:before`]: {
								flex: 0,
							},
						}}
					>
						<TimelineItem>
							{/* <TimelineSeparator>
								<TimelineDot color="error" variant="outlined" />
								<TimelineConnector />
							</TimelineSeparator> */}
							<TimelineContent sx={{ width: 'max-content' }}><Typography variant='h3' sx={{ fontWeight: 'bold' }}>Pengajuan Bantuan Dana</Typography></TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineSeparator>
								<TimelineDot color="success" />
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent variant='body1' sx={{ width: 'max-content', fontWeight: '0' }}>Penanggung Jawab</TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineSeparator>
								<TimelineDot color="success" />
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent variant='body1' sx={{ width: 'max-content', fontWeight: '0' }}>Calon Penerima Bantuan Dana</TimelineContent>
						</TimelineItem>

						<TimelineItem>
							<TimelineSeparator>
								<TimelineDot color="success" />
								<TimelineConnector />
							</TimelineSeparator>
							<TimelineContent variant='body1'>Persyaratan</TimelineContent>
						</TimelineItem>
						<TimelineItem>
							<TimelineSeparator>
								<TimelineDot color="info" variant="outlined"/>
							</TimelineSeparator>
							<TimelineContent variant='h4'>Informasi Lainnya</TimelineContent>
						</TimelineItem>
					</Timeline>
				</Box>
				<Box sx={{ minWidth: '50%', display: 'flex', flexDirection: 'column', mt: 4 }}>
					<Typography variant='h3' sx={{ fontWeight: 'bold' }}>Informasi Penggalangan dan Penyaluran Dana</Typography>
					<Typography variant='body1' sx={{ mt: 3, color: '#636E72', fontWeight: 'bold' }}>Nominal Galang Dana</Typography>
					<TextField variant="outlined" size="small" label='cth: 5000000' onChange={(val) => { handleDanaBantuanChange(val.target.value) }}></TextField>
					<Typography variant="caption" sx={{ color: 'red' }}>*Nominal dana yang dibutuhkan</Typography>
					<Typography variant='body1' sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>Tanggal Berakhir Galang Dana</Typography>
					<TextField variant="outlined" size="small" type="date" onChange={(val) => { handleTanggalBerakhirChange(val.target.value) }}></TextField>
					<Typography variant='body1' sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>Nama Pemilik Rekening Penerima Dana</Typography>
					<TextField variant="outlined" size="small" label='cth: JOHN DOE' onChange={(val) => { handleNamaPemilikRekeningChange(val.target.value) }}></TextField>
					<Typography variant='body1' sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>Bank Rekening Penerima Dana</Typography>
					<TextField variant="outlined" size="small" label='cth: Bank Mandiri' onChange={(val) => { handleBankRekeningChange(val.target.value) }}></TextField>
					<Typography variant='body1' sx={{ mt: 2, color: '#636E72', fontWeight: 'bold' }}>Nomor Rekening Penerima Dana</Typography>
					<TextField variant="outlined" size="small" label='cth: 130004621001' onChange={(val) => { handleNomorRekeningChange(val.target.value) }}></TextField>
					<Typography variant="caption" sx={{ color: 'red' }}>*Pastikan seluruh informasi diisi dengan benar!</Typography>
					<div>
						<Button size="medium" variant="contained" onClick={createPengajuanNonBeasiswa} sx={{ mt: 4, textTransform: 'capitalize' }}>Submit</Button>
						<Button size="medium" variant="outlined" onClick={() => setStep(2)} sx={{ mt: 4, ml: 2, textTransform: 'capitalize' }}>Sebelumnya</Button>
					</div>
				</Box>
			</Box>
		)
	}
	const getRenderSection = () => {
		let form;
		switch (step) {
			case 0: form = renderPenanggungJawabSection()
				break;
			case 1: form = renderCalonPenerimaBantuanDanaSection()
				break;
			case 2: form = renderPersyaratanSection()
				break;
			case 3: form = renderInfoGalangDanaSection()
				break;
			default: break;
		}
		return form;
	}
	const [step, setStep] = useState(0);
	return (
		<Container sx={{ display: 'flex' }}>
			{
				getRenderSection()
			}
		</Container>

	)
}
export default FormulirNonBeasiswa;
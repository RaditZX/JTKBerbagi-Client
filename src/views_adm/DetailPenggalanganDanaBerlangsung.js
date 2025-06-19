import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';

function DetailPenggalanganDanaBerlangsung() {
  const [penggalanganData, setpenggalanganData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/v1/penggalangan/penggalangan_dana/getAllPenggalanganDana')
        .then(response => {
        if (response.data && response.data.data) {
            setpenggalanganData(response.data.data); // akses array-nya
        } else {
            console.warn("Tidak ada data ditemukan");
        }
        })
        .catch(error => console.error("Gagal mengambil data:", error));
    }, []);


  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Detail Bantuan Dana Non Beasiswa</Typography>
      {penggalanganData.map((item, i) => (
        <Card key={i} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{item.judul}</Typography>
            <Typography variant="body2">Deskripsi: {item.deskripsi}</Typography>
            <Typography variant="body2">Dana Dibutuhkan: Rp{item.dana_yang_dibutuhkan}</Typography>
            <Typography variant="body2">Kategori: {item.kategori}</Typography>
            {/* Tambah sesuai data yang dibutuhkan */}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default DetailPenggalanganDanaBerlangsung;

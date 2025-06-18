import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

export function ModalFormRekening({ isOpen, onClose, initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    nomor_rekening: "",
    nama_bank: "",
    nama_pemilik_rekening: "",
  });

  console.log("Initial Data:", initialData);

  // Sync initialData setiap modal dibuka / data berubah
  useEffect(() => {
    if (isOpen) {
    setForm({
        nomor_rekening: initialData.rekening_bank.nomor_rekening || "",
        nama_bank: initialData.rekening_bank.nama_bank || "",
        nama_pemilik_rekening: initialData.rekening_bank.nama_pemilik_rekening || "",
        nim: initialData.mahasiswa.nim || "",
        });
    }
   
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

 const updateRekeningMahasiswa = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/v1/civitas_akademika/updateRekeningMahasiswa",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            nomor_rekening: form.nomor_rekening,
            nama_bank: form.nama_bank,
            nim: form.nim,
            nama_pemilik_rekening: form.nama_pemilik_rekening,
          }),
        }
      );

      const data = await response.json();

      let arrayData = [];
      arrayData.push(data.data.nominal_penyaluran);
      console.log("Nominal penyaluran:", data.data.nominal_penyaluran);
    } catch (err) {
      console.error("Error update rekening:", err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRekeningMahasiswa();
    onClose();
    window.location.reload();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Rekening Mahasiswa</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <TextField
            fullWidth
            margin="normal"
            label="Nomor Rekening"
            name="nomor_rekening"
            value={form.nomor_rekening}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Nama Bank"
            name="nama_bank"
            value={form.nama_bank}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Nama Pemilik Rekening"
            name="nama_pemilik_rekening"
            value={form.nama_pemilik_rekening}
            onChange={handleChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Simpan
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

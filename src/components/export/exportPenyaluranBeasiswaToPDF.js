import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import React, { useState } from "react";

export function ExportButtonWithValidation({ penerimaBeasiswa, monthArray, id }) {
  const [open, setOpen] = useState(false);

  const handleExportClick = () => {
    if (!id || !monthArray || monthArray.length === 0) {
      setOpen(true); // Tampilkan modal jika id atau monthArray kosong
      return;
    }
    exportPenyaluranBeasiswaToPDF(penerimaBeasiswa, monthArray);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        id="basic-button"
        onClick={handleExportClick}
        style={{ marginRight: "16px" }}
      >
        <Typography>ExportToPDF</Typography>
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Data Tidak Lengkap</DialogTitle>
        <DialogContent>
          <Typography>
            Mohon pastikan data ID dan bulan telah dipilih sebelum mengekspor PDF.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export function ExportPenerimaNonBeasiswaButtonWithValidation({ penerimaNonBeasiswa }) {
  const [open, setOpen] = useState(false);

  const handleExportClick = () => {
    if (penerimaNonBeasiswa.length === 0) {
      setOpen(true); // Tampilkan modal jika id atau monthArray kosong
      return;
    }
    exportPenyaluranNonBeasiswaToPDF(penerimaNonBeasiswa);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        id="basic-button"
        onClick={handleExportClick}
        style={{ marginRight: "16px" }}
      >
        <Typography>ExportToPDF</Typography>
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Data Kosong</DialogTitle>
        <DialogContent>
          <Typography>
            Mohon maaf saat ini tidak ada data penerima non beasiswa yang tersedia untuk diekspor.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export const exportPenyaluranBeasiswaToPDF = (penerimaBeasiswa, monthArray) => {
  const doc = new jsPDF({
    unit: "pt", // satuan point (lebih presisi)
    format: "a4",
  });

  console.dir(monthArray)

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  let y = margin;

  // Header Title
  doc.setFontSize(18);
  doc.setTextColor("#2c3e50");
  doc.setFont("helvetica", "bold");
  doc.text("Laporan Penyaluran Beasiswa", pageWidth / 2, y, { align: "center" });
  y += 30;

  // Garis bawah header
  doc.setDrawColor("#2980b9");
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 20;

  penerimaBeasiswa.forEach((data, index) => {
    const mhs = data.mahasiswa;
    const rekening = data.rekening_bank;

    // Section title (Mahasiswa #)
    doc.setFontSize(14);
    doc.setTextColor("#34495e");
    doc.setFont("helvetica", "bold");
    doc.text(`Mahasiswa #${index + 1}`, margin, y);
    y += 18;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#2c3e50");

    doc.text(`NIM: ${mhs.nim}`, margin, y);
    y += 14;
    doc.text(`Nama: ${mhs.nama}`, margin, y);
    y += 14;
    doc.text(`No HP: ${mhs.nomor_telepon}`, margin, y);
    y += 14;

    doc.text(`Bank: ${rekening.nama_bank}`, margin, y);
    y += 14;
    doc.text(`No Rekening: ${rekening.nomor_rekening}`, margin, y);
    y += 14;
    doc.text(`Pemilik Rekening: ${rekening.nama_pemilik_rekening}`, margin, y);
    y += 20;

    // Siapkan data tabel penyaluran
    const tableData = data.nominal_penyaluran.map((nominal, i) => [
    monthArray?.[i]?.value ? `${monthArray[i+1].value}` : `Bulan ${i + 1}`,
    `Rp ${nominal.toLocaleString("id-ID")}`,
    (data.status_penyaluran && data.status_penyaluran[i] === 1) ? "Tersalurkan" : "Belum Tersalurkan",
    ]);



    autoTable(doc, {
      startY: y,
      head: [["Bulan", "Nominal", "Status Penyaluran"]],
      body: tableData,
      styles: {
        font: "helvetica",
        fontSize: 11,
        cellPadding: 5,
      },
      headStyles: {
        fillColor: "#2980b9",
        textColor: "#ffffff",
        fontStyle: "bold",
        halign: "center",
      },
      bodyStyles: {
        halign: "center",
      },
      alternateRowStyles: {
        fillColor: "#ecf0f1",
      },
      margin: { left: margin, right: margin },
      didDrawPage: (data) => {
        // Update y posisi setelah tabel selesai untuk data selanjutnya
        y = data.cursor.y + 30;
      },
    });

    // Jika y sudah mendekati batas bawah halaman, buat halaman baru
    if (y > doc.internal.pageSize.getHeight() - 100) {
      doc.addPage();
      y = margin;
    }
  });

  // Footer - page number
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor("#7f8c8d");
    doc.text(`Halaman ${i} dari ${pageCount}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 10, {
      align: "right",
    });
  }

  doc.save("rekap_penyaluran.pdf");
};

export const exportPenyaluranNonBeasiswaToPDF = (dataPenerimaNonBeasiswa) => {
  const doc = new jsPDF({
    unit: "pt", // satuan point (lebih presisi)
    format: "a4",
  });



  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  let y = margin;

  // Header Title
  doc.setFontSize(18);
  doc.setTextColor("#2c3e50");
  doc.setFont("helvetica", "bold");
  doc.text("Laporan Penyaluran Beasiswa", pageWidth / 2, y, { align: "center" });
  y += 30;

  // Garis bawah header
  doc.setDrawColor("#2980b9");
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 20;

  dataPenerimaNonBeasiswa.forEach((data, index) => {

    // Section title (Mahasiswa #)
    doc.setFontSize(14);
    doc.setTextColor("#34495e");
    doc.setFont("helvetica", "bold");
    doc.text(`Mahasiswa #${index + 1}`, margin, y);
    y += 18;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#2c3e50");

    doc.text(`NIM: ${data.penerima_non_beasiswa.nomor_induk}`, margin, y);
    y += 14;
    doc.text(`Nama: ${data.penerima_non_beasiswa.nama}`, margin, y);
    y += 14;
    doc.text(`No HP: ${data.penerima_non_beasiswa.nomor_telepon}`, margin, y);
    y += 14;

    doc.text(`Mama Penanggung Jawab: ${data.penanggung_jawab_non_beasiswa_id.nama}`, margin, y);
    y += 14;
    doc.text(`No Telepon Penanggung Jawab: ${data.penanggung_jawab_non_beasiswa_id.nomor_telepon}`, margin, y);
    y += 14;
    doc.text(`Total Dana Dibutuhkan: Rp${data.dana_yang_dibutuhkan.toLocaleString("id-ID")}`, margin, y);
    y += 14;
    doc.text(`Total Dana Disalurkan: Rp${data.total_nominal_terkumpul.toLocaleString("id-ID")}`, margin, y);
    y += 14;
    doc.text(`Status: ${data.status_penyaluran === 0 ? "Belum Disalurkan": "Tersalurkan"}`, margin, y);
    y += 20;

  });

  // Footer - page number
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor("#7f8c8d");
    doc.text(`Halaman ${i} dari ${pageCount}`, pageWidth - margin, doc.internal.pageSize.getHeight() - 10, {
      align: "right",
    });
  }

  doc.save("rekap_penyaluran.pdf");
};


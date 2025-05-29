import { Typography, Container, Box, Button } from "@mui/material";

function FinishRedirect() {
  const handleBackToHome = () => {
    window.location.href = '/form-donasi';
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2
      }}
    >
      <Container maxWidth="sm">
        <Box textAlign="center" sx={{ maxWidth: 400, mx: 'auto' }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 600,
              color: '#374151',
              mb: 2
            }}
          >
            Terima Kasih Sudah Berdonasi
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#6b7280',
              mb: 4,
              lineHeight: 1.6
            }}
          >
            Donasi Anda sangat berarti dan akan membantu banyak orang yang membutuhkan.
          </Typography>
          
          <Button
            onClick={handleBackToHome}
            variant="outlined"
            sx={{
              px: 3.5,
              py: 1.5,
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              color: '#374151',
              fontWeight: 500,
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              '&:hover': {
                backgroundColor: '#f9fafb',
                borderColor: '#9ca3af'
              }
            }}
          >
            Kembali ke Beranda
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default FinishRedirect;
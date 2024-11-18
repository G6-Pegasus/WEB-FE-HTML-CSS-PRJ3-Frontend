import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const ComingSoon: React.FC = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: 'center',
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box>
        <HourglassEmptyIcon sx={{ fontSize: 80, color: '#6c63ff' }} />
      </Box>
      <Typography variant="h4" sx={{ marginTop: 2, fontWeight: 'bold' }}>
        Coming Soon!
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2, color: '#555' }}>
        We're working hard to bring you this page. Please check back later.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 4 }}
        onClick={() => (window.location.href = '/')}
      >
        Back to Home
      </Button>
    </Container>
  );
};

export default ComingSoon;
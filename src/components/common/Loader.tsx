import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semi-transparente
      }}
    >
      <CircularProgress size={50} thickness={4} color="primary" />
    </Box>
  );
};

export default Loader;
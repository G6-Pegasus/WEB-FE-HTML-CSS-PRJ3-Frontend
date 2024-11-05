import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorComponentProps {
  message?: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ 
  message = "An unexpected error occurred. Please try again later."
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fdecea', // Fondo rosado claro
        color: '#b71c1c', // Texto rojo oscuro
        padding: '16px',
        borderRadius: '8px',
        width: '100%', // Ocupa todo el ancho del contenedor
        boxSizing: 'border-box',
      }}
    >
      <ErrorOutlineIcon sx={{ marginRight: '8px' }} />
      <Typography variant="body1">
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorComponent;
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListCustomers from '../components/customers/ListCustomers'; 
import TestApp from './testApp';

describe('ListCustomers Component', () => {

  test('renders customer details', async () => {
    render(<TestApp><ListCustomers /></TestApp>);

    // Verificar que los detalles de los clientes se muestran correctamente
    await waitFor(() => {
      expect(screen.getByTestId('1')).toBeInTheDocument();
    })
  });

  test('renders loading state correctly', () => {
    render(<TestApp><ListCustomers /></TestApp>);

    // Asegurarse de que el componente muestra el esqueleto de carga
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });
});

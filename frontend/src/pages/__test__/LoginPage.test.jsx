import { render, screen } from '@testing-library/react';
import LoginPage from '../LoginPage';
import { BrowserRouter } from 'react-router';

describe('LoginPage', () => {
  test('muestra inputs y botón', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
  });
});
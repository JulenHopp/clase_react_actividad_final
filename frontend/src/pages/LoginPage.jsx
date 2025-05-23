 // src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token); // 💾 Guardar token
      navigate('/adminusuarios'); // 👈 Redirigir a una ruta protegida
    } else {
      alert(data.error || 'Error al iniciar sesión');
    }
  };

  return (
    <>
        <p>ejmplo_email_valido: julen@gmail.com, Contraseña: 1234</p>
        <form onSubmit={handleLogin}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
        <button type="submit">Iniciar sesión</button>
        </form>
    </>
  );
}

export default LoginPage;
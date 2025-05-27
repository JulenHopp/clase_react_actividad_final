import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
 
export default function AdminUsuarios() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [editandoId, setEditandoId] = useState(null);

  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const cargarUsuarios = async () => {
    const res = await fetch('zjulen.azurewebsites.net:3000/api/usuarios', { headers });
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editandoId
      ? `zjulen.azurewebsites.net:3000/api/usuarios/${editandoId}`
      : 'zjulen.azurewebsites.net:3000/api/usuarios';

    const method = editandoId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ username: '', email: '', password: '' });
      setEditandoId(null);
      await cargarUsuarios();
    } else {
      alert('Error al guardar el usuario');
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`zjulen.azurewebsites.net:3000/api/usuarios/${id}`, {
      method: 'DELETE',
      headers,
    });
    if (res.ok) {
      await cargarUsuarios();
    } else {
      alert('Error al eliminar el usuario');
    }
  };

  const handleEdit = (usuario) => {
    setForm({ username: usuario.username, email: usuario.email, password: '' });
    setEditandoId(usuario.id || usuario._id); // soporta Mongo o SQL
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // ❌ Eliminar el token
    navigate('/login'); // 🔁 Redirigir al login
  };

  return (
    <div>
      <h2>Administración de Usuarios</h2>
      <button onClick={handleLogout}>
        Cerrar sesión
      </button>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Usuario"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Contraseña"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required={!editandoId}
        />
        <button type="submit">{editandoId ? 'Actualizar' : 'Crear'}</button>
        {editandoId && <button onClick={() => { setEditandoId(null); setForm({ username: '', email: '', password: '' }); }}>Cancelar</button>}
      </form>

      <table border="1" cellPadding={10} style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id || u._id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Editar</button>
                <button onClick={() => handleDelete(u.id || u._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
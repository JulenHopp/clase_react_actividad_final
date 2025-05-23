import { BrowserRouter as Router, Routes, Route } from 'react-router';
import LoginPage from './pages/LoginPage';
import AdminUsuarios from './pages/AdminUsuarios'; // ejemplo
import ProtectedRoute from './components/ProtectedRoute';

import './App.css' 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/adminusuarios"
          element={
            <ProtectedRoute>
              <AdminUsuarios />
            </ProtectedRoute>
          }
        />
        {/* Agrega más rutas protegidas aquí */}
        <Route path="*" element={<ProtectedRoute><AdminUsuarios /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App;

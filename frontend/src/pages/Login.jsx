import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth(); // Utilisation du contexte

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Connexion via l'API
      const res = await axios.post('http://localhost:5000/api/users/login', formData);

      // Stocker le token et le nom d'utilisateur dans localStorage
      localStorage.setItem('userId', res.data.userId); // ID de l'utilisateur
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);

      // Mettre à jour l'état global d'authentification
      setIsAuthenticated(true);

      // Rediriger vers la page de chat
      navigate('/chat');
    } catch (err) {
      alert(err.response?.data?.message || 'Une erreur est survenue'); // Gérer les erreurs
    }
  };

  return (
    <div className="container">
      <div align="center" className="item">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2><br />
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
          /><br />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          /><br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

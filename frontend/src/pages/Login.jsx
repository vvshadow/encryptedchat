import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Connexion via l'API
      const res = await axios.post('http://localhost:5000/api/users/login', formData);

      // Stocker le token et le nom d'utilisateur dans localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username); // Assurez-vous que `res.data.username` contient bien le nom d'utilisateur récupéré de l'API

      navigate('/chat'); // Redirige vers la page de chat après une connexion réussie
    } catch (err) {
      alert(err.response.data.message); // Gérer les erreurs si la connexion échoue
    }
  };

  return (
    <div class="container">
      <div align="center" class="item">
    <form onSubmit={handleSubmit}>
      <h2>Login</h2><br></br>
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
      /><br></br>
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        value={formData.password}
      /><br></br>
      <button  type="submit">Login</button>
    </form>
    </div></div>
  );
};

export default Login;

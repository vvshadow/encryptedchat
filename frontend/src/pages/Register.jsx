// frontend/src/pages/Register.jsx
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      alert(res.data.message);
      navigate('/login'); // Redirige vers la page de login
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div class="container">
      <div align="center" class="item">
    <form onSubmit={handleSubmit}>
      <h2>Register</h2><br></br>
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        value={formData.username}
      /><br></br>
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
      <button type="submit">Sign Up</button>
    </form>
    </div>
    </div>
  );
};

export default Register;

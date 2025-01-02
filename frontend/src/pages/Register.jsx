import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Tooltip from '../components/Tooltip';
import AnimatedLogo from '../components/AnimatedLogo';


const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, formData);
      alert(res.data.message);
      navigate('/login'); // Redirige vers la page de login
    } catch (err) {
      alert(err.response?.data?.message || 'Une erreur est survenue');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#23272a' }}>
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <AnimatedLogo />
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Votre nom d'utilisateur"
              onChange={handleChange}
              value={formData.username}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-400 focus:border-green-400 text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Votre email"
              onChange={handleChange}
              value={formData.email}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-400 focus:border-green-400 text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Votre mot de passe"
              onChange={handleChange}
              value={formData.password}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-400 focus:border-green-400 text-gray-900"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md shadow transition duration-300"
            style={{
              backgroundColor: '#00E487',
              color: 'white',
            }}
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-700">
            J'ai déjà un compte {' '}
            <Link to="/login" className="text-green-500 hover:underline">
              Connectez-vous ici
            </Link>
          </p>
        </div>
        <Tooltip />
      </div>
    </div>
  );
};

export default Register;

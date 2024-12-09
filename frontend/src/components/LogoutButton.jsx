import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuth(); // Récupère la fonction `logout` du contexte
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Appelle la fonction de déconnexion
    navigate('/login'); // Redirige vers la page de login
  };

  return <button class="btn-logout" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;

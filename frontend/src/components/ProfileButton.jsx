import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileButton = () => {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('/profile'); // Redirige vers la page de profil
  };

  return (
    <button onClick={handleProfile} class="btn-friends">
      Mon Profil
    </button>
  );
};

// Styles basiques pour le bouton
const styles = {
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: '0.3s',
  },
};

export default ProfileButton;

import axios from 'axios';
import React, { useState } from 'react';

const SendFriendRequest = ({ userId, friendId }) => {
  const [message, setMessage] = useState('');

  const sendRequest = async () => {
    try {
      await axios.post('/api/friends/send', { userId, friendId });
      setMessage('Demande envoyée avec succès');
    } catch (error) {
      setMessage('Erreur lors de l\'envoi de la demande');
    }
  };

  return (
    <div>
      <button onClick={sendRequest}>Envoyer une demande d'ami</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SendFriendRequest;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState('');

  const fetchFriends = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Vérifiez que l'ID utilisateur est stocké
      if (!userId) {
        setError('Utilisateur non connecté');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/friends/accepted', {
        params: { userId }, // Ajoutez le userId comme paramètre
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setFriends(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des amis:', error);  console.log(localStorage.getItem('userId'));
      setError('Impossible de récupérer la liste des amis.');
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div class="container">
    <div class="item">
      <h1>Liste d'amis</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {friends.length > 0 ? (
        friends.map((friend) => (
          <div key={friend._id}>
            <p>Nom : {friend.friendId.username}</p>
          </div>
        ))
      ) : (
        <p>Aucun ami trouvé.</p>
      )}
    </div>
    </div>
  );
};

export default FriendsList;

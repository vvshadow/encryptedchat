// src/components/FriendList.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FriendList = ({ userId }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`/api/friends/${userId}/accepted`);
        setFriends(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des amis', error);
      }
    };

    fetchFriends();
  }, [userId]);

  return (
    <div>
      <h2>Mes Amis</h2>
      {friends.length === 0 ? (
        <p>Aucun ami trouvé.</p>
      ) : (
        <ul>
          {friends.map(friend => (
            <li key={friend._id}>{friend.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendList;

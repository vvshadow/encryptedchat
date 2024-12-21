// src/components/FriendRequests.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FriendRequests = ({ userId }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`/api/friends/${userId}/pending`);
        setRequests(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des demandes', error);
      }
    };

    fetchRequests();
  }, [userId]);

  const handleAccept = async (friendId) => {
    try {
      await axios.put('/api/friends/accept', { userId, friendId });
      setRequests(requests.filter(request => request.friendId !== friendId));  // Retirer la demande acceptée
    } catch (error) {
      console.error('Erreur lors de l\'acceptation de la demande', error);
    }
  };

  const handleReject = async (friendId) => {
    try {
      await axios.put('/api/friends/reject', { userId, friendId });
      setRequests(requests.filter(request => request.friendId !== friendId));  // Retirer la demande rejetée
    } catch (error) {
      console.error('Erreur lors du refus de la demande', error);
    }
  };

  return (
    <div>
      <h2>Demandes d'Ami</h2>
      {requests.length === 0 ? (
        <p>Aucune demande en attente.</p>
      ) : (
        <ul>
          {requests.map(request => (
            <li key={request._id}>
              {request.username}
              <button onClick={() => handleAccept(request.friendId)}>Accepter</button>
              <button onClick={() => handleReject(request.friendId)}>Refuser</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendRequests;

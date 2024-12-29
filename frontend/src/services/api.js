import axios from 'axios';

// Définir la base URL pour les requêtes API
axios.defaults.baseURL = 'http://localhost:5000';

// Envoi de la demande d'ami
export const sendFriendRequest = (userId, friendId) => {
  return axios.post('/api/friends/send', { userId, friendId });
};

// Acceptation de la demande d'ami
export const acceptFriendRequest = (userId, friendId) => {
  return axios.put('/api/friends/accept', { userId, friendId });
};

// Refus de la demande d'ami
export const rejectFriendRequest = (userId, friendId) => {
  return axios.put('/api/friends/reject', { userId, friendId });
};

// Récupérer la liste des amis acceptés
export const getFriends = (userId) => {
  return axios.get(`/api/friends/${userId}/accepted`);
};

// Récupérer la liste des demandes d'amis en attente
export const getPendingRequests = (userId) => {
  return axios.get(`/api/friends/${userId}/pending`);
};

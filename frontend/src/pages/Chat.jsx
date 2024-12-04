import axios from 'axios';
import { useEffect, useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [to, setTo] = useState('');
  const [username, setUsername] = useState('');

  // Récupérer le nom d'utilisateur depuis localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername); // Mettre à jour le state avec le nom d'utilisateur
    } else {
      setUsername('JohnDoe'); // Valeur par défaut si rien n'est trouvé dans localStorage
    }
  }, []); // useEffect s'exécute une seule fois au montage du composant

  const fetchMessages = async () => {
    if (username && to) {
      try {
        const res = await axios.get(`http://localhost:5000/api/messages/${username}/${to}`);
        setMessages(res.data);
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && username && to) {
      try {
        await axios.post('http://localhost:5000/api/messages/send', { from: username, to, message: newMessage });
        setNewMessage('');
        fetchMessages(); // Récupère les nouveaux messages après l'envoi
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  useEffect(() => {
    if (to && username) {
      fetchMessages(); // Appel API pour récupérer les messages si "to" et "username" sont définis
    }
  }, [to, username]); // Dépendance sur "to" et "username"

  return (
    <div>
      <h2>Chat</h2>
      <input placeholder="Receveur" onChange={(e) => setTo(e.target.value)} />
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}>
            <b>{msg.from}:</b> {msg.message}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input placeholder="Votre message" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button type="submit">Envoyé</button>
      </form>
    </div>
  );
};

export default Chat;

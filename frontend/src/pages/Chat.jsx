import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import LogoutButton from '../components/LogoutButton';



const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [to, setTo] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername); 
    } else {
      setUsername('JohnDoe');
    }
  }, []);

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
        fetchMessages();
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  useEffect(() => {
    if (to && username) {
      fetchMessages();
    }
  }, [to, username]);

  return (

    <div className="container">
      <div className="item">
        
        <h1>ShieldyTalk</h1>
        <input 
          placeholder="Receveur" 
          onChange={(e) => setTo(e.target.value)} 
        />
        <div className="input-area">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.from === username ? 'from' : 'to'}`}>
              <b>{msg.from}:</b> {msg.message}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage}>
          <input 
            placeholder="Votre message" 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)} 
          />
          <button class="send" type="submit" disabled={!newMessage.trim()}>
            <IoIosSend size={20} />
          </button>
        </form>
        <LogoutButton class="btn-logout" /> {/* Ajoute le bouton de déconnexion */}
      </div>
    </div>
    
  );
};

export default Chat;

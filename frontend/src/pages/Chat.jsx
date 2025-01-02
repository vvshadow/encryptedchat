import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import styled from 'styled-components';
import LogoutButton from '../components/LogoutButton';
import ProfileButton from '../components/ProfileButton';
import FriendList from '../components/FriendList';
import { useNavigate } from 'react-router-dom';
import AnimatedLogo from '../components/AnimatedLogo';
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [to, setTo] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

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
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/messages/${username}/${to}`);
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
        await axios.post(`${process.env.REACT_APP_API_URL}/api/messages/send`, { from: username, to, message: newMessage });
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

  const goToFriendsPage = () => {
    navigate('/friends');
  };

  return (
    <StyledChat>
      <div className="chat-container">
        {/* <h1 className="title">ShieldyTalk</h1> */}
      <AnimatedLogo />
        <input 
          className="receiver-input"
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
        <form onSubmit={sendMessage} className="message-form">
          <input 
            className="message-input"
            placeholder="Votre message" 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)} 
          />
          <button className="send-button" type="submit" disabled={!newMessage.trim()}>
            <IoIosSend size={20} />
          </button>
        </form>
        
        <button onClick={goToFriendsPage} className="btn-friends">
          Voir mes amis
        </button>

        <LogoutButton className="btn-friends" />
        <ProfileButton />
      </div>
    </StyledChat>
  );
};

const StyledChat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #23272a;

  .chat-container {
    width: 90%;
    max-width: 500px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .title {
    font-size: 2rem;
    font-family: 'Poppins', sans-serif;
    text-align: center;
    color: #00E487;
    margin-bottom: 10px;
  }

  .receiver-input, .message-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
  }

  .receiver-input:focus, .message-input:focus {
    border-color: #00E487;
    box-shadow: 0 0 5px rgba(0, 228, 135, 0.5);
  }

  .input-area {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 300px;
    overflow-y: auto;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #f9f9f9;
  }

  .message {
    padding: 8px;
    border-radius: 5px;
    font-size: 0.9rem;
  }

  .message.from {
    align-self: flex-end;
    background: #00E487;
    color: white;
  }

  .message.to {
    align-self: flex-start;
    background: #e0f7ec;
    color: #333;
  }

  .message-form {
    display: flex;
    gap: 10px;
  }

  .send-button {
    background: #00E487;
    border: none;
    border-radius: 5px;
    color: white;
    padding: 10px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .send-button:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 10px rgba(0, 228, 135, 0.3);
  }

  .send-button:disabled {
    background: #ddd;
    cursor: not-allowed;
  }

  .btn-friends {
    background: linear-gradient(90deg, #00E487, #00C176);
    border: none;
    color: white;
    border-radius: 5px;
    padding: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition-duration: 0.3s;
  }

  .btn-friends:hover {
    background: linear-gradient(90deg, #00C176, #00E487);
    transform: scale(1.02);
  }
`;

export default Chat;

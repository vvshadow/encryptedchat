// frontend/src/App.jsx
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Chat from './pages/Chat'; // Page du chat après connexion
import Login from './pages/Login'; // Page de connexion
import Register from './pages/Register'; // Page d'inscription
import "./App.css";
import { IoIosAddCircle, IoMdHeart } from "react-icons/io";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        {/* Autres routes */}
      </Routes>
    </Router>
  );
};

export default App;

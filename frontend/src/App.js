// frontend/src/App.jsx
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Chat from './pages/Chat'; // Page du chat après connexion
import Login from './pages/Login'; // Page de connexion
import Register from './pages/Register'; // Page d'inscription
import Profile from './pages/Profile'
import Friend from './pages/Friend';
const App = () => {
  return ( <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
       
        <Route
            path="/Chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/* Route pour la page d'amis */}
          <Route
            path="/friends"
            element={
              <ProtectedRoute>
                <Friend />
              </ProtectedRoute>
            }
          />
        {/* Autres routes */}
      </Routes>
    </Router></AuthProvider>
  );
};

export default App;
// <Route path="/chat" element={<Chat />} />
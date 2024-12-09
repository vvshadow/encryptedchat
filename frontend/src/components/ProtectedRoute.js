// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirection vers la page de login
  }

  return children; // Affiche le contenu protégé
};

export default ProtectedRoute;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userSchema, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
      //  console.log("Token récupéré:", token); // Log du token

        if (!token) {
          setError("Token introuvable. Veuillez vous reconnecter.");
          console.log("Token manquant, redirection vers login");
          navigate("/login"); // Redirige vers la page de login si le token est manquant
          return;
        }

        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Données récupérées:", res.data); // Log des données utilisateur
        setUserData(res.data); // Met à jour les données utilisateur si tout va bien
      } catch (err) {
        console.error("Erreur API:", err.response || err.message);
        
        if (err.response && err.response.status === 401) {
          setError("Session expirée. Veuillez vous reconnecter.");
          localStorage.removeItem("token"); // Supprime le token invalide
          navigate("/login"); // Redirige vers login
        } else {
          setError("Erreur lors de la récupération du profil.");
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  if (error) return <div>{error}</div>;

  if (!userSchema) return <div>Chargement...</div>;

  return (
    <div class="container">
      <div class="item">
      <h2>Profil de {userSchema.username}</h2>
      <p>Email : {userSchema.email}</p>
      
    </div>
    </div>
  );
};

export default Profile;

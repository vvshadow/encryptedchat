import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userSchema, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null); // État pour l'image
  const [newUsername, setNewUsername] = useState(""); // État pour le pseudo
  const [newPassword, setNewPassword] = useState(""); // État pour le mot de passe
  const [successMessage, setSuccessMessage] = useState(null); // Message de succès
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Token introuvable. Veuillez vous reconnecter.");
          navigate("/login");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(res.data);
      } catch (err) {
        console.error("Erreur API:", err.response || err.message);

        if (err.response && err.response.status === 401) {
          setError("Session expirée. Veuillez vous reconnecter.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Erreur lors de la récupération du profil.");
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  // Gestion de la mise à jour de la photo de profil
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Veuillez sélectionner une image.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", image);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/users/profile/picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserData((prevData) => ({
        ...prevData,
        profileImage: response.data.profileImage,
      }));
      setSuccessMessage("Photo de profil mise à jour avec succès !");
      setError(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la photo", error);
      setError("Erreur lors de la mise à jour de la photo de profil.");
    }
  };

  // Gestion de la mise à jour du pseudo
  const handleUsernameSubmit = async (e) => {
    e.preventDefault();

    if (!newUsername) {
      setError("Veuillez entrer un nouveau pseudo.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/users/profile/username",
        { username: newUsername },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData((prevData) => ({
        ...prevData,
        username: response.data.username,
      }));
      setSuccessMessage("Pseudo mis à jour avec succès !");
      setNewUsername("");
      setError(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du pseudo", error);
      setError("Erreur lors de la mise à jour du pseudo.");
    }
  };

  // Gestion de la mise à jour du mot de passe
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      setError("Veuillez entrer un nouveau mot de passe.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/users/profile/password",
        { password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Mot de passe mis à jour avec succès !");
      setNewPassword("");
      setError(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du mot de passe", error);
      setError(
        "Le mot de passe doit contenir au moins 12 caractères et 2 caractères spéciaux."
      );
    }
  };

  if (!userSchema) return <div>Chargement...</div>;

  return (
    <div className="container2">
      <div className="item2">
        <h2>Profil de {userSchema.username}</h2>
        {userSchema.profileImage ? (
          <img
            src={`http://localhost:5000${userSchema.profileImage}`}
            alt={`Photo de ${userSchema.username}`}
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
        ) : (
          <img
            src="https://via.placeholder.com/150"
            alt="Image par défaut"
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
        )}
        <p>Email : {userSchema.email}</p>
        <p>Inscrit depuis : {new Date(userSchema.createdAt).toLocaleDateString()}</p>

        {/* Affichage des erreurs */}
        {error && <div className="error-message">{error}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {/* Formulaire pour modifier la photo de profil */}
        <h3>Modifier la photo de profil</h3>
        <form onSubmit={handleImageSubmit}>
          <input
            className="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button type="submit">Mettre à jour</button>
        </form>
          {/* Formulaire pour modifier le pseudo
                <h3>Modifier le pseudo</h3>
                <form onSubmit={handleUsernameSubmit}>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Nouveau pseudo"
                  />
                  <button type="submit">Mettre à jour</button>
          </form>*/}

        {/* Formulaire pour modifier le mot de passe */}
        <h3>Modifier le mot de passe</h3>
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nouveau mot de passe"
          />
          <button type="submit">Mettre à jour</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

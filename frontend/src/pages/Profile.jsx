import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userSchema, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null); // Etat pour l'image à télécharger
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Token introuvable. Veuillez vous reconnecter.");
          navigate("/login"); // Redirige vers la page de login si le token est manquant
          return;
        }

        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(res.data); // Met à jour les données utilisateur
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Veuillez sélectionner une image.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", image);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/users/profile/picture', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Photo de profil mise à jour', response.data);
      // Met à jour les données de l'utilisateur avec la nouvelle image
      setUserData((prevData) => ({
        ...prevData,
        profileImage: response.data.profileImage, // Assurez-vous que l'API renvoie le bon chemin de l'image
      }));
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la photo", error);
      setError("Erreur lors de la mise à jour de la photo de profil.");
    }
  };

  if (error) return <div>{error}</div>;

  if (!userSchema) return <div>Chargement...</div>;

  return (
    <div className="container2">
      <div className="item2">
        <h2>Profil de {userSchema.username}</h2>
        {userSchema.profileImage ? (
          <img
            src={`http://localhost:5000${userSchema.profileImage}`}
            alt={`Photo de ${userSchema.username}`}
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
          />
        ) : (
          <img
            src="https://via.placeholder.com/150"
            alt="Image par défaut"
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
          />
        )}
        <p>Email : {userSchema.email}</p>
        <p>Inscrit depuis : {new Date(userSchema.createdAt).toLocaleDateString()}</p>

        {/* Formulaire pour mettre à jour la photo de profil */}
        <h3>Modifier la photo de profil</h3>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button type="submit">Mettre à jour</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

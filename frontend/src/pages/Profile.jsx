import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userSchema, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
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

  if (!userSchema) return <div className="text-white">Chargement...</div>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#23272a] text-white">
      <div className="bg-[#2c2f33] rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Profil de {userSchema.username}
        </h2>
        <div className="flex justify-center mb-4">
          {userSchema.profileImage ? (
            <img
              src={`http://localhost:5000${userSchema.profileImage}`}
              alt={`Photo de ${userSchema.username}`}
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <img
              src="https://via.placeholder.com/150"
              alt="Image par défaut"
              className="w-32 h-32 rounded-full"
            />
          )}
        </div>
        <p className="text-center mb-4">Email : {userSchema.email}</p>
        <p className="text-center mb-4">
          Inscrit depuis : {new Date(userSchema.createdAt).toLocaleDateString()}
        </p>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}

        <h3 className="text-lg font-semibold mb-2">Modifier la photo de profil</h3>
        <form onSubmit={handleImageSubmit} className="flex flex-col gap-2 mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />
          <button
            type="submit"
            className="bg-[#00E487] text-black py-2 rounded hover:bg-[#00f692] transition"
          >
            Mettre à jour
          </button>
        </form>

        <h3 className="text-lg font-semibold mb-2">Modifier le mot de passe</h3>
        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-2">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nouveau mot de passe"
            className="bg-[#2c2f33] border border-gray-600 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#00E487]"
          />
          <button
            type="submit"
            className="bg-[#00E487] text-black py-2 rounded hover:bg-[#00f692] transition"
          >
            Mettre à jour
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

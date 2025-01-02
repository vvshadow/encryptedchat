import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedLogo from "../components/AnimatedLogo";
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
      <AnimatedLogo />

        <h2 className="text-3xl font-bold mb-4 text-center">
          Profil de {userSchema.username}
        </h2>
        <div className="flex justify-center mb-4">
          {userSchema.profileImage ? (
            <img
              src={`${process.env.REACT_APP_API_URL}${userSchema.profileImage}`}
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

        {error && <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
  <strong className="block font-medium text-red-800"> 🛑 On dirait qu'il y a eu un petit bug dans la matrice.  </strong>

  <p className="mt-2 text-sm text-red-700">
   {error}
  </p>
</div>}
        {successMessage && (
          <div role="alert" className="rounded-xl border border-gray-100 bg-white p-4">
          <div className="flex items-start gap-4">
            <span className="text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
        
            <div className="flex-1">
              <strong className="block font-medium text-gray-900"> Modifications enregistrées </strong>
        
              <p className="mt-1 text-sm text-gray-700">{successMessage}</p>
            </div>
        
            <button className="text-gray-500 transition hover:text-gray-600">
              <span className="sr-only">Dismiss popup</span>
        
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
          // <div className="text-green-500 mb-4"></div>
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

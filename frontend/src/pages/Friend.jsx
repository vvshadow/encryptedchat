import axios from "axios";
import React, { useEffect, useState } from "react";
import AnimatedLogo from "../components/AnimatedLogo";

const Friend = () => {
  const [userId, setUserId] = useState(null); // Initialisation de l'état
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);

  // Récupération de l'userId dès le chargement du composant
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.warn("Aucun userId dans localStorage, utilisation d'une valeur par défaut.");
      setUserId("6776e6e2f42d4526db16b5f9"); // Valeur par défaut
    }
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      if (!userId) {
        console.error("userId non défini, impossible de récupérer les amis.");
        return;
      }

      try {
        console.log("Fetching friends for userId:", userId);

        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/friends/accepted?userId=${userId}`
        );
        setFriends(res.data);
      } catch (error) {
        if (error.response) {
          console.error("Erreur lors de la récupération des amis :", error.response.data);
          setError("Erreur interne du serveur. Veuillez réessayer plus tard.");
        } else if (error.request) {
          console.error("Aucune réponse reçue :", error.request);
          setError("Impossible de joindre le serveur. Vérifiez votre connexion réseau.");
        } else {
          console.error("Erreur :", error.message);
          setError("Une erreur est survenue. Veuillez réessayer.");
        }
      }
    };

    fetchFriends();
  }, [userId]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-opacity-70">
      <div className="bg-white shadow-md rounded-lg p-6 w-11/12 max-w-md">
        <AnimatedLogo />
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Liste des amis
        </h1>
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : friends.length === 0 ? (
          <p className="text-center text-gray-500">Aucun ami trouvé.</p>
        ) : (
          <ul className="space-y-3">
            {friends.map((friend) => (
              <li
                key={friend.friendId._id}
                className="bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200 transition"
              >
                <p className="text-lg font-medium text-gray-800">
                  {friend.friendId.username}
                </p>
                <p className="text-sm text-gray-500">{friend.friendId.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Friend;

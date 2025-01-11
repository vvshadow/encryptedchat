import axios from "axios";
import React, { useEffect, useState } from "react";
import AnimatedLogo from "../components/AnimatedLogo";

const Friend = () => {
  // Récupérer userId depuis localStorage ou utiliser une valeur par défaut
  let userId = localStorage.getItem("userId") || "6776e6e2f42d4526db16b5f9";

  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État des erreurs

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true); // Commence le chargement
      setError(null); // Réinitialise les erreurs

      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/friends/accepted?userId=${userId}`
        );
        setFriends(res.data);
      } catch (err) {
        if (err.response) {
          setError(`Erreur ${err.response.status}: ${err.response.data.error}`);
          console.error("Erreur lors de la récupération des amis :", err.response.data);
        } else if (err.request) {
          setError("Aucune réponse reçue du serveur.");
          console.error("Aucune réponse reçue :", err.request);
        } else {
          setError("Une erreur s'est produite : " + err.message);
          console.error("Erreur :", err.message);
        }
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchFriends();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-gray-500">Chargement des amis...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md">
          <p className="text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-opacity-70">
      <div className="bg-white shadow-md rounded-lg p-6 w-11/12 max-w-md">
        <AnimatedLogo />
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Liste des amis
        </h1>
        {friends.length === 0 ? (
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

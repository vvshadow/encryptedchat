import axios from "axios";
import React, { useEffect, useState } from "react";
import AnimatedLogo from "../components/AnimatedLogo";

const Friend = () => {
  const [friends, setFriends] = useState([]);
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (!userId) {
          console.error("User ID non défini !");
          return;
        }

        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/friends/accepted?userId=${userId}`
        );
        setFriends(res.data);
      } catch (error) {
        if (error.response) {
          console.error("Erreur lors de la récupération des amis: ", error.response.data);
          console.error("Code d'état: ", error.response.status);
          console.error("En-têtes: ", error.response.headers);
        } else if (error.request) {
          console.error("Aucune réponse reçue: ", error.request);
        } else {
          console.error("Erreur: ", error.message);
        }
      }
    };

    fetchFriends();
  }, [userId]);

  if (!userId) {
    return <p className="text-center text-gray-500">Veuillez vous connecter pour voir vos amis.</p>;
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
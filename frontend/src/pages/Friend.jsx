import axios from "axios";
import React, { useEffect, useState } from "react";
import AnimatedLogo from "../components/AnimatedLogo";

const Friend = () => {
  const [userId] = useState(localStorage.getItem("userId") || "6776e6e2f42d4526db16b5f9");
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        console.log(`Fetching friends for userId: ${userId}`);
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/friends/accepted?userId=${userId}`
        );
        setFriends(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des amis : ", error.response?.data || error.message);
      }
    };

    if (userId) fetchFriends();
    else console.error("User ID non défini !");
  }, [userId]);

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
                key={friend._id}
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

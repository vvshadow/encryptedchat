import axios from "axios";
import React, { useEffect, useState } from "react";

const Friend = () => {
  const [friends, setFriends] = useState([]);
  const userId = localStorage.getItem("userId"); // Vérifie si tu récupères bien l'ID ici

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (!userId) {
          console.error("User ID non défini !");
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/friends/accepted?userId=${userId}`
        );
        setFriends(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des amis: ", error);
      }
    };

    fetchFriends();
  }, [userId]);

  return (
    <div class="container">
    <div class="item2">
      <h1>Liste des amis</h1>
      {friends.length === 0 ? (
        <p>Aucun ami trouvé.</p>
      ) : (
        <ul>
          {friends.map((friend) => (
            <li key={friend.friendId._id}>{friend.friendId.username}</li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default Friend;

import axios from "axios";
import React, { useEffect, useState } from "react";
import AnimatedLogo from "../components/AnimatedLogo";

const Friend = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (!userId || !token) {
          console.error("User ID or token not defined!");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/friends/accepted`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setFriends(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [userId, token]);

  if (!userId) {
    return <p className="text-center text-gray-500">Please log in to see your friends.</p>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-opacity-70">
        <div className="bg-white shadow-md rounded-lg p-6 w-11/12 max-w-md">
          <AnimatedLogo />
          <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">List of Friends</h1>
          <p className="text-center text-gray-500">Loading friends...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-opacity-70">
        <div className="bg-white shadow-md rounded-lg p-6 w-11/12 max-w-md">
          <AnimatedLogo />
          <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">List of Friends</h1>
          <p className="text-center text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-opacity-70">
      <div className="bg-white shadow-md rounded-lg p-6 w-11/12 max-w-md">
        <AnimatedLogo />
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">List of Friends</h1>
        {friends.length === 0 ? (
          <p className="text-center text-gray-500">No friends found.</p>
        ) : (
          <ul className="space-y-3">
            {friends.map((friend) => (
              <li
                key={friend.friendId._id}
                className="bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200 transition"
              >
                <p className="text-lg font-medium text-gray-800">{friend.friendId.username}</p>
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
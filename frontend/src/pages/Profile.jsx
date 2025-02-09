import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");  // Get JWT token from localStorage
      const response = await axiosInstance.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // Send token with request
        },
      });
      setUser(response.data); // Set user data
    } catch (error) {
      console.log("Error fetching profile:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchUserProfile();  // Fetch user profile when component mounts
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;

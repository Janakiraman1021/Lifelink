import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Droplet } from "lucide-react";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bloodGroup: "",
  });
  const [editMode, setEditMode] = useState(false);

  // Fetch user profile on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://lifelink-backend-1sci.onrender.com//profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        alert("Failed to fetch profile details.");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://lifelink-backend-1sci.onrender.com//profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setFormData(updatedData);
        setEditMode(false); // Exit edit mode
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block"
          >
            <Droplet className="h-12 w-12 text-red-500 mx-auto" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-800 mt-4">
            Your Profile
          </h2>
          <p className="text-gray-600 mt-2">
            View and update your profile details below.
          </p>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              disabled={!editMode}
              className={`w-full px-4 py-3 rounded-lg border ${
                editMode
                  ? "border-gray-300 focus:ring-2 focus:ring-red-500"
                  : "bg-gray-100 border-gray-200 cursor-not-allowed"
              } transition-all`}
              placeholder="Enter your name"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              disabled={!editMode}
              className={`w-full px-4 py-3 rounded-lg border ${
                editMode
                  ? "border-gray-300 focus:ring-2 focus:ring-red-500"
                  : "bg-gray-100 border-gray-200 cursor-not-allowed"
              } transition-all`}
              placeholder="Enter your email"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blood Group
            </label>
            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup || ""}
              onChange={handleInputChange}
              disabled={!editMode}
              className={`w-full px-4 py-3 rounded-lg border ${
                editMode
                  ? "border-gray-300 focus:ring-2 focus:ring-red-500"
                  : "bg-gray-100 border-gray-200 cursor-not-allowed"
              } transition-all`}
              placeholder="Enter your blood group"
            />
          </motion.div>

          {editMode ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
              type="submit"
            >
              Save Changes
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </motion.button>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;

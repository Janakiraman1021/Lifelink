import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Droplet,  Award,  Plus } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DonorDashboard = () => {
  const [userName, setUserName] = useState(""); // State to store the donor's name
  const [nextDonationDate, setNextDonationDate] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  // Fetch donor's name and next donation date
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
        const response = await fetch("https://lifelink-backend-1sci.onrender.com/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserName(data.name); // Set the donor's name
          // Example logic to set next donation date (3 months from the last donation)
          const lastDonationDate = new Date(data.lastDonationDate || new Date());
          const nextDate = new Date(lastDonationDate);
          nextDate.setMonth(nextDate.getMonth() + 3);
          setNextDonationDate(nextDate.toLocaleDateString());
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-red-500 to-red-600 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <Droplet className="h-8 w-8 text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {userName || "Loading..."}
              </h1>
              <p className="text-red-100">
                Your next donation is on {nextDonationDate || "Calculating..."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Schedule Donation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Schedule a Donation
              </h3>
              <Plus className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Schedule your next blood donation.
            </p>
            <button
              onClick={() => navigate("/donor/schedule-donation")} // Correctly defined navigate here
              className="w-full py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              Schedule Now
            </button>
          </motion.div>

          {/* Other Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Achievements
              </h3>
              <Award className="h-6 w-6 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              5 Donations
            </div>
            <p className="text-sm text-gray-600">You've helped save 15 lives!</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;

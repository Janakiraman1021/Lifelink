import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Droplet, AlertCircle, Users, Activity, Plus } from "lucide-react";

const HospitalDashboard = () => {
  const [hospitalName, setHospitalName] = useState("");
  const [urgentRequests, setUrgentRequests] = useState(0);
  const [availableUnits, setAvailableUnits] = useState(0);
  const [donorsToday, setDonorsToday] = useState(0);
  const [usageRate, setUsageRate] = useState(0);
  const [bloodInventory, setBloodInventory] = useState([]);

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch hospital data on component mount
  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://lifelink-backend-1sci.onrender.com/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setHospitalName(data.name);
          setUrgentRequests(data.urgentRequests || 0); // Assuming API returns `urgentRequests`
          setAvailableUnits(data.availableUnits || 0); // Assuming API returns `availableUnits`
          setDonorsToday(data.donorsToday || 0); // Assuming API returns `donorsToday`
          setUsageRate(data.usageRate || 0); // Assuming API returns `usageRate`
          setBloodInventory(data.bloodInventory || []); // Assuming API returns `bloodInventory`
        } else {
          console.error("Failed to fetch hospital data");
        }
      } catch (err) {
        console.error("Error fetching hospital data:", err);
      }
    };

    fetchHospitalData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-b from-blue-500 to-blue-600 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Droplet className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  Welcome back, {hospitalName || "Loading..."}
                </h1>
                <p className="text-blue-100">Blood Bank Management</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white text-blue-500 rounded-lg font-semibold flex items-center space-x-2"
              onClick={() => navigate("/hospital/new-request")} // Navigate to BloodRequestForm
            >
              <Plus className="h-5 w-5" />
              <span>New Request</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Urgent Requests Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Urgent Requests
              </h3>
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {urgentRequests}
            </div>
            <p className="text-sm text-red-500">Critical requests pending</p>
          </motion.div>

          {/* Available Units Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Available Units
              </h3>
              <Droplet className="h-6 w-6 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {availableUnits}
            </div>
            <p className="text-sm text-gray-600">Across all blood types</p>
          </motion.div>

          {/* Donors Today Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Donors Today
              </h3>
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {donorsToday}
            </div>
            <p className="text-sm text-gray-600">Scheduled for later</p>
          </motion.div>

          {/* Usage Rate Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Usage Rate
              </h3>
              <Activity className="h-6 w-6 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {usageRate}%
            </div>
            <p className="text-sm text-gray-600">Current hospital usage</p>
          </motion.div>
        </div>

        {/* Blood Inventory Table */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Blood Inventory
          </h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blood Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Available Units
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bloodInventory.map((blood, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {blood.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {blood.units} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          blood.status === "Adequate"
                            ? "bg-green-100 text-green-800"
                            : blood.status === "Low"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {blood.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {blood.updated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;

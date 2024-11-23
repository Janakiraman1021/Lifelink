import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building, AlertCircle, Users, Activity, Plus } from "lucide-react";
import io from "socket.io-client";

const OrganizationDashboard = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [activeProjects, setActiveProjects] = useState(0);
  const [membersEnrolled, setMembersEnrolled] = useState(0);
  const [criticalAlerts, setCriticalAlerts] = useState(0);
  const [resourceUsage, setResourceUsage] = useState(0);
  const [projects, setProjects] = useState([]);
  const [notifications, setNotifications] = useState([]); // New: For real-time notifications

  // Connect to WebSocket server
  const socket = io("http://localhost:5000"); // Update this with your backend's WebSocket URL

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrganizationName(data.name);
          setActiveProjects(data.activeProjects || 0);
          setMembersEnrolled(data.membersEnrolled || 0);
          setCriticalAlerts(data.criticalAlerts || 0);
          setResourceUsage(data.resourceUsage || 0);
          setProjects(data.projects || []);
        } else {
          console.error("Failed to fetch organization data");
        }
      } catch (err) {
        console.error("Error fetching organization data:", err);
      }
    };

    fetchOrganizationData();

    // Listen for real-time blood requests
    socket.on("new_request", (data) => {
      setNotifications((prev) => [...prev, `New blood request: ${data.request.bloodType}`]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-green-500 to-green-600 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Building className="h-8 w-8 text-green-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  Welcome back, {organizationName || "Loading..."}
                </h1>
                <p className="text-green-100">Resource Management System</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white text-green-500 rounded-lg font-semibold flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>New Project</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>
          <div className="bg-white rounded-xl shadow-sm p-4">
            {notifications.length > 0 ? (
              <ul>
                {notifications.map((note, index) => (
                  <li key={index} className="text-sm text-gray-700 mb-2">
                    {note}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No notifications yet</p>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Projects Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Active Projects</h3>
              <Activity className="h-6 w-6 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{activeProjects}</div>
            <p className="text-sm text-gray-600">Currently ongoing</p>
          </motion.div>

          {/* Members Enrolled Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Members Enrolled</h3>
              <Users className="h-6 w-6 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{membersEnrolled}</div>
            <p className="text-sm text-gray-600">Across all teams</p>
          </motion.div>

          {/* Alerts Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Alerts</h3>
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{criticalAlerts}</div>
            <p className="text-sm text-red-500">Critical priority</p>
          </motion.div>

          {/* Resource Usage Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Resource Usage</h3>
              <Activity className="h-6 w-6 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{resourceUsage}%</div>
            <p className="text-sm text-gray-600">Of allocated resources</p>
          </motion.div>
        </div>

        {/* Projects Table */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Project Overview</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Members
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {project.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          project.status === "Ongoing"
                            ? "bg-green-100 text-green-800"
                            : project.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {project.members}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {project.updated}
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

export default OrganizationDashboard;

import React, { useState, useEffect } from "react";

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("https://lifelink-backend-1sci.onrender.com//requests");
        const data = await response.json();
        setRequests(data); // Assuming the API returns an array of requests with donor info
      } catch (err) {
        console.error("Failed to fetch requests:", err);
      }
    };

    fetchRequests();
  }, []);

  const handleRequest = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://lifelink-backend-1sci.onrender.com//requests/${requestId}/assign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Request assigned successfully!");
        // Optionally refresh the requests
        setRequests((prev) =>
          prev.filter((request) => request._id !== requestId)
        );
      } else {
        alert("Failed to assign request.");
      }
    } catch (err) {
      console.error("Error assigning request:", err);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Requests</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Requester</th>
            <th className="border border-gray-300 px-4 py-2">Blood Type</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Urgency</th>
            <th className="border border-gray-300 px-4 py-2">Location</th>
            <th className="border border-gray-300 px-4 py-2">Donor</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td className="border border-gray-300 px-4 py-2">
                {request.requesterName || "N/A"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {request.bloodType}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {request.quantity} Units
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {request.urgency}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {request.location}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {request.assignedDonor
                  ? request.assignedDonor.name
                  : "Not Assigned"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleRequest(request._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Request This
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsPage;

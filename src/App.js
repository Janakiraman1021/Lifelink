import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";

// Auth Pages
import DonorLogin from "./pages/auth/DonorLogin";
import DonorSignup from "./pages/auth/DonorSignup";
import HospitalLogin from "./pages/auth/HospitalLogin";
import HospitalSignup from "./pages/auth/HospitalSignup";
import OrganizationLogin from "./pages/auth/OrganizationLogin";
import OrganizationSignup from "./pages/auth/OrganizationSignup";

// Dashboard Pages
import DonorDashboard from "./pages/donor/DonorDashboard";
import HospitalDashboard from "./pages/hospital/HospitalDashboard";
import OrganizationDashboard from "./pages/organization/OrganizationDashboard";

// Profile Component
import Profile from "./components/Profile";

// Request Component 
import BloodRequestForm from "./pages/hospital/BloodRequestForm";
import RequestsPage from "./pages/RequestsPage";

// Schedule-Donations 
import ScheduleDonation from "./pages/donor/ScheduleDonation";


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Donor Routes */}
          <Route path="/donor/login" element={<DonorLogin />} />
          <Route path="/donor/signup" element={<DonorSignup />} />
          <Route path="/donor/dashboard" element={<DonorDashboard />} />
          <Route path="/donor/profile" element={<Profile />} />

          {/* Hospital Routes */}
          <Route path="/hospital/login" element={<HospitalLogin />} />
          <Route path="/hospital/signup" element={<HospitalSignup />} />
          <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
          <Route path="/hospital/profile" element={<Profile />} />

          {/* Organization Routes */}
          <Route path="/organization/login" element={<OrganizationLogin />} />
          <Route path="/organization/signup" element={<OrganizationSignup />} />
          <Route path="/organization/dashboard" element={<OrganizationDashboard />} />
          <Route path="/organization/profile" element={<Profile />} />


        {/* Request Routes */}
          <Route path="/hospital/new-request" element={<BloodRequestForm />} />
          <Route path="/blood-requests" element={<RequestsPage />} />


        {/* Donations */}
        <Route path="/donor/schedule-donation" element={<ScheduleDonation />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

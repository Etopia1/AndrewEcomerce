import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const BASE_URL = "http://localhost:2030"; // Change if deployed

const UsernewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Both password fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/resetpassword/${token}`,
        { password }
      );
      setSuccessMessage("Password reset successfully. Redirecting...");
      setError("");
      setTimeout(() => navigate("/userlogin"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Left Image Section */}
      <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-gray-50">
        <img
          src="src/assets/shopping1.jpg"
          alt="Reset Password Visual"
          className="w-full h-full object-cover object-center rounded-none shadow-xl"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 h-full px-6 sm:px-10 md:px-16 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2 text-center md:text-left">
            Reset Your Password
          </h2>
          <p className="text-gray-500 mb-6 text-center md:text-left">
            Enter a new password to secure your account
          </p>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-sm mb-2">{successMessage}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-200"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-200"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-6 rounded text-white font-medium shadow-md ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 focus:ring focus:ring-red-300"
              }`}
            >
              {loading ? <BeatLoader color="#fff" size={10} /> : "Reset Password"}
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Remember your password?{" "}
            <span
              onClick={() => navigate("/userlogin")}
              className="text-red-600 hover:underline cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsernewPassword;

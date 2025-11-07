import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const MarchantNewPass = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError('Both password fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(`https://andrewecomerceback.onrender.com/api/v1/resetpassword/${token}`, {
        password,
      });
      setSuccessMessage('Password reset successfully. You can now log in.');
      setError('');
      setTimeout(() => navigate('/'),
       2000);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Something went wrong. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6">
      <div className="bg-white h-[90%] p-8 rounded-lg shadow-md w-[90%] max-w-lg">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm text-center">{successMessage}</p>}

        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Reset Your Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your new password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Re-enter your new password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default MarchantNewPass;

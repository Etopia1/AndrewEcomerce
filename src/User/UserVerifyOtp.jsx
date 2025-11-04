import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import Aos from 'aos';
import {Otpmain} from './Otpstyled'
import 'aos/dist/aos.css';

const UserVerifyOtp = () => {
  const { token } = useParams();
  console.log(token)
  const [otp, setOtp] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const url = 'https://new-ecomer-ce-app-backend2.vercel.app/api/v1';
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, minutes]);

  const resendOTP = async () => {
    setMinutes(2);
    setSeconds(59);
    try {
      const response = await axios.post(`${url}/user-resendverifyone/${token}`);
      toast.success(response?.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${url}/user-verifyone/${token}`, { otp });
      toast.success(response?.data?.message);
      setLoading(false);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!newEmail.trim()) {
      toast.error('Email is required');
      setEmailError(false);
    } else if (!validateEmail(newEmail)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 py-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Verify Your One-Time Password
          <br />
          <span className="text-lg text-gray-600">To Confirm You as A New User</span>
        </h2>

        <div className="flex justify-center my-6">
        <Otpmain>
       <OtpInput
          
          value={otp}
          numInputs={4}
          onChange={setOtp}
          renderSeparator={<span> </span>}
          inputType="tel"
          containerStyle={{display : "unset"}}
          inputStyle={{ width : "3.5rem ", border:"1px solid gray", gap:"30px",   height: "4rem"}}
          renderInput={(props) => <input {...props} className='otp-input ' />}
          />
        </Otpmain>
        </div>

        <div className="text-center text-gray-300 mb-6">
          {seconds > 0 || minutes > 0 ? (
            <p>
              Time Remaining: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </p>
          ) : (
            <p>Didn’t receive the code?</p>
          )}
        </div>

        <div className="flex justify-center mb-6">
          <button
            disabled={seconds > 0 || minutes > 0}
            onClick={resendOTP}
            className={`py-3 px-6 rounded ${
              seconds > 0 || minutes > 0
                ? 'bg-gray-400 text-gray-600'
                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
            }`}
          >
            Resend
          </button>
        </div>

        <div className="flex justify-center">
          {loading ? (
            <button
              disabled
              className="py-3 px-6 rounded bg-gray-600 text-gray-400 flex items-center justify-center"
            >
              <BeatLoader color="#ffffff" size={12} />
            </button>
          ) : (
            <button
              onClick={handleVerify}
              className="py-3 px-6 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Verify OTP
            </button>
          )}
        </div>
      </div>

      {resend && (
        <div
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mt-8"
          data-aos="zoom-in"
          data-aos-duration="400"
        >
          <input
            type="email"
            placeholder="Email"
            onChange={handleEmail}
            className="w-full p-4 rounded-md bg-gray-100 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setResend(false)}
              className="py-3 px-6 rounded bg-red-500 hover:bg-red-600 text-white"
            >
              Go Back
            </button>
            <button
              onClick={resendOTP}
              className="py-3 px-6 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Resend
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserVerifyOtp;


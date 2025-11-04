import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300 pt-12 pb-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-10">
        {/* Subscribe Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-white font-bold text-xl mb-3">Exclusive</h3>
          <p className="mb-3 text-sm">Subscribe</p>
          <p className="text-sm mb-4">Get 10% off your first order</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-l-md outline-none text-black"
            />
            <button className="bg-pink-600 text-white px-4 rounded-r-md hover:bg-pink-500 transition">
              →
            </button>
          </div>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <p className="text-sm mb-2">111 Bijoy sarani, Dhaka,</p>
          <p className="text-sm mb-2">DH 1515, Bangladesh.</p>
          <p className="text-sm mb-2">exclusive@gmail.com</p>
          <p className="text-sm">+88015-88888-9999</p>
        </motion.div>

        {/* Account */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h4 className="text-white font-semibold mb-3">Account</h4>
          <ul className="space-y-2 text-sm">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </motion.div>

        {/* Quick Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h4 className="text-white font-semibold mb-3">Quick Link</h4>
          <ul className="space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </motion.div>

        {/* Download App */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h4 className="text-white font-semibold mb-3">Download App</h4>
          <p className="text-sm text-gray-400 mb-3">Save $3 with App New User Only</p>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
              alt="QR code"
              className="w-16 h-16 bg-white rounded-md"
            />
            <div className="flex flex-col gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="w-28"
              />
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="w-28"
              />
            </div>
          </div>
          <div className="flex gap-3 text-lg text-white">
            <FaFacebookF className="hover:text-pink-500 cursor-pointer" />
            <FaTwitter className="hover:text-pink-500 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaLinkedinIn className="hover:text-pink-500 cursor-pointer" />
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-8">
      © Copyright Rimel <span>{currentYear}</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

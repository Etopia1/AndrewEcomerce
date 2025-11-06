import React from "react";
import { motion } from "framer-motion";

const BannerSection = () => {
  return (
    <section className="px-4 md:px-10 max-w-8xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" bg-gradient-to-r from-[#ff8fab] via-[#f7c6c7] to-[#ffe3e3] 
                   flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-lg"
      >
        {/* Text Section */}
        <div className="flex flex-col items-start justify-center px-8 py-10 md:py-16 md:w-1/2 text-gray-900">
          <h3 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Enhance Your <br /> Shopping Experience
          </h3>
          <p className="text-base md:text-lg mb-6 text-gray-700">
               Discover our latest collection of elegant handbags — crafted for style,
            comfort, and durability. Perfect for every occasion.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-[#ff4d73] hover:bg-[#e83d63] px-6 py-3 rounded-full text-white font-semibold shadow-md"
          >
            Shop Now
          </motion.button>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center items-center p-6 md:p-10">
          <img
            src="https://s2.ezgif.com/tmp/ezgif-22ad6b383e3fcd6b.png"
            alt="Speaker"
            className="w-[85%] md:w-[70%] object-contain drop-shadow-lg"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default BannerSection;

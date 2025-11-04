import React from "react";
import { motion } from "framer-motion";
import { FaTruck, FaHeadset, FaUndo } from "react-icons/fa";

const ServiceFeatures = () => {
  const features = [
    {
      id: 1,
      icon: <FaTruck className="text-3xl text-black" />,
      title: "FREE AND FAST DELIVERY",
      desc: "Free delivery for all orders over $140",
    },
    {
      id: 2,
      icon: <FaHeadset className="text-3xl text-black" />,
      title: "24/7 CUSTOMER SERVICE",
      desc: "Friendly 24/7 customer support",
    },
    {
      id: 3,
      icon: <FaUndo className="text-3xl text-black" />,
      title: "MONEY BACK GUARANTEE",
      desc: "We return money within 30 days",
    },
  ];

  return (
    <section className="bg-white py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {features.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center justify-center space-y-3"
          >
            <div className="bg-gray-100 p-4 rounded-full shadow-md w-16 h-16 flex items-center justify-center mb-3">
              {item.icon}
            </div>
            <h3 className="font-bold text-sm md:text-base text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServiceFeatures;

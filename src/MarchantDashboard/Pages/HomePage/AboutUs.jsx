import React from "react";
import { FaCheckCircle, FaTruck, FaHeadset, FaUndo } from "react-icons/fa";
import ServiceFeatures from "./ServiceFeatures";

const AboutUs = () => {
  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <section className="bg-white shadow-md py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Story</h1>
          <p className="text-gray-600 text-lg">
            Welcome to Exclusive! Your one-stop shop for premium quality
            products. Our goal is to provide you with the best shopping
            experience, unparalleled customer service, and products you'll love.
          </p>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 flex justify-center">
          <img
            src="https://i.pinimg.com/736x/5b/2c/75/5b2c757ff102df4b93f93e9430f05898.jpg"
            alt="Our Story"
            className="w-full md:w-3/4 rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 flex flex-wrap justify-around gap-6 text-center">
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold text-gray-800">10.5K</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold text-gray-800">33%</h3>
            <p className="text-gray-600">Customer Retention</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold text-gray-800">45.5K</h3>
            <p className="text-gray-600">Products Sold</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-bold text-gray-800">25K</h3>
            <p className="text-gray-600">Positive Reviews</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Meet Our Team
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center">
              <img
                src="https://i.pinimg.com/236x/26/18/e6/2618e67535f8e0091b42cb2a0de5d40c.jpg"
                alt="Tom Cruise"
                className="rounded-full w-36 h-36 object-cover mb-4"
              />
              <h4 className="text-xl font-bold text-gray-800">Tom Cruise</h4>
              <p className="text-gray-600">CEO</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://i.pinimg.com/236x/be/9d/87/be9d87f722b734b70b8e9077df7cc657.jpg"
                alt="Emma Watson"
                className="rounded-full w-36 h-36 object-cover mb-4"
              />
              <h4 className="text-xl font-bold text-gray-800">Emma Watson</h4>
              <p className="text-gray-600">Marketing Head</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="https://i.pinimg.com/236x/1b/92/34/1b92345b60c29ee6f1e80f9904c7029e.jpg"
                alt="Will Smith"
                className="rounded-full w-36 h-36 object-cover mb-4"
              />
              <h4 className="text-xl font-bold text-gray-800">Will Smith</h4>
              <p className="text-gray-600">Tech Lead</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <ServiceFeatures/>
     

      {/* Footer */}
   
    </div>
  );
};

export default AboutUs;

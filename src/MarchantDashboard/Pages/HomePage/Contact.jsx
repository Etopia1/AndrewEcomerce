import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-50">
      {/* Header Section */}
      <section className="bg-white shadow-md py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact</h1>
          <p className="text-gray-600">Home / Contact</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="container mx-auto flex-wrap px-4 flex md:flex-nowrap  gap-8 justify-between">
          {/* Contact Info */}
          <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-6">
            {/* Call To Us */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <FaPhoneAlt className="text-red-500 text-2xl mr-4" />
                <h3 className="text-xl font-bold text-gray-800">Call To Us</h3>
              </div>
              <p className="text-gray-600">
                We are available 24/7. Feel free to call us anytime.
              </p>
              <p className="text-gray-800 font-bold mt-2">Phone: +234 9038730991</p>
            </div>

            {/* Write To Us */}
            <div>
              <div className="flex items-center mb-4">
                <FaEnvelope className="text-red-500 text-2xl mr-4" />
                <h3 className="text-xl font-bold text-gray-800">Write To Us</h3>
              </div>
              <p className="text-gray-600">
                Fill out our form and we will get back to you within 24 hours.
              </p>
              <p className="text-gray-800 font-bold mt-2">
                Emails: anjolaoluwaandrew@gmail.com
              </p>
              <p className="text-gray-800 font-bold">
                jolaetopia81@gmail.com
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-2/3 bg-white shadow-md rounded-lg p-6">
            <form className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  className="flex-1 p-3 border rounded-lg w-full md:w-1/2 focus:outline-none focus:ring focus:ring-red-300"
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  className="flex-1 p-3 border rounded-lg w-full md:w-1/2 focus:outline-none focus:ring focus:ring-red-300"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <input
                  type="text"
                  placeholder="Your Phone *"
                  className="flex-1 p-3 border rounded-lg w-full md:w-1/2 focus:outline-none focus:ring focus:ring-red-300"
                />
              </div>
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-red-300"
              ></textarea>
              <button
                type="submit"
                className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Section */}
  
    </div>
  );
};

export default Contact;

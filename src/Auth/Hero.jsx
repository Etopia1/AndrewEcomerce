import React, { useState } from "react";
// import Product1 from "../../assets/products/product1.png";
// import Product2 from "../../assets/products/product2.png";
// import Product3 from "../../assets/products/product3.png";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

const ProductList = [
  {
    id: 1,
    img: "",
    size: "65px",
    title: "Exclusive Deals on Latest Gadgets",
    description:
      "Shop the latest tech gadgets at unbeatable prices. Don't miss out on our limited-time offers.",
  },
  {
    id: 2,
    img: "",
    size: "65px",
    title: "High-Quality Fashion for Every Season",
    description:
      "Upgrade your wardrobe with our trendy and durable apparel. Perfect for any occasion!",
  },
  {
    id: 3,
    img: "",
    title: "Home Essentials at Affordable Prices",
    description:
      "Discover premium home essentials to elevate your living space without breaking the bank.",
  },
];

const Hero = ({ popup, setPopup }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-slate-950 dark:text-white duration-200 ">
      {/* Background pattern */}
      <div className="h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-[8]"></div>
      {/* Hero section */}
      <div className="container pb-8 sm:pb-0">
        <Slider {...settings}>
          {ProductList.map((product) => (
            <div key={product.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* Text content */}
                <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                  <h1
                    style={{ fontSize: product.size }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                  >
                    {product.title}
                  </h1>
                  <p className="text-sm">{product.description}</p>
                  <div>
                    {loggedIn ? (
                      <button
                        className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                        onClick={() => navigate("/products")}
                      >
                        Shop Now
                      </button>
                    ) : (
                      <button
                        onClick={() => setPopup(true)}
                        className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                      >
                        Explore Products
                      </button>
                    )}
                  </div>
                </div>
                {/* Image */}
                <div className="order-1 sm:order-2">
                  <div className="relative z-10">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;

// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import axios from "axios";

// // const categories = [
// //   "Women's Fashion",
// //   "Men's Fashion",
// //   "Electronics",
// //   "Home & Lifestyle",
// //   "Medicine",
// //   "Sports & Outdoor",
// //   "Baby's & Toys",
// //   "Groceries & Pets",
// //   "Health & Beauty",
// // ];

// const carouselData = [
//   {
//     imgSrc: "https://i.pinimg.com/236x/9a/58/60/9a58604f2f408c9ce0623d6fd0a31e2a.jpg",
//     title: "iPhone 14 Series",
//     discount: "Up to 10% off Voucher",
//     link: "/shop-now",
//   },
//   {
//     imgSrc: "https://img.freepik.com/free-photo/child-with-jeans-white-sneakers_53876-97726.jpg?semt=ais_hybrid",
//     title: "Summer Sale",
//     discount: "Up to 50% off",
//     link: "/shop-now",
//   },
//   {
//     imgSrc: "https://img.freepik.com/free-photo/side-view-rich-woman-talking-phone_23-2149684323.jpg?semt=ais_hybrid",
//     title: "Exclusive Offers",
//     discount: "Save Big on Electronics",
//     link: "/shop-now",
//   },
//   {
//     imgSrc: "https://img.freepik.com/premium-photo/perfume-bottle-isolated-white-background_127657-23966.jpg?semt=ais_hybrid",
//     title: "Exclusive Offers",
//     discount: "Save Big on Electronics",
//     link: "/shop-now",
//   },
// ];

// const HeroPage2 = () => {
//      const [categories, setcategories]=useState([])
  
//   const getAllcategory = () =>{
//     axios.get('https://newecomerceappbackend.onrender.com/api/v1/category')
//     .then((res)=>{
//         console.log(res.data.data)
//         setcategories(res.data.data)
//     })
//     .catch((err)=>{
//         // console.log(err)
//     })
//   }
//   useEffect(()=>(
//     getAllcategory()
//   ))
//   const settings = {
//     // dots: true,
//     // infinite: true,
//     // speed: 500,
//     // slidesToShow: 1,
//     // slidesToScroll: 1,
//     // autoplay: true,
//     // autoplaySpeed: 3000,
//     dots: true,
//     arrows: false,
//     infinite: true,
//     speed: 800,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     cssEase: "ease-in-out",
//     pauseOnHover: false,
//     pauseOnFocus: true,
    
//   };

//   return (
//     <div className="flex w-[99%] flex-col md:flex-row bg-gray-100 p-4 gap-4">
//       {/* Categories Section */}
//       <div className="w-full md:w-1/4">
//         <ul className="bg-white shadow rounded-lg p-4">
//           {categories.map((category, index) => (
//             <li
//               key={index}
//               className="py-2 px-4 hover:bg-gray-200 rounded-lg cursor-pointer font-medium text-gray-800"
//             >
//               {category.categoryName}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Carousel Section */}
//       <div className="w-[100%] md:w-3/4">
//         <Slider {...settings}>
//           {carouselData.map((item, index) => (
//             <div key={index} className="relative">
//               <img
//                 src={item.imgSrc}
//                 alt={item.title}
//                 className="w-full  md:h-96 object-cover [100%] rounded-lg"
//               />
//               <div className="absolute bottom-5 left-5 text-white bg-black bg-opacity-50 p-4 rounded-lg">
//                 <h2 className="text-2xl md:text-4xl font-bold">{item.title}</h2>
//                 <p className="text-lg md:text-xl mt-2">{item.discount}</p>
//                 <a
//                   href={item.link}
//                   className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
//                 >
//                   Shop Now →
//                 </a>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default HeroPage2;
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const carouselData = [
  {
    imgSrc:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-1-202209_GEO_US?wid=5120&hei=2880&fmt=jpeg&qlt=80&.v=1660753619946",
    title: "iPhone 14 Series",
    discount: "Up to 10% off Voucher",
    link: "/shop-now",
  },
  {
    imgSrc:
      "https://img.freepik.com/free-photo/full-length-shot-happy-girl-shopping_23-2148671221.jpg",
    title: "Women's Fashion",
    discount: "Trendy Outfits Up to 30% Off",
    link: "/shop-now",
  },
  {
    imgSrc:
      "https://img.freepik.com/free-photo/modern-electronic-gadgets-digital-device_53876-129782.jpg",
    title: "Electronics Deals",
    discount: "Save Big on Latest Gadgets",
    link: "/shop-now",
  },
];

const HeroPage2 = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:2030/api/v1/category")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: false,
  };

  return (
    <div className="flex flex-col md:flex-row w-full bg-white py-4 md:px-4 gap-4">
      {/* ✅ Sidebar for Desktop / Tablet */}
      <div className="hidden md:block md:w-[22%] bg-white border border-gray-200 rounded-xl shadow-sm">
        <ul className="divide-y divide-gray-100">
          {categories.map((cat) => (
            <li
              key={cat._id}
              onClick={() => navigate(`/viewcategoryandProduct/${cat._id}`)}
              className="flex justify-between items-center px-5 py-3 hover:bg-gray-100 cursor-pointer transition-all duration-200 text-gray-800 font-medium"
            >
              <span>{cat.categoryName}</span>
              <span className="text-gray-500 text-sm">›</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Dropdown Menu for Mobile */}
      <div className="md:hidden w-full px-3">
        <select
          onChange={(e) =>
            navigate(`/viewcategoryandProduct/${e.target.value}`)
          }
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 font-medium shadow-sm focus:ring-2 focus:ring-black"
        >
          <option value="">Browse Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Hero Carousel */}
      <div className="w-full md:w-[78%] relative rounded-xl overflow-hidden">
        <Slider {...settings}>
          {carouselData.map((item, index) => (
            <div key={index} className="relative rounded-xl">
              <img
                src={item.imgSrc}
                alt={item.title}
                className="w-full h-[200px] sm:h-[250px] md:h-[350px] lg:h-[420px] object-cover rounded-xl"
              />

              {/* ✅ Overlay Section */}
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl flex flex-col justify-center pl-6 sm:pl-10 md:pl-14 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                    alt="Apple"
                    className="w-6 h-6 md:w-8 md:h-8 brightness-0 invert"
                  />
                  <h3 className="text-lg md:text-xl font-semibold">
                    {item.title}
                  </h3>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold leading-tight">
                  {item.discount}
                </h1>
                <button
                  onClick={() => navigate(item.link)}
                  className="mt-4 flex items-center gap-2 bg-white text-black font-semibold px-4 py-2 rounded-full hover:bg-gray-200 transition-all w-fit text-sm sm:text-base"
                >
                  Shop Now →
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HeroPage2;

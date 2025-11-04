// import { useRef } from "react";
// import FirstPage from "./FirstPage";
// import SecondPage from "./SecondPage";
// import HomePage from "./HomePage";
// import Formpage from "./Formpage";
// import ThirdPage from "./ThirdPage";
// import ReviewSection from "./ReviewSection";
// import Footer from "./Footer";

// function Trackpage() {
//   const formRef = useRef(null); // 🔵 create a ref
//   const formRef2 = useRef(null); // 🔵 create a ref

//   const scrollToForm = () => {
//     formRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const scrollToForm2 = () => {
//     formRef2.current?.scrollIntoView({ behavior: "smooth" });
//   };
 

//   return (
//     <div className="flex flex-col w-full">
//       <HomePage  onVerifyClick2={scrollToForm2} onVerifyClick={scrollToForm}   />
//       <FirstPage onVerifyClick={scrollToForm} /> {/* pass the scroll function */}
//       <SecondPage />
//       <Formpage refProp={formRef} /> {/* pass the ref */}
//       <ThirdPage onVerifyClick={scrollToForm}/>
// 	  <ReviewSection refProp={formRef2}/>
// 	  <Footer onVerifyClick2={scrollToForm2} />
//     </div>
//   );
// }

// export default Trackpage;
// // // import { useEffect, useState } from "react";
// // // import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// // // import L from "leaflet";
// // // import axios from "axios";
// // // import "leaflet/dist/leaflet.css";

// // // const ORS_API_KEY = "5b3ce3597851110001cf6248f9391e2cfb8b43b78b06f2866a2dbbeb"; // Replace with your key

// // // // Rider is always at FUTA South Gate
// // // const riderCoords = [7.3018, 5.1372]; // lat, lng (FUTA South Gate)

// // // export default function TrackOrder() {
// // //   const [userCoords, setUserCoords] = useState(null);
// // //   const [routeCoords, setRouteCoords] = useState([]);

// // //   useEffect(() => {
// // //     // Get user current location
// // //     navigator.geolocation.getCurrentPosition(
// // //       async (position) => {
// // //         const userLatLng = [position.coords.latitude, position.coords.longitude];
// // //         setUserCoords(userLatLng);

// // //         // Fetch route from rider (FUTA) to user
// // //         const res = await axios.post(
// // //           "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
// // //           {
// // //             coordinates: [
// // //               [riderCoords[1], riderCoords[0]], // [lng, lat]
// // //               [userLatLng[1], userLatLng[0]]    // [lng, lat]
// // //             ]
// // //           },
// // //           {
// // //             headers: {
// // //               Authorization: ORS_API_KEY,
// // //               "Content-Type": "Trackpagelication/json"
// // //             }
// // //           }
// // //         );

// // //         const coords = res.data.features[0].geometry.coordinates.map(
// // //           (coord) => [coord[1], coord[0]] // Convert [lng, lat] → [lat, lng]
// // //         );
// // //         setRouteCoords(coords);
// // //       },
// // //       (error) => {
// // //         alert("Location access denied or not available");
// // //         console.error(error);
// // //       }
// // //     );
// // //   }, []);

// // //   return (
// // //     <MapContainer
// // //       center={riderCoords}
// // //       zoom={13}
// // //       style={{ height: "100vh", width: "100%" }}
// // //     >
// // //       <TileLayer
// // //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // //         attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
// // //       />

// // //       {/* Rider marker (FUTA) */}
// // //       <Marker position={riderCoords} icon={L.icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", iconSize: [30, 30] })}>
// // //         <Popup>Rider (FUTA South Gate)</Popup>
// // //       </Marker>

// // //       {/* User marker */}
// // //       {userCoords && (
// // //         <Marker position={userCoords} icon={L.icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png", iconSize: [25, 25] })}>
// // //           <Popup>You</Popup>
// // //         </Marker>
// // //       )}

// // //       {/* Draw route from rider to user */}
// // //       {routeCoords.length > 0 && <Polyline positions={routeCoords} color="blue" />}
// // //     </MapContainer>
// // //   );
// // // }
// // // Track.jsx
// // import React, { useEffect, useRef, useState } from "react";
// // import {
// //   MapContainer,
// //   TileLayer,
// //   Marker,
// //   Popup,
// //   Polyline,
// //   useMap,
// // } from "react-leaflet";
// // import L from "leaflet";
// // import axios from "axios";
// // import { io } from "socket.io-client";
// // import "leaflet/dist/leaflet.css";
// // import RiderLiveLocation from "./RiderLiveLocation";
// // import SearchControl from "./SearchControl";
// // const socket = io("http://localhost:1900");

// // function AutoFitBounds({ points }) {
// //   const map = useMap();
// //   useEffect(() => {
// //     if (points.length >= 2) {
// //       const bounds = L.latLngBounds(points);
// //       map.fitBounds(bounds, { padding: [50, 50] });
// //     }
// //   }, [points]);
// //   return null;
// // }

// // export default function Trackpage() {
// //   const [userAddress, setUserAddress] = useState("");
// //   const [userCoords, setUserCoords] = useState(null);
// //   const [riderCoords, setRiderCoords] = useState(null);
// //   const [routeCoords, setRouteCoords] = useState([]);
// //   const mapRef = useRef();
// // const [isSatellite, setIsSatellite] = useState(false);

// //   const handleTrack = async () => {
// //     const riderLocation = riderCoords;
// //     if (!riderLocation) {
// //       alert("Rider location not yet available.");
// //       return;
// //     }

// //     try {
// //       const res = await axios.post("http://localhost:1900/api/route", {
// //         userAddress,
// //         riderLocation,
// //       });

// //       setUserCoords(res.data.userLocation);
// //       setRouteCoords(res.data.routeCoords);
// //     } catch (error) {
// //       alert("Failed to fetch route");
// //       console.error(error.response?.data || error.message);
// //     }
// //   };

// //   // useEffect(() => {
// //   //   socket.on("rider-location", (pos) => {
// //   //     console.log("Rider location received:", pos);
// //   //     setRiderCoords(pos);
// //   //   });
// //   //   return () => socket.off("rider-location");
// //   // }, []);
// // useEffect(() => {
// //   socket.on("rider-location", (pos) => {
// //     console.log("Rider location received in client:", pos);
// //     setRiderCoords(pos);
// //   });
// //   return () => socket.off("rider-location");
// // }, []);

// //   return (
// //     <div className="w-screen h-screen relative">
// //       {/* Form */}
// //       <div className="absolute z-[99999] top-5 left-5 bg-white p-4 rounded-lg shadow-md w-72">
// //         <button
// //   onClick={() => setIsSatellite(!isSatellite)}
// //   className="absolute top-4 right-4 z-[999] bg-white text-black font-medium px-3 py-2 rounded shadow"
// // >
// //   {isSatellite ? "Street View" : "Satellite View"}
// // </button>

// //         <h2 className="text-lg font-semibold mb-2">Track Delivery</h2>
// //         <input
// //           type="text"
// //           className="w-full border border-gray-300 p-2 rounded mb-2"
// //           placeholder="Enter your address"
// //           value={userAddress}
// //           onChange={(e) => setUserAddress(e.target.value)}
// //         />
// //         <button
// //           onClick={handleTrack}
// //           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
// //         >
// //           Track Now
// //         </button>
// //               <SearchControl setUserCoords={setUserCoords} />

// //       </div>

// //       {/* Map */}
// //       <MapContainer
// //         center={[6.5244, 3.3792]}
// //         zoom={22}
// //         style={{ height: "100%", width: "100%" }}
// //       >
// //              <SearchControl
// //             map={mapRef.current}
// //             setUserCoords={setUserCoords} />

// //        <TileLayer
// //   url={
// //     isSatellite
// //       ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
// //       : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //   }
// //   attribution={
// //     isSatellite
// //       ? '&copy; <a href="https://www.esri.com/">Esri</a> & contributors'
// //       : '&copy; OpenStreetMap contributors'
// //   }
// // />


// //         {riderCoords && (
// //           <Marker
// //             position={[riderCoords.lat, riderCoords.lng]}
// //             icon={L.icon({
// //               iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
// //               iconSize: [30, 30],
// //             })}
// //           >
// //             <Popup>Rider (Admin)</Popup>
// //           </Marker>
// //         )}

// //         {userCoords && (
// //           <Marker
// //             position={[userCoords.lat, userCoords.lng]}
// //             icon={L.icon({
// //               iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
// //               iconSize: [25, 25],
// //             })}
// //           >
// //             <Popup>{userCoords.address}</Popup>
// //           </Marker>
// //         )}

// //         {routeCoords.length > 0 && (
// //           <Polyline positions={routeCoords} color="blue" />
// //         )}

// //         <AutoFitBounds
// //           points={
// //             userCoords && riderCoords
// //               ? [
// //                   [userCoords.lat, userCoords.lng],
// //                   [riderCoords.lat, riderCoords.lng],
// //                 ]
// //               : []
// //           }
// //         />
// //       </MapContainer>
// //       <RiderLiveLocation/>

// //     </div>
// //   );
// // }
// // File: Track.jsx
// import React, { useEffect, useRef, useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Polyline,
//   useMapEvents
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import  {reverseGeocode}  from "./reverseGeocode";
// import socketIOClient from "socket.io-client";
// import axios from "axios";

// const socket = socketIOClient("http://localhost:1900"); // Adjust to your backend

// const MapClickHandler = ({ onMapClick }) => {
//   useMapEvents({
//     click(e) {
//       onMapClick(e.latlng);
//     },
//   });
//   return null;
// };

// const Trackpage = ({ routeData }) => {
//   const mapRef = useRef();
//   const [isSatellite, setIsSatellite] = useState(false);
//   const [riderLocation, setRiderLocation] = useState(routeData?.riderLocation);
//   const [userLocation, setUserLocation] = useState(routeData?.userLocation);
//   const [riderAddress, setRiderAddress] = useState("");
//   const [routeCoords, setRouteCoords] = useState(routeData?.routeCoords || []);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchMarker, setSearchMarker] = useState(null);
// const defaultCenter = [6.5244, 3.3792]; // Lagos, Nigeria fallback

//   // Handle live rider location via Socket.IO
//   useEffect(() => {
//     socket.on("riderLocationUpdate", (newLoc) => {
//       setRiderLocation(newLoc);
//     });

//     return () => socket.off("riderLocationUpdate");
//   }, []);
// useEffect(() => {
//   if (routeData) {
//     setUserLocation(routeData.userLocation);
//     setRouteCoords(routeData.routeCoords);
//   }
// }, [routeData]);

//   // Reverse geocode rider address
//   useEffect(() => {
//     if (riderLocation) {
//       reverseGeocode(riderLocation.lat, riderLocation.lng).then(setRiderAddress);
//     }
//   }, [riderLocation]);

//   // Search address handler
//   const handleSearch = async () => {
//     if (!searchQuery) return;
//     try {
//       const res = await axios.get(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//           searchQuery
//         )}`,
//         { headers: { "User-Agent": "delivery-Trackpage" } }
//       );
//       if (res.data[0]) {
//         const { lat, lon } = res.data[0];
//         const coords = { lat: parseFloat(lat), lng: parseFloat(lon) };
//         setSearchMarker(coords);
//         mapRef.current.setView(coords, 18);
//       }
//     } catch (error) {
//       console.error("Search error:", error);
//     }
//   };

//   return (
//     <div className="relative h-screen w-full">
//       {/* Toggle Satellite */}
//       <div className="absolute top-4 left-4 z-[99999999] flex gap-2">
//         <button
//           onClick={() => setIsSatellite(!isSatellite)}
//           className="bg-white px-4 py-2 rounded shadow"
//         >
//           {isSatellite ? "Street View" : "Satellite View"}
//         </button>

//         {/* Search bar */}
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search address"
//           className="px-2 py-1 border rounded"
//         />
//         <button onClick={handleSearch} className="bg-blue-500 text-white px-3 py-1 rounded">
//           Search
//         </button>
//       </div>
// {userLocation && userLocation.lat && userLocation.lng && (
//   <MapContainer
//     center={[userLocation.lat, userLocation.lng]}
//     zoom={18}
//     style={{ height: "100%", width: "100%" }}
//   >
//     {/* ...rest of the map code */}
//   </MapContainer>
// )}

//       <MapContainer
//   center={userLocation?.lat ? [userLocation.lat, userLocation.lng] : defaultCenter}
//   zoom={18}
//   maxZoom={22}
//   scrollWheelZoom={true}
//   style={{ height: "100%", width: "100%" }}
//   whenCreated={(map) => {
//     mapRef.current = map;
//   }}


//       >
//         <TileLayer
//           url={
//             isSatellite
//               ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//               : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           }
//           attribution={
//             isSatellite
//               ? '&copy; Esri & contributors'
//               : '&copy; OpenStreetMap contributors'
//           }
//         />

//         <MapClickHandler onMapClick={(latlng) => setSearchMarker(latlng)} />

//         {userLocation && (
//           <Marker position={[userLocation.lat, userLocation.lng]}>
//             <Popup>
//               <strong>Sender Address</strong>
//               <br />
//               {userLocation.address}
//             </Popup>
//           </Marker>
//         )}

//         {riderLocation && (
//           <Marker position={[riderLocation.lat, riderLocation.lng]}>
//             <Popup>
//               <strong>Rider Location</strong>
//               <br />
//               {riderAddress}
//             </Popup>
//           </Marker>
//         )}

//         {searchMarker && (
//           <Marker position={[searchMarker.lat, searchMarker.lng]}>
//             <Popup>
//               <strong>Searched Location</strong>
//             </Popup>
//           </Marker>
//         )}

//         {routeCoords && <Polyline positions={routeCoords} color="blue" />}
//       </MapContainer>
//     </div>
//   );
// };

// export default Trackpage;
// File: Track.jsx
// import React, { useEffect, useRef, useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Polyline,
//   useMapEvents
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { reverseGeocode } from "./reverseGeocode";
// import socketIOClient from "socket.io-client";
// import axios from "axios";

// const socket = socketIOClient("http://localhost:1900"); // Adjust to your backend

// const MapClickHandler = ({ onMapClick }) => {
//   useMapEvents({
//     click(e) {
//       onMapClick(e.latlng);
//     },
//   });
//   return null;
// };

// const Trackpage = ({ routeData }) => {
//   const mapRef = useRef();
//   const [isSatellite, setIsSatellite] = useState(false);
//   const [riderLocation, setRiderLocation] = useState(routeData?.riderLocation);
//   const [userLocation, setUserLocation] = useState(routeData?.userLocation);
//   const [riderAddress, setRiderAddress] = useState("");
//   const [routeCoords, setRouteCoords] = useState(routeData?.routeCoords || []);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchMarker, setSearchMarker] = useState(null);
//   const defaultCenter = [6.5244, 3.3792]; // Lagos fallback

//   useEffect(() => {
//     socket.on("riderLocationUpdate", (newLoc) => {
//       setRiderLocation(newLoc);
//     });
//     return () => socket.off("riderLocationUpdate");
//   }, []);

//   useEffect(() => {
//     if (routeData) {
//       setUserLocation(routeData.userLocation);
//       setRouteCoords(routeData.routeCoords);
//     }
//   }, [routeData]);

//   useEffect(() => {
//     if (riderLocation) {
//       reverseGeocode(riderLocation.lat, riderLocation.lng).then(setRiderAddress);
//     }
//   }, [riderLocation]);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         const lat = pos.coords.latitude;
//         const lng = pos.coords.longitude;
//         const address = await reverseGeocode(lat, lng);
//         setUserLocation({ lat, lng, address });
//       },
//       (err) => {
//         console.error("Failed to get user location:", err);
//         alert("We couldn't get your location.");
//       }
//     );
//   }, []);

//   const handleSearch = async () => {
//     if (!searchQuery) return;
//     try {
//       const res = await axios.get(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`,
//         { headers: { "User-Agent": "delivery-Trackpage" } }
//       );
//       if (res.data[0]) {
//         const { lat, lon } = res.data[0];
//         const coords = { lat: parseFloat(lat), lng: parseFloat(lon) };
//         setSearchMarker(coords);
//         mapRef.current.setView(coords, 18);
//       }
//     } catch (error) {
//       console.error("Search error:", error);
//     }
//   };

//   return (
//     <div className="relative h-screen w-full">
//       <div className="absolute top-4 left-4 z-[99999999] flex gap-2">
//         <button
//           onClick={() => setIsSatellite(!isSatellite)}
//           className="bg-white px-4 py-2 rounded shadow"
//         >
//           {isSatellite ? "Street View" : "Satellite View"}
//         </button>

//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search address"
//           className="px-2 py-1 border rounded"
//         />
//         <button onClick={handleSearch} className="bg-blue-500 text-white px-3 py-1 rounded">
//           Search
//         </button>
//       </div>

//       <MapContainer
//         center={userLocation?.lat ? [userLocation.lat, userLocation.lng] : defaultCenter}
//         zoom={18}
//         maxZoom={22}
//         scrollWheelZoom={true}
//         style={{ height: "100%", width: "100%" }}
//         whenCreated={(map) => {
//           mapRef.current = map;
//         }}
//       >
//         <TileLayer
//           url={
//             isSatellite
//               ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//               : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           }
//           attribution={
//             isSatellite
//               ? '&copy; Esri & contributors'
//               : '&copy; OpenStreetMap contributors'
//           }
//         />

//         <MapClickHandler onMapClick={(latlng) => setSearchMarker(latlng)} />

//         {userLocation && (
//           <Marker position={[userLocation.lat, userLocation.lng]}>
//             <Popup>
//               <strong>Sender Address</strong>
//               <br />
//               {userLocation.address}
//             </Popup>
//           </Marker>
//         )}

//         {riderLocation && (
//           <Marker position={[riderLocation.lat, riderLocation.lng]}>
//             <Popup>
//               <strong>Rider Location</strong>
//               <br />
//               {riderAddress}
//             </Popup>
//           </Marker>
//         )}

//         {searchMarker && (
//           <Marker position={[searchMarker.lat, searchMarker.lng]}>
//             <Popup>
//               <strong>Searched Location</strong>
//             </Popup>
//           </Marker>
//         )}

//         {routeCoords && <Polyline positions={routeCoords} color="blue" />}
//       </MapContainer>
//     </div>
//   );
// };

// export default Trackpage;
import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-arrowheads";
import L from "leaflet";
import axios from "axios";
import { io } from "socket.io-client";
import { reverseGeocode } from "./reverseGeocode";
import RiderLiveLocation from "./RiderLiveLocation";
import SearchControl from "./SearchControl";

const socket = io("http://localhost:1900");

// function AutoFitBounds({ points }) {
//   const map = useMap();
//   useEffect(() => {
//     if (points.length >= 2) {
//       const bounds = L.latLngBounds(points);
//       map.fitBounds(bounds, { padding: [50, 50] });
//     }
//   }, [points]);
//   return null;
// }
function AutoFitBounds({ points }) {
  const map = useMap();

  useEffect(() => {
    if (
      Array.isArray(points) &&
      points.length >= 2 &&
      points.every((p) => Array.isArray(p) && p.length === 2 && p.every(Number.isFinite))
    ) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [points]);

  return null;
}

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
};

export default function Trackpage({ routeData }) {
  const mapRef = useRef();
  const [isSatellite, setIsSatellite] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [userCoords, setUserCoords] = useState(routeData?.userLocation || null);
  const [riderCoords, setRiderCoords] = useState(routeData?.riderLocation || null);
  const [riderAddress, setRiderAddress] = useState("");
  const [routeCoords, setRouteCoords] = useState(routeData?.routeCoords || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMarker, setSearchMarker] = useState(null);
  const defaultCenter = [6.5244, 3.3792];
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (userAddress.length < 3) {
        setSuggestions([]);
        return;
      }
  
      try {
        const res = await axios.get("https://nominatim.openstreetmap.org/search", {
          params: {
            q: userAddress,
            format: "json",
            addressdetails: 1,
            limit: 5,
          },
          headers: {
            "User-Agent": "delivery-Trackpage",
          },
        });
  
        setSuggestions(res.data);
      } catch (error) {
        console.error("Autocomplete error:", error);
      }
    };
  
    const delayDebounce = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(delayDebounce);
  }, [userAddress]);
  

// const handleTrack = async () => {
//   if (!riderCoords) return alert("Rider location not yet available.");

//   try {
//     const res = await axios.post("http://localhost:1900/api/route", {
//       userAddress,
//       riderLocation: riderCoords,
//     });

//     setUserCoords(res.data.userLocation);     // set sender
//     setRouteCoords(res.data.routeCoords);     // set line route
//   } catch (error) {
//     alert("Failed to fetch route");
//     console.error(error.response?.data || error.message);
//   }
// };

const handleTrack = async () => {
  if (!userAddress.trim()) {
    return alert("Please enter an address.");
  }

  if (!riderCoords || !riderCoords.lat || !riderCoords.lng) {
    return alert("Rider location not available.");
  }

  try {
    const res = await axios.post("http://localhost:1900/api/route", {
      userAddress,
      riderLocation: riderCoords,
    });

    const userLocation = res.data.userLocation;
    const routeCoordinates = res.data.routeCoords;

    if (userLocation?.lat && userLocation?.lng && routeCoordinates?.length > 0) {
      setUserCoords({
        lat: userLocation.lat,
        lng: userLocation.lng,
        address: userLocation.address,
      });

      setRouteCoords(routeCoordinates);
    } else {
      throw new Error("Incomplete route data");
    }
  } catch (error) {
    alert("Failed to fetch route.");
    console.error(error.response?.data || error.message);
  }
};

  useEffect(() => {
    socket.on("rider-location", (pos) => {
      console.log("Rider location received:", pos);
      setRiderCoords(pos);
    });
    return () => socket.off("rider-location");
  }, []);
  useEffect(() => {
    if (routeCoords.length > 1 && mapRef.current) {
      const polyline = L.polyline(routeCoords, {
        color: "blue",
        weight: 6,
        opacity: 0.7,
      }).addTo(mapRef.current);
  
      polyline.arrowheads({
        size: "15px",
        frequency: "200px",
        fill: true,
        yawn: 45,
      });
  
      return () => {
        mapRef.current.removeLayer(polyline);
      };
    }
  }, [routeCoords]);
  
  useEffect(() => {
    if (riderCoords) {
      reverseGeocode(riderCoords.lat, riderCoords.lng).then(setRiderAddress);
    }
  }, [riderCoords]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const address = await reverseGeocode(lat, lng);
        setUserCoords({ lat, lng, address });
      },
      (err) => {
        console.error("Failed to get user location:", err);
        alert("We couldn't get your location.");
      }
    );
  }, []);
  // https://github.com/ankurdotio/uber-video.git
  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`,
        { headers: { "User-Agent": "delivery-Trackpage" } }
      );
      if (res.data[0]) {
        const { lat, lon } = res.data[0];
        const coords = { lat: parseFloat(lat), lng: parseFloat(lon) };
        setSearchMarker(coords);
        mapRef.current.setView(coords, 18);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="w-screen h-screen relative">
      <div className="absolute z-[99999] top-5 left-5 bg-white p-4 rounded-lg shadow-md w-72">
        <button
          onClick={() => setIsSatellite(!isSatellite)}
          className="absolute top-4 right-4 z-[999] bg-white text-black font-medium px-3 py-2 rounded shadow"
        >
          {isSatellite ? "Street View" : "Satellite View"}
        </button>

        <h2 className="text-lg font-semibold mb-2">Track Delivery</h2>
        <input
          type="text"
          className="w-full border border-gray-300 p-2 rounded mb-2"
          placeholder="Enter your address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <button
          onClick={handleTrack}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Track Now
        </button>
        <SearchControl setUserCoords={setUserCoords} /> 
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search address"
          className="w-full px-2 py-1 border border-gray-300 rounded mt-2"
        />
        <button
          onClick={handleSearch}
          className="w-full mt-1 bg-blue-500 text-white px-3 py-1 rounded"
        >
          Search
        </button>
      </div>

    <MapContainer
  center={[6.5244, 3.3792]}  // Use Lagos or any default
  zoom={13}
  scrollWheelZoom={true}
  style={{ height: "100vh", width: "100vw", zIndex: 1 }}
  whenCreated={(mapInstance) => {
    mapRef.current = mapInstance;
  }}
>

        <SearchControl map={mapRef.current} setUserCoords={setUserCoords} />

        <TileLayer
          url={
            isSatellite
              ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
          attribution={
            isSatellite
              ? '&copy; <a href="https://www.esri.com/">Esri</a> & contributors'
              : '&copy; OpenStreetMap contributors'
          }
        />

        <MapClickHandler
          onMapClick={(latlng) => {
            reverseGeocode(latlng.lat, latlng.lng).then((address) => {
              setSearchMarker({ ...latlng, address });
            });
          }}
        />

        {/* {userCoords && (
          <Marker
            position={[userCoords.lat, userCoords.lng]}
            icon={L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
              iconSize: [25, 25],
            })}
          >
            <Popup>{userCoords.address}</Popup>
          </Marker>
        )} */}
{userCoords?.lat && userCoords?.lng && userCoords?.address && (
  <Marker
    position={[userCoords.lat, userCoords.lng]}
    icon={L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
      iconSize: [25, 25],
    })}
  >
    <Popup>Sender: {userCoords.address}</Popup>
  </Marker>
)}

        {riderCoords && (
          <Marker
            position={[riderCoords.lat, riderCoords.lng]}
            icon={L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              iconSize: [30, 30],
            })}
          >
            <Popup>Rider (Admin)</Popup>
          </Marker>
        )}

        {searchMarker && (
          <Marker position={[searchMarker.lat, searchMarker.lng]}>
            <Popup>{searchMarker.address || "Searched Location"}</Popup>
          </Marker>
        )}

        {/* {routeCoords.length > 0 && (
          <Polyline positions={routeCoords.map((p) => [p.lat, p.lng])} color="blue" />
        )} */}
{/* {Array.isArray(routeCoords) && routeCoords.length > 1 && (
  <Polyline
    positions={routeCoords
      .filter((p) => p && typeof p.lat === "number" && typeof p.lng === "number")
      .map((p) => [p.lat, p.lng])}
    color="blue"
  />
)} */}
{routeCoords.length > 1 &&
  routeCoords.every(
    (p) => Array.isArray(p) && p.length === 2 && p.every(Number.isFinite)
  ) && (
    <Polyline positions={routeCoords} 
     pathOptions={{
      color: "blue",
      weight: 6,
      opacity: 0.7,
      dashArray: "8,12",
      lineJoin: "round",
    }}

       />
)}


        {/* <AutoFitBounds
          points={
            userCoords && riderCoords
              ? [
                  [userCoords.lat, userCoords.lng],
                  [riderCoords.lat, riderCoords.lng],
                ]
              : []
          }
        /> */}
        <AutoFitBounds
  points={
    userCoords?.lat && userCoords?.lng && riderCoords?.lat && riderCoords?.lng
      ? [
          [userCoords.lat, userCoords.lng],
          [riderCoords.lat, riderCoords.lng],
        ]
      : []
  }
/>

      </MapContainer>
<RiderLiveLocation/>
    </div>
  );
}

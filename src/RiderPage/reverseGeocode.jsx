import axios from "axios";

// export const reverseGeocode = async (lat, lon) => {
//   try {
//     const response = await axios.get(
//       `https://nominatim.openstreetmap.org/reverse`,
//       {
//         params: {
//           format: "json",
//           lat,
//           lon,
//         }
//       }
//     );
//     return response.data.display_name;
//   } catch (error) {
//     console.error("Reverse geocoding failed:", error);
//     return "Unknown Location";
//   }
// };
export const reverseGeocode = async (lat, lon) => {
  try {
    const response = await axios.get(`http://localhost:1900/api/reverse`, {
      params: { lat, lon }
    });
    return response.data.display_name;
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    return "Unknown Location";
  }
};

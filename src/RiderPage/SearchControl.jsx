// import { useEffect } from "react";
// import { useMap } from "react-leaflet";
// import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
// import "leaflet-geosearch/dist/geosearch.css";

// const SearchControl = ({ setUserCoords }) => {
//   const map = useMap();

//   useEffect(() => {
//     const provider = new OpenStreetMapProvider();

//     const searchControl = new GeoSearchControl({
//       provider,
//       style: "bar",
//       showMarker: true,
//       showPopup: true,
//       autoClose: true,
//     });

//     map.addControl(searchControl);

//     map.on("geosearch/showlocation", (e) => {
//       const { x, y, label } = e.location;
//       setUserCoords({ lat: y, lng: x, address: label });
//     });

//     return () => {
//       map.removeControl(searchControl);
//     };
//   }, [map]);

//   return null;
// };

// export default SearchControl;
import { useEffect } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

const SearchControl = ({ map, setUserCoords }) => {
  useEffect(() => {
    if (!map) return;

    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: true,
      showPopup: true,
      autoClose: true,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (e) => {
      const { x, y, label } = e.location;
      setUserCoords({ lat: y, lng: x, address: label });
    });

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};

export default SearchControl;

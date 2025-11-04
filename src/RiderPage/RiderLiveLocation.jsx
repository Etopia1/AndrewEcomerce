import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:1900");

export default function RiderLiveLocation() {
  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          console.log("Sending rider location:", coords);
          socket.emit("rider-location", coords);
        },
        (err) => {
          console.error("Geolocation error:", err);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      alert("Geolocation not supported");
    }
  }, []);

  return <div>Broadcasting your current location...</div>;
}

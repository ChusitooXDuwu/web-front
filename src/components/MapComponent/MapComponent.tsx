import React, { useState, useEffect } from "react";
import { Map, Marker, APIProvider } from "@vis.gl/react-google-maps";
import styles from "./MapComponent.module.scss";

interface CustomMapProps {
  address?: string;
}

const CustomMap: React.FC<CustomMapProps> = ({ address }) => {
  const [markerLocation, setMarkerLocation] = useState({
    lat: 4.60632261134741,
    lng: -74.06616800882807,
  });

  useEffect(() => {
    // Wait for the Google Maps API to be loaded
    const checkGoogleMapsLoaded = setInterval(() => {
      if (window.google && window.google.maps) {
        clearInterval(checkGoogleMapsLoaded);

        if (address) {
          // Format the address to include city and country for better geocoding
          const formattedAddress = `${address}, Bogotá, Colombia`;

          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address: formattedAddress }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              const location = results[0].geometry.location;
              setMarkerLocation({
                lat: location.lat(),
                lng: location.lng()
              });
            } else {
              console.error('Geocoding failed:', status);
            }
          });
        }
      }
    }, 100);

    return () => clearInterval(checkGoogleMapsLoaded);
  }, [address]);

  return (
    <div className={styles.map_container1}>
      <APIProvider apiKey="AIzaSyAVHaRVEyP9_fa9x8nbzAQEGNFlAmzgnIA">
        <Map
          className={styles.map_container}
          defaultZoom={15}
          defaultCenter={markerLocation}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
        >
          <Marker position={markerLocation} />
        </Map>
      </APIProvider>
    </div>
  );
}

export default CustomMap;
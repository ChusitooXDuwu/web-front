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
              console.log(`Successfully geocoded "${address}" to:`, {
                lat: location.lat(),
                lng: location.lng()
              });
            } else {
              console.error('Geocoding failed:', status);
              console.log('Using default Bogotá location');
            }
          });
        } else {
          console.log('No address provided, using default Bogotá location');
        }
      }
    }, 100);

    return () => clearInterval(checkGoogleMapsLoaded);
  }, [address]);

  return (
    <div className={styles.map_container1}>
      <APIProvider 
        apiKey="AIzaSyAVHaRVEyP9_fa9x8nbzAQEGNFlAmzgnIA"
        version="weekly"
      >
        <div style={{ width: '100%', height: '400px' }}>
          <Map
            style={{ width: '100%', height: '100%' }}
            defaultZoom={15}
            center={markerLocation}
            gestureHandling={"greedy"}
            disableDefaultUI={false}
            mapId="DEMO_MAP_ID"
          >
            <Marker position={markerLocation} />
          </Map>
        </div>
      </APIProvider>
      
      {/* Simple debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'absolute',
          top: 10,
          left: 10,
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '5px',
          fontSize: '10px',
          borderRadius: '3px',
          zIndex: 1000
        }}>
          <div>Address: {address || 'Default'}</div>
          <div>Lat: {markerLocation.lat.toFixed(4)}</div>
          <div>Lng: {markerLocation.lng.toFixed(4)}</div>
        </div>
      )}
    </div>
  );
}

export default CustomMap;
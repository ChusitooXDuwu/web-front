import React, { useState } from "react";
import { Map, Marker} from "@vis.gl/react-google-maps";
import styles from "./MapComponent.module.scss";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Container } from "react-bootstrap";


const CustomMap = () => {
  // shows marker on London by default
  const [markerLocation, setMarkerLocation] = useState({
    lat: 4.60632261134741,
    lng: -74.06616800882807,
  });

  return (
    <div className={styles.map_container1}>
    <APIProvider apiKey={`AIzaSyAVHaRVEyP9_fa9x8nbzAQEGNFlAmzgnIA`}>
      <Map
        className={styles.map_container}
        defaultZoom={13}
        defaultCenter={markerLocation}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        <Marker position={markerLocation} />
      </Map>
    </APIProvider>
    </div>
  );
}

export default CustomMap;
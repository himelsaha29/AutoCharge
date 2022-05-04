import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./App.css"


export default function App() {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "",
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map/>;
}

function Map() {

    return (
        <GoogleMap 
            zoom={10} 
            center={{ lat: 44, lng: -80 }} 
            mapContainerClassName="mapz"
        ></GoogleMap>
    );
}
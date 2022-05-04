import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import './Map.css'

export default function MapPage() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBkuv8jNfhlAE3iWTyQYdHGUYwZac0Sam0",
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map/>;
}

function Map() {

    const center = useMemo(() => ({lat: 44, lng: -80}), []);

    return (
        <GoogleMap 
            zoom={10} 
            center={center} 
            mapContainerClassName="maps"
        >
            <Marker position={center}/>
        </GoogleMap>
    );
}
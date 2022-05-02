import ReactMapGL from "react-map-gl";
import { useState } from "react";
import './Map.css'

function Map() {
    const [viewport, setViewport] = useState ({
        width: '100%',
        height: '100%',
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 11
    });

    return (
        <div className="maps">
            <ReactMapGL
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken="pk.eyJ1IjoiaGltZWxzYWhhMjkiLCJhIjoiY2twcTVxbXVvMGE4bjJvcXA0dnZyNWcwNSJ9.-8pbVSB0GmhzZT13bnH9Vw"
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            ></ReactMapGL>   
        </div>
        
    );
}

export default Map;
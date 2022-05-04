import Map, { Marker } from 'react-map-gl';
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css'


function Maps() {

    return (
        <div className='maps'>
            <Map
                initialViewState={{
                longitude: -73,
                latitude: 45,
                zoom: 5.5
                }}
                mapboxAccessToken="pk.eyJ1IjoiaGltZWxzYWhhMjkiLCJhIjoiY2twcTVreDQ2MTZ1ejJ2bXdka3FkZGU3YyJ9.9o1-3a4vZ7lagQhlWzTg-A"
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker latitude={45} longitude={-73} offsetTop={-50}  offsetLeft={-25} >
                </Marker>
            </Map>;
        </div>
    );
}

export default Maps;
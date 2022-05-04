import * as React from 'react';
import Map from 'react-map-gl';
import './components/Map.css'

function App() {
  return (<div className='maps'>
    <Map
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 3.5
    }}
    mapboxAccessToken="pk.eyJ1IjoiaGltZWxzYWhhMjkiLCJhIjoiY2twcTVreDQ2MTZ1ejJ2bXdka3FkZGU3YyJ9.9o1-3a4vZ7lagQhlWzTg-A"
    mapStyle="mapbox://styles/mapbox/streets-v9"
  /></div>
  );
}

export default App;

import Map, { Marker } from 'react-map-gl';
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css'


function Maps() {

    renderChargers();

    return (
        <div className='maps'>
            <Map
                initialViewState={{
                longitude: -73,
                latitude: 45,
                zoom: 2.5
                }}
                mapboxAccessToken="pk.eyJ1IjoiaGltZWxzYWhhMjkiLCJhIjoiY2twcTVreDQ2MTZ1ejJ2bXdka3FkZGU3YyJ9.9o1-3a4vZ7lagQhlWzTg-A"
                mapStyle="mapbox://styles/himelsaha29/cl2rcfulj000315lncutyy62e"
            >
                <Marker latitude={45} longitude={-73} offsetTop={-50}  offsetLeft={-25} >
                </Marker>
            </Map>;
        </div>
    );
}


async function getChargers() {
    let url = 'https://api.openchargemap.io/v3/poi/?key=' + process.env.CHARGER_API +  '&maxresults=2';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log("Server error, please try again later");
    }
}

async function renderChargers() {
    let charger = await getChargers();

    console.log("startttttttttttttttttttttttttttttttttttttttttt");
    charger.forEach(charger => {
        console.log(charger);
    });

}


export default Maps;
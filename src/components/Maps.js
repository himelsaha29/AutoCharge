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

        try {
            let allObj = JSON.parse(JSON.stringify(charger));

            let usageType = JSON.parse(JSON.stringify(allObj.UsageType));
            let isPayAtLocation = usageType.IsPayAtLocation;
            let isMembershipRequired = usageType.IsMembershipRequired;
            let isAccessKeyRequired = usageType.IsAccessKeyRequired;

            let statusType = JSON.parse(JSON.stringify(allObj.StatusType));
            let isOperational = statusType.IsOperational;

            let dateLastVerified = JSON.parse(JSON.stringify(allObj.DateLastVerified));



            let addressInfo= JSON.parse(JSON.stringify(allObj.AddressInfo));
            let addressLine1 = addressInfo.AddressLine1;
            let addressLine2 = addressInfo.AddressLine2;
            let town = addressInfo.Town;
            let stateOrProvince = addressInfo.StateOrProvince;

            let country = JSON.parse(JSON.stringify(addressInfo.Country));
            let countryTitle = country.Title;

            let latitude = addressInfo.Latitude;
            let longitude = addressInfo.Longitude;
            let email = addressInfo.ContactEmail;







            //console.log(usgtp.IsPayAtLocation);
        } catch (error) {
            console.log(error);
        }
    });

}


export default Maps;
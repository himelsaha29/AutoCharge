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
            var allObj = JSON.parse(JSON.stringify(charger));

            var usageType = JSON.parse(JSON.stringify(allObj.UsageType));
            var isPayAtLocation = usageType.IsPayAtLocation;
            var isMembershipRequired = usageType.IsMembershipRequired;
            var isAccessKeyRequired = usageType.IsAccessKeyRequired;

            var statusType = JSON.parse(JSON.stringify(allObj.StatusType));
            var isOperational = statusType.IsOperational;

            var dateLastVerified = JSON.parse(JSON.stringify(allObj.DateLastVerified));



            var addressInfo= JSON.parse(JSON.stringify(allObj.AddressInfo));
            var addressLine1 = addressInfo.AddressLine1;
            var addressLine2 = addressInfo.AddressLine2;
            var town = addressInfo.Town;
            var stateOrProvince = addressInfo.StateOrProvince;

            var country = JSON.parse(JSON.stringify(addressInfo.Country));
            var countryTitle = country.Title;
            

            var latitude = addressInfo.Latitude;
            var longitude = addressInfo.Longitude;
            var email = addressInfo.ContactEmail;



            var connections = JSON.parse(JSON.stringify(allObj.Connections))[0];
            var connectionType = JSON.parse(JSON.stringify(connections.ConnectionType));
            var formalName = connectionType.FormalName;
            var actualConnectionName = connectionType.Title;

            var level = JSON.parse(JSON.stringify(connections.Level));
            var isFastChargeCapable = level.IsFastChargeCapable;
            var actualLevel = level.Title;


            var amps = connections.Amps;
            var voltage = connections.Voltage;
            var powerKW = connections.PowerKW;


            var current = JSON.parse(JSON.stringify(connections.CurrentType));
            var currentType = current.Description;

            var points = allObj.NumberOfPoints;


            


            
        } catch (error) {
            console.log(error);
        }
    });

}


export default Maps;
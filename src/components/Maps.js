import Map, { Marker } from 'react-map-gl';
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css'
import * as React from 'react';
import mapboxgl from 'mapbox-gl';

function Maps() {

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback(() => {
        console.log("ZOOM IS :  == " + mapRef.current.getMap().getMinZoom());
        const marker = new mapboxgl.Marker()
        .setLngLat([30.5, 50.5])
        .addTo(mapRef.current.getMap());
      }, []);

   

    //renderChargers();

    return (
        <div className='maps'>
            <Map
                ref={mapRef}
                onLoad={onMapLoad}
                initialViewState={{
                longitude: -73,
                latitude: 45,
                zoom: 2.5
                }}
                mapboxAccessToken="pk.eyJ1IjoiaGltZWxzYWhhMjkiLCJhIjoiY2twcTVreDQ2MTZ1ejJ2bXdka3FkZGU3YyJ9.9o1-3a4vZ7lagQhlWzTg-A"
                mapStyle="mapbox://styles/himelsaha29/cl2rcfulj000315lncutyy62e"
            >
                <Marker latitude={45} longitude={-73}>
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

        
        var allObj = JSON.parse(JSON.stringify(charger));

        var usageType = JSON.parse(JSON.stringify(allObj.UsageType));
        try{
            var isPayAtLocation = usageType.IsPayAtLocation;
            var isMembershipRequired = usageType.IsMembershipRequired;
            var isAccessKeyRequired = usageType.IsAccessKeyRequired;
        } catch (error) {
            isPayAtLocation = "N/A";
            isMembershipRequired = "N/A";
            isAccessKeyRequired = "N/A";
        }

        var statusType = JSON.parse(JSON.stringify(allObj.StatusType));
        try{
            var isOperational = statusType.IsOperational;
        } catch (error) {
            isOperational = "N/A";
        }

        var dateLastVerified = JSON.parse(JSON.stringify(allObj.DateLastVerified));
        if(dateLastVerified == null) {
            dateLastVerified = "N/A";
        }

        var addressInfo= JSON.parse(JSON.stringify(allObj.AddressInfo));
        try{
            var addressLine1 = addressInfo.AddressLine1;
            var addressLine2 = addressInfo.AddressLine2;
            var town = addressInfo.Town;
            var stateOrProvince = addressInfo.StateOrProvince;
            var email = addressInfo.ContactEmail;
        } catch (error) {
            addressLine1 = "N/A";
            addressLine2 = "N/A";
            town = "N/A";
            stateOrProvince = "N/A";
            email = "N/A";
        }

        var country = JSON.parse(JSON.stringify(addressInfo.Country));
        try{
            var countryTitle = country.Title;
        } catch (error) {
            countryTitle = "N/A";
        }

        try{
            var latitude = addressInfo.Latitude;
            var longitude = addressInfo.Longitude;
        } catch (error) {
            console.log(error);

            // issue
        }


        var connections = JSON.parse(JSON.stringify(allObj.Connections))[0];
        var connectionType = JSON.parse(JSON.stringify(connections.ConnectionType));
        try{
            var formalName = connectionType.FormalName;
            var actualConnectionName = connectionType.Title;
            var amps = connections.Amps;
            var voltage = connections.Voltage;
            var powerKW = connections.PowerKW;
        } catch (error) {
            formalName = "N/A";
            actualConnectionName = "N/A";
            amps = "N/A";
            voltage = "N/A";
            powerKW = "N/A";
        }

        var level = JSON.parse(JSON.stringify(connections.Level));
        try{
            var isFastChargeCapable = level.IsFastChargeCapable;
            var actualLevel = level.Title;
        } catch (error) {
            isFastChargeCapable = "N/A";
            actualLevel = "N/A";
        }

        var current = JSON.parse(JSON.stringify(connections.CurrentType));
        try{
            var currentType = current.Description;
        } catch (error) {
            currentType = "N/A";
        }

        try{
            var points = allObj.NumberOfPoints;
        } catch (error) {
            points = "N/A";
        }
    });

}

// function getMap() {
//     const {current: map} = useMap();
// }


export default Maps;
import Map, { Marker } from 'react-map-gl';
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css'
import * as React from 'react';
import icon from './marker.png';

var mapRef= null;


function Maps() {


    mapRef = React.useRef();
    const onMapLoad = React.useCallback(() => {
        // console.log("ZOOM IS :  == " + mapRef.current.getMap().getMinZoom());
    
        ////


        mapRef.current.getMap().loadImage(
            'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
            (error, image) => {
                if (error) throw error;
                mapRef.current.getMap().addImage('custom-marker', image);

                mapRef.current.getMap().addSource('points', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [
                            {
                                'type': 'Feature',
                                'geometry': {
                                    'type': 'Point',
                                    'coordinates': [-77.03238901390978, 38.913188059745586]
                                }
                            }
                        ]

                    }   
                });
                
             
                
            }
        );

        ////

    }, []);

    renderChargers();

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
            
            </Map>;
        </div>
    );
}


async function getChargers() {
    let url = 'https://api.openchargemap.io/v3/poi/?key=' + process.env.CHARGER_API + '&maxresults=10&countrycode=CA';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log("Server error, please try again later");
    }
}

async function renderChargers() {

    var featurePoints = [];
    var globalCounter = 0;

    let charger = await getChargers();

    console.log("startttttttttttttttttttttttttttttttttttttttttt");



    charger.forEach(charger => {

        try{
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
            //console.log(addressLine1 + " " + addressLine2 + " " + town + " " + stateOrProvince);
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

            // var el = document.createElement('p1');
            // el.className = 'marker';
            // el.addEventListener('click', () => {
            //     window.alert("hello");
            // });

            // const marker = new mapboxgl.Marker(el)
            //     .setLngLat([longitude, latitude])
            //     .addTo(mapRef.current.getMap())



            var longLat = [];
            longLat[0] = longitude;
            longLat[1] = latitude;
            console.log("FEATURE LONGLATS == " + longLat);
            featurePoints[globalCounter] = longLat;
            globalCounter++;

            console.log("FEATURE POINTS = = " + featurePoints);

            
                
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

    } catch(error) {

    }
    });


    const mySource = mapRef.current.getMap().getSource('points');
    console.log("get source == " + mySource);
    mySource.setData({
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [-77.03238901390978, 38.913188059745586]
                
            }
        }]
    });

    
    // Add a symbol layer
    mapRef.current.getMap().addLayer({
        'id': 'pointsSymbol',
        'type': 'symbol',
        'source': 'points',
        'layout': {
            'icon-image': 'custom-marker',

        }
    });


}

// function getMap() {
//     const {current: map} = useMap();
// }


export default Maps;
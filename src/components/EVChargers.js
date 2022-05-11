import Maps, { Marker } from 'react-map-gl';
import './EVChargers.css';
import 'mapbox-gl/dist/mapbox-gl.css'
import * as React from 'react';
import icon from './marker.svg';
import mapboxgl from 'mapbox-gl';

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

var mapRef= null;
var markerCounter = 0;
var markerMap = undefined;

var geojson = {
    "type": "FeatureCollection",
    "features": []
};


function EVChargers() {

    markerMap = new Map();
    mapRef = React.useRef();
    // let img = new Image(15,15);
    // img.onload = ()=> mapRef.current.getMap().addImage('icon', img);
    // img.src = icon;

    const onMapLoad = React.useCallback(() => {

        mapRef.current.getMap().loadImage(
            'https://raw.githubusercontent.com/saintlyvermin/auxiliary/main/marker.png',
            (error, image) => {
                if (error) throw error;
                mapRef.current.getMap().addImage('custom-marker', image);

                mapRef.current.getMap().addSource('points', {
                    "type": "geojson",
                    "data": geojson
                });

                mapRef.current.getMap().addLayer({
                    'id': 'pointsSymbol',
                    'type': 'symbol',
                    'source': 'points',
                    'layout': {
                        'icon-image': 'custom-marker',
                    }
                });

                mapRef.current.getMap().on('click', 'pointsSymbol', (e) => {
                    
                    const coordinates = e.features[0].geometry.coordinates.slice();
                     
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }
                     
                    new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(markerMap.get(e.features[0].properties.description[16]))
                    .addTo(mapRef.current.getMap());
                    });
                     
                    // Change the cursor to a pointer when the mouse is over the places layer.
                    mapRef.current.getMap().on('mouseenter', 'pointsSymbol', () => {
                        mapRef.current.getMap().getCanvas().style.cursor = 'pointer';
                    });
                     
                    // Change it back to a pointer when it leaves.
                    mapRef.current.getMap().on('mouseleave', 'pointsSymbol', () => {
                        mapRef.current.getMap().getCanvas().style.cursor = '';
                    });
            }
        );

        ////

    }, []);

    renderChargers();

    return (
        <div className='maps'>
            <Maps
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
            
            </Maps>;
        </div>
    );
}


async function getChargers() {
    let url = 'https://api.openchargemap.io/v3/poi/?key=' + process.env.CHARGER_API + '&maxresults=1000';

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

        var chargerInfo = [];

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

    try{
        var latitude = addressInfo.Latitude;
        var longitude = addressInfo.Longitude;

        

        var marker = {
            type: 'Feature',
            properties: {
                description: markerCounter.toString()
            },
            geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
            }
        };
        
        geojson.features.push(marker);

        
            
    } catch (error) {
        console.log(error);

        // issue
    }

    chargerInfo = [isPayAtLocation, isMembershipRequired, isAccessKeyRequired, isOperational, 
        dateLastVerified, addressLine1, addressLine2, town, stateOrProvince, email, 
        countryTitle, latitude, longitude, formalName, actualConnectionName, amps, voltage, 
        powerKW, isFastChargeCapable, actualLevel, currentType, points];


    markerMap.set(markerCounter.toString(), chargerInfo);

    markerCounter++;

    });


    const mySource = mapRef.current.getMap().getSource('points');
    mySource.setData(geojson);


}


export default EVChargers;
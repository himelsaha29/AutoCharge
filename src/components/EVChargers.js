import Maps, { Marker } from 'react-map-gl';
import './EVChargers.css';
import 'mapbox-gl/dist/mapbox-gl.css'
import * as React from 'react';
import icon from './marker.svg';
import mapboxgl from 'mapbox-gl';
import Modal from './Modal';
import "./Modal.css";
import Button from '@mui/material/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { CssBaseline } from '@mui/material';
import { Buttons } from './';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        position: 'relative',
        left: '50%',
        top: '50%',
        transform: 'translate(-0%, -50%)',
        borderWidth: 5,
        borderColor: '#ff5f5f'

    },
    btn: {
        border: 'none',
        marginTop: 20,
        marginBottom: -4,
        borderRadius: 6,
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: '1.0vw',
        cursor: 'pointer',
        color: '#fff',
        backgroundSize: '200%',
        transition: '0.4s',
        '&:hover': {
            backgroundPosition: 'right'
        }
    },
    btn1: {
        backgroundImage: 'linear-gradient(45deg, #134911, #15b436, #2483bd)'
    }
})


// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;


const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
})

var mapRef = null;
var markerCounter = 0;
var markerMap = new Map();


var geojson = {
    "type": "FeatureCollection",
    "features": []
};

function EVChargers() {

    const classes = useStyles();

    const [chargerPopUpInfo, setChargerPopUpInfo] = React.useState([]);

    const populateChargerPopUpInfo = (obj) => {
        setChargerPopUpInfo(obj);
    }

    const [modal, setModal] = React.useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };


    if (modal) {
        document.body.classList.add('active-modal');
        // window.onload = function() {
        //     document.getElementById('loading').style.filter = 'blur(2px)';

        // };

    } else {
        document.body.classList.remove('active-modal');
        //document.getElementById('root').style.filter = 'blur(0px)';
    }


    mapRef = React.useRef();


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


                    toggleModal();

                    console.log("value = " + markerMap.get("1"));

                    populateChargerPopUpInfo(parseChargerInfo(markerMap.get(e.features[0].properties.description)));

                    console.log(parseChargerInfo(markerMap.get(e.features[0].properties.description)));

                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }

                    new mapboxgl.Popup()
                        .setLngLat(coordinates)
                        .setHTML(parseChargerInfo(markerMap.get(e.features[0].properties.description)))
                        .addTo(mapRef.current.getMap());
                });


                mapRef.current.getMap().on('mouseenter', 'pointsSymbol', () => {
                    mapRef.current.getMap().getCanvas().style.cursor = 'pointer';
                });


                mapRef.current.getMap().on('mouseleave', 'pointsSymbol', () => {
                    mapRef.current.getMap().getCanvas().style.cursor = '';
                });
            }
        );

        ////

    }, []);

    renderChargers();

    return (

        <>
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

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} class="overlay" ></div>


                    <div className="modal-content" >
                        <div>
                            <div class="row">
                                <div class="column">
                                    <h2 class="white-text">Current type</h2>
                                    <p class="white-text">{chargerPopUpInfo[18]}</p>
                                </div>
                                <div class="column">
                                    <h2 class="white-text">Fast charge</h2>
                                    <p class="white-text">{chargerPopUpInfo[16]}</p>
                                </div>
                                <div class="column">
                                    <h2 class="white-text">Amps</h2>
                                    <p class="white-text">{chargerPopUpInfo[13]}</p>
                                </div>
                                <div class="column">
                                    <h2 class="white-text">Voltage</h2>
                                    <p class="white-text">{chargerPopUpInfo[14]}</p>
                                </div>
                                <div class="column">
                                    <h2 class="white-text">Power</h2>
                                    <p class="white-text">{chargerPopUpInfo[15]}</p>
                                </div>
                                <div class="column">
                                    <h2 class="white-text">Operational</h2>
                                    <p class="white-text">{chargerPopUpInfo[3]}</p>
                                </div>
                                <div class="column">
                                    <h2 class="white-text">Points</h2>
                                    <p class="white-text">{chargerPopUpInfo[19]}</p>
                                </div>
                                <div class="column">
                                    <h2 class="white-text">Level</h2>
                                    <p class="white-text">{chargerPopUpInfo[17]}</p>
                                </div>
                                <div class="column">
                                    <h2 class="white-text">Connection name</h2>
                                    <p class="white-text">{chargerPopUpInfo[12]}</p>
                                </div>
                                <div class="column">
                                    <h2 class="white-text">Pay at location</h2>
                                    <p class="white-text">{chargerPopUpInfo[0]}</p>
                                </div>
                                <div class="column">
                                    <h2 class="white-text">Membership required</h2>
                                    <p class="white-text">{chargerPopUpInfo[1]}</p>
                                </div>
                                <div class="column">
                                    <h2 class="white-text">Access key required</h2>
                                    <p class="white-text">{chargerPopUpInfo[2]}</p>
                                </div>
                                <div class="column">
                                    <h2 class="white-text">Last verified</h2>
                                    <p class="white-text">{chargerPopUpInfo[4]}</p>
                                </div>
                                <div class="column">
                                    <h2 class="white-text">Area</h2>
                                    <p class="white-text">{chargerPopUpInfo[5]}</p>
                                </div>
                                <div class="column">
                                    <h2 class="white-text">Town</h2>
                                    <p class="white-text">{chargerPopUpInfo[6]}</p>
                                </div>
                                <div class="column">
                                    <h2 class="white-text">Province/State</h2>
                                    <p class="white-text">{chargerPopUpInfo[7]}</p>
                                </div>
                                <div class="column">
                                    <h2 class="white-text">Country</h2>
                                    <p class="white-text">{chargerPopUpInfo[9]}</p>
                                </div>
                                <div class="column">
                                    <h2 class="white-text">Contact</h2>
                                    <p class="white-text">{chargerPopUpInfo[8]}</p>
                                </div>
                            </div>
                        </div>


                        <div className={classes.container}>
                            <button onClick={toggleModal} className={`${classes.btn} ${classes.btn1}`}>Close</button>
                        </div>
                    </div>

                </div>

            )}
        </>
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

        try {
            var allObj = JSON.parse(JSON.stringify(charger));

            var usageType = JSON.parse(JSON.stringify(allObj.UsageType));
            try {
                var isPayAtLocation = usageType.IsPayAtLocation;
                var isMembershipRequired = usageType.IsMembershipRequired;
                var isAccessKeyRequired = usageType.IsAccessKeyRequired;
            } catch (error) {
                isPayAtLocation = "N/A";
                isMembershipRequired = "N/A";
                isAccessKeyRequired = "N/A";
            }

            var statusType = JSON.parse(JSON.stringify(allObj.StatusType));
            try {
                var isOperational = statusType.IsOperational;
            } catch (error) {
                isOperational = "N/A";
            }

            var dateLastVerified = JSON.parse(JSON.stringify(allObj.DateLastVerified));
            if (dateLastVerified == null) {
                dateLastVerified = "N/A";
            } else {
                dateLastVerified = dateLastVerified.substring(0, dateLastVerified.indexOf('T'));
            }

            var addressInfo = JSON.parse(JSON.stringify(allObj.AddressInfo));
            try {
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
            try {
                var countryTitle = country.Title;
            } catch (error) {
                countryTitle = "N/A";
            }


            var connections = JSON.parse(JSON.stringify(allObj.Connections))[0];
            var connectionType = JSON.parse(JSON.stringify(connections.ConnectionType));
            try {
                var formalName = connectionType.FormalName;
                var actualConnectionName = connectionType.Title;

            } catch (error) {
                formalName = "N/A";
                actualConnectionName = "N/A";
            }
            try {
                var amps = connections.Amps;
                var voltage = connections.Voltage;
                var powerKW = connections.PowerKW;

                if (amps != undefined && amps != "N/A") {
                    amps = amps + " A";
                }
                if (voltage != undefined && voltage != "N/A") {
                    voltage = voltage + " V";
                }
                if (powerKW != undefined && powerKW != "N/A") {
                    powerKW = powerKW + " kW";
                }

            } catch (error) {
                amps = "N/A";
                voltage = "N/A";
                powerKW = "N/A";
            }

            var level = JSON.parse(JSON.stringify(connections.Level));
            try {
                var isFastChargeCapable = level.IsFastChargeCapable;
                var actualLevel = level.Title;
            } catch (error) {
                isFastChargeCapable = "N/A";
                actualLevel = "N/A";
            }

            var current = JSON.parse(JSON.stringify(connections.CurrentType));
            try {
                var currentType = current.Description;
            } catch (error) {
                currentType = "N/A";
            }

            try {
                var points = allObj.NumberOfPoints;
            } catch (error) {
                points = "N/A";
            }

        } catch (error) {

        }

        try {
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
            dateLastVerified, checkAddress(addressLine1, addressLine2), town, stateOrProvince, email,
            countryTitle, latitude, longitude, checkConnection(formalName, actualConnectionName), amps, voltage,
            powerKW, isFastChargeCapable, actualLevel, currentType, points];


        markerMap.set(markerCounter.toString(), chargerInfo);

        markerCounter++;

    });


    const mySource = mapRef.current.getMap().getSource('points');
    mySource.setData(geojson);


}


function parseChargerInfo(info) {

    for (var i = 0; i < info.length; i++) {
        if (info[i] === false) {
            info[i] = "No";
        } else if (info[i] === true) {
            info[i] = "Yes";
        } else if (info[i] == undefined) {
            info[i] = "N/A";
        }
    }

    return info;
}


function checkAddress(addressLine1, addressLine2) {
    var address = "";
    if (addressLine1 != undefined && addressLine1 != "N/A") {
        address = addressLine1;
    }
    if (addressLine2 != undefined && addressLine2 != "N/A") {
        if (address != "") {
            address = address + ", " + addressLine2;
        } else {
            address = addressLine2;
        }
    }
    if (address == "") {
        address = "N/A";
    }
    return address;
}


function checkConnection(formalName, actualConnectionName) {
    var conn = "";
    if (formalName != undefined && formalName != "N/A") {
        conn = formalName;
    }
    if (actualConnectionName != undefined && actualConnectionName != "N/A") {
        if (conn != "") {
            conn = conn + ", " + actualConnectionName;
        } else {
            conn = actualConnectionName;
        }
    }
    if (conn == "") {
        conn = "N/A";
    }
    return conn;
}

export default EVChargers;
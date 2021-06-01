import {useState} from 'react'
import L, {Icon} from 'leaflet'
import {MapContainer, TileLayer, Marker, useMap} from 'react-leaflet'
import 'leaflet-routing-machine'
import styles from './FindMap.module.css'

import {Home, User} from 'libs/Icons'

const userIcon = new Icon({
    iconUrl: '/user.svg',
    iconSize: [30, 30]
})

function Routing({roomPosition, myPosition, center, setCenter}) {
    const [totalDistance, setTotalDistance] = useState()
    const [totalTime, setTotalTime] = useState()
    const map = useMap()

    map.flyTo(center, map.getZoom())
    const routeControl = L.Routing.control({
        createMarker: () => null,
        waypoints: [L.latLng(roomPosition), L.latLng(myPosition)],
        lineOptions: {
            styles: [{color: '#6490fa'}]
        }
    }).addTo(map)

    routeControl.on('routesfound', ({routes}) => {
        setTotalDistance(routes[0].summary.totalDistance)
        setTotalTime(routes[0].summary.totalTime)
    })

    return (
        <div className={styles.detail}>
            <i onClick={() => setCenter(myPosition)}><User/></i>
            <div>
                <p>{totalDistance} meter</p>
                <p>{totalTime} menit</p>
            </div>
            <i onClick={() => setCenter(roomPosition)}><Home/></i>
        </div>
    )
}

export default function FindMap({roomPosition, myPosition}) {
    const [center, setCenter] = useState(roomPosition)
    return (
        <MapContainer center={center} zoom={15}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Routing center={center} roomPosition={roomPosition} myPosition={myPosition} setCenter={setCenter}/>
            <Marker position={roomPosition}/>
            <Marker position={myPosition} icon={userIcon}/>
        </MapContainer>
    )
}
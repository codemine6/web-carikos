import {useState} from 'react'
import L, {Icon} from 'leaflet'
import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from 'react-leaflet'
import 'leaflet-routing-machine'
import styles from './NearestMap.module.css'

import {Gps} from 'libs/Icons'

import Link from 'next/link'

function RoomMarker({room, myPosition}) {
    const roomIcon = new Icon({
        iconUrl: '/icons/home.svg',
        iconSize: [30, 30]
    })

    const routing = L.Routing.control({
        createMarker: () => null,
        waypoints: [L.latLng(myPosition), L.latLng(room.location.coords)],
        lineOptions: {
            styles: [{color: '#6490fa'}]
        }
    })

    const map = useMapEvents({
        popupopen: e => {
            if (e.popup._latlng.lat === room.location.coords[0] && e.popup._latlng.lng === room.location.coords[1]) {
                routing.addTo(map)
            }
        },
        popupclose: () => {
            map.removeControl(routing)
        }
    })

    return (
        <Marker position={room.location.coords} icon={roomIcon}>
            <Popup>
                <div className={styles.popup}>
                    <div className={styles.detail}>
                        <img src={room.images[0]} alt=""/>
                        <div>
                            <h3>{room.name}</h3>
                            <span>{room.location.address}</span>
                            <p>Rp. {room.pricing.price.toLocaleString('id-ID')}/{room.pricing.type}</p>
                        </div>
                    </div>
                    <Link href={`/rooms/${room._id}`}>Detail</Link>
                </div>
            </Popup>
        </Marker>
    )
}

function ChangeView({center}) {
    console.log(center)
    const map = useMap()
    map.flyTo(center, map.getZoom())
    return null
}

export default function NearestMap({myPosition, rooms}) {
    const [center, setCenter] = useState([0, 0])
    const userIcon = new Icon({
        iconUrl: '/icons/user.svg',
        iconSize: [30, 30]
    })

    return (
        <>
            <MapContainer center={myPosition} zoom={13} onPopupClose={() => console.log('Open')}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <ChangeView center={center}/>
                <Marker position={myPosition} icon={userIcon}/>
                {rooms?.map(room => (
                    <RoomMarker key={room._id} room={room} myPosition={myPosition}/>
                ))}
            </MapContainer>
            <i className={styles.gpsIcon} onClick={() => setCenter(myPosition)}><Gps/></i>
        </>
    )
}
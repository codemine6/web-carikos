import {Icon} from 'leaflet'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import styles from './NearestMap.module.css'

function RoomMarker({room}) {
    const roomIcon = new Icon({
        iconUrl: '/icons/home.svg',
        iconSize: [30, 30]
    })

    return (
        <Marker position={room.location.coords} icon={roomIcon}>
            <Popup>
                <div className={styles.popup}>
                    <div className={styles.detail}>
                        <img src={room.images} alt=""/>
                        <div>
                            <h3>{room.name}</h3>
                            <p>Rp. {room.pricing.price.toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                    <button>Detail</button>
                </div>
            </Popup>
        </Marker>
    )
}

export default function NearestMap({myPosition, rooms}) {
    console.log(rooms?.[0].location.coords)
    return (
        <MapContainer center={myPosition} zoom={15}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Marker position={myPosition}/>
            {rooms?.map(room => (
                <RoomMarker key={room._id} room={room}/>
            ))}
        </MapContainer>
    )
}
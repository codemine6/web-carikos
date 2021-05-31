import {MapContainer, TileLayer, Marker, useMapEvent} from 'react-leaflet'

function Markers({position, setPosition}) {
    const drager = {
        dragend: ({target}) => {
            setPosition({type: 'SET_COORDS', payload: [target._latlng.lat, target._latlng.lng]})
        }
    }

    const map = useMapEvent('click', ({latlng}) => {
        setPosition({type: 'SET_COORDS', payload: [latlng.lat, latlng.lng]})
    })
    map.flyTo(position, map.getZoom())

    return <Marker position={position} draggable eventHandlers={drager}/>
}

export default function SetMap({center, setPosition}) {
    return (
        <MapContainer center={center} zoom={15}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Markers position={center} setPosition={setPosition}/>
        </MapContainer>
    )
}
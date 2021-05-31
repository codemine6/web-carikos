import {MapContainer, TileLayer, Marker, useMap, useMapEvent} from 'react-leaflet'

function ChangeView({center, zoom}) {
    const map = useMap()
    map.setView(center, zoom)
    return null
}

function Markers({position, setPosition, draggable}) {
    const drager = {
        dragend: ({target}) => {
            setPosition({type: 'SET_COORDS', payload: [target._latlng.lat, target._latlng.lng]})
        }
    }

    const map = useMapEvent('click', ({latlng}) => {
        setPosition && setPosition({type: 'SET_COORDS', payload: [latlng.lat, latlng.lng]})
    })
    map.flyTo(position, map.getZoom())

    return <Marker position={position} draggable={draggable} eventHandlers={drager}/>
}

export default function Map({center, zoom, draggableMarker, setPosition, ...props}) {
    return (
        <MapContainer center={center} zoom={zoom} {...props}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <ChangeView center={center} zoom={zoom}/>
            <Markers position={center} setPosition={setPosition} draggable={draggableMarker}/>
        </MapContainer>
    )
}
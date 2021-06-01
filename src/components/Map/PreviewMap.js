import {MapContainer, TileLayer, Marker, useMap} from 'react-leaflet'

function ChangeView({center}) {
    const map = useMap()
    map.setView(center, 15)
    return null
}

export default function PreviewMap({center}) {
    return (
        <MapContainer center={center} zoom={15} zoomControl={false} dragging={false} doubleClickZoom={false} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <ChangeView center={center}/>
            <Marker position={center}/>
        </MapContainer>
    )
}
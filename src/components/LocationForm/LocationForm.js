import {useState} from 'react'
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic'
import {useFormContext} from 'contexts/RoomFormContext'
import styles from './LocationForm.module.css'

import cities from 'libs/cities.json'

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), {ssr: false})
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), {ssr: false})
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), {ssr: false})

export default function LocationForm() {
    const {form, dispatch} = useFormContext()
    const [input, setInput] = useState()
    const [list, setList] = useState()
    const router = useRouter()

    function handleChange(e) {
        const value = e.target.value
        const result = cities.filter(city => city.toLowerCase().includes(value.toLowerCase()))
        setInput(value)
        setList(result)
    }

    function setCity(city) {
        setInput(city)
        setList()
        dispatch({type: 'SET_CITY', payload: city})
    }

    function setAddress(e) {
        dispatch({type: 'SET_ADDRESS', payload: e.target.value})
    }

    return (
        <div>
            <div className={styles.form}>
                <label>Alamat</label>
                <input type="text" placeholder="Kota" value={input ?? form.location.city} onChange={handleChange}/>
                {list?.length === 0 && <p className={styles.error}>Kota tidak ditemukan</p>}

                <textarea placeholder="Alamat lengkap" value={form.location.address} onChange={setAddress}/>

                {list?.length && <div className={styles.list}>
                    {list.map((city, i) => (
                        <p onClick={() => setCity(city)} key={i}>{city}</p>
                    ))}
                </div>}
            </div>
            <div className={styles.map} onClick={() => router.push('/rooms/set-position')}>
                {form.location.coords.length &&
                <MapContainer center={form.location.coords} zoom={15} zoomControl={false} scrollWheelZoom={false} dragging={false}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <Marker position={form.location.coords}/>
                </MapContainer>}
            </div>
        </div>
    )
}
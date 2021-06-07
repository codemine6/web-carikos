import {useFormContext} from 'contexts/RoomFormContext'
import styles from './RoomForm.module.css'

import ImageInput from 'components/ImageInput/ImageInput'
import FacilitiesForm from 'components/FacilitiesForm/FacilitiesForm'
import LocationForm from 'components/LocationForm/LocationForm'
import PricingForm from 'components/PricingForm/PricingForm'

export default function RoomForm() {
    const {form, dispatch} = useFormContext()

    function setName(e) {
        dispatch({type: 'SET_NAME', payload: e.target.value})
    }

    function setCustomerType(e) {
        dispatch({type: 'SET_CUSTOMER', payload: e.target.value})
    }

    return (
        <div className={styles.form}>
            <label>Name</label>
            <input type="text" placeholder="Nama kost" value={form.name} onChange={setName}/>

            <label>Foto</label>
            <ImageInput/>

            <FacilitiesForm/>

            <label>Tipe</label>
            <div className={styles.customer}>
                {['all', "male", 'female'].map((item, i) => (
                    <div key={i}>
                        <input id={i} type="radio" name="type" value={item} checked={item === form.customerType} onChange={setCustomerType}/>
                        <label htmlFor={i}>{item === 'all' && 'Campur'}{item === 'male' && 'Putra'}{item === 'female' && 'Putri'}</label>
                    </div>
                ))}
            </div>

            <label>Deskripsi</label>
            <textarea placeholder="Deskripsi" rows="5" spellCheck={false} value={form.description} onChange={e => dispatch({type: 'SET_DESCRIPTION', payload: e.target.value})}/>

            <LocationForm/>
            <PricingForm/>

            <div className={styles.available}>
                <input type="number" placeholder="0" value={form.availableRooms === 0 ? '' : form.availableRooms} onChange={e => dispatch({type: 'SET_AVAILABLE', payload: e.target.value})}/>
                <label>Kamar Tersedia</label>
            </div>
        </div>
    )
}
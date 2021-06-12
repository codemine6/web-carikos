import {useState} from 'react'
import styles from './RoomMenu.module.css'

export default function RoomMenu(props) {
    const [selected, setSelected] = useState(props.default || 'Kost')

    function handleChange(type) {
        setSelected(type)
        props.onChange(type)
    }

    return (
        <div className={styles.menus}>
            {['Kost', 'Kontrakan', 'Penginapan', 'Perumahan', 'Hotel', 'Villa'].map((item, i) => (
                <button className={item === selected ? styles.selected : null} key={i} onClick={() => handleChange(item)}>
                    {item}
                </button>
            ))}
        </div>
    )
}
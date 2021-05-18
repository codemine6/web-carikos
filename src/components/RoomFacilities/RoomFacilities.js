import {useState, useEffect, useRef} from 'react'
import styles from './RoomFacilities.module.css'

import {AirConditioner, Bath, Bed, Blank, Cctv, CupBoard, Cutlery, Parking, Refrigerator, Sofa, Television, WashingMachine, Wifi} from 'libs/Icons'

export default function RoomFacilities({facilities}) {
    const [list, setList] = useState(facilities.slice(0, 5))
    const [active, setActive] = useState()
    const listRef = useRef()

    function hideName(e) {
        !listRef.current.contains(e.target) && setActive()
    }

    useEffect(() => {
        active ? document.addEventListener('click', hideName) : document.removeEventListener('click', hideName)
        return () => document.removeEventListener('click', hideName)
    }, [active])

    return (
        <div className={styles.facilities}>
            <h4>Fasilitas ({facilities.length})</h4>
            <div className={styles.list} ref={listRef}>
                {list.map(facility => (
                    <div className={styles.item} key={facility.id} onClick={() => setActive(facility)}>
                        {active === facility && <p>{facility.name}</p>}
                        <i>
                            {facility.id === '1' && <AirConditioner/>}
                            {facility.id === '2' && <Bath/>}
                            {facility.id === '3' && <Bed/>}
                            {facility.id === '4' && <Cctv/>}
                            {facility.id === '5' && <CupBoard/>}
                            {facility.id === '6' && <Cutlery/>}
                            {facility.id === '7' && <Parking/>}
                            {facility.id === '8' && <Refrigerator/>}
                            {facility.id === '9' && <Sofa/>}
                            {facility.id === '10' && <Television/>}
                            {facility.id === '11' && <WashingMachine/>}
                            {facility.id === '12' && <Wifi/>}
                        </i>
                    </div>
                ))}
                {facilities.length > 5 && facilities.length !== list.length &&
                    <div className={styles.more} onClick={() => setList(facilities)}>
                        <i><Blank/></i>
                        <p>+{facilities.length - 5}</p>
                    </div>
                }
            </div>
        </div>
    )
}
import {useRouter} from 'next/router'
import styles from './Alert.module.css'

import Button from 'components/Button/Button'

export default function Alert({text, path, onClose}) {
    const router = useRouter()

    function confirm() {
        router.push({pathname: path, query: {from: router.asPath.substr(1)}})
    }

    return (
        <>
            <div className={styles.alert}>
                <p>{text}</p>
                <Button onClick={confirm}>Ok</Button>
            </div>
            <div className={styles.overlay} onClick={onClose}/>
        </>
    )
}
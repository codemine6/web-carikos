import styles from './Alert.module.css'

import Button from 'components/Button/Button'

export default function Alert({message, navigate, onClose}) {
    function confirm() {
        if (navigate) {
            navigate()
        } else {
            onClose()
        }
    }

    return (
        <>
            <div className={styles.alert}>
                <p>{message}</p>
                <Button onClick={confirm}>Ok</Button>
            </div>
            <div className={styles.overlay} onClick={onClose}/>
        </>
    )
}
import styles from './PromoSkeleton.module.css'

import {Image} from 'libs/Icons'

export default function PromoSkeleton() {
    return (
        <div className={styles.promo} id="shimmer"><Image/></div>
    )
}
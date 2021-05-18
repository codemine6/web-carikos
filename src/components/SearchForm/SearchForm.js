import {useRouter} from 'next/router'
import styles from './SearchForm.module.css'

import {Search} from 'libs/Icons'

export default function SearchForm(props) {
    const router = useRouter()
    const query = router.query.query ?? ''

    function handleChange(e) {
        router.replace({search: `query=${e.target.value}`})
    }

    function handleSearch() {
        query && props.onSearch(query)
    }

    return (
        <div className={styles.form}>
            <input placeholder="Cari kos, kota, lokasi terdekat" autoFocus={props.autofocus} value={query}
                onChange={handleChange}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <i onClick={handleSearch}><Search/></i>
        </div>
    )
}
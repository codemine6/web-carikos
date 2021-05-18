import {useState} from 'react'
import styles from './Input.module.css'

import {Eye, EyeOff} from 'libs/Icons'

export default function Input({type, placeholder, validation, onChange, error, ...params}) {
    const [value, setValue] = useState('')
    const [inputType, setInputType] = useState(type)
    const [active, setActive] = useState(false)
    const [invalid, setInvalid] = useState(false)

    function handleChange(e) {
        if (validation) {
            validation.test(e.target.value) ? setInvalid(false) : setInvalid(true)
        }
        setValue(e.target.value)
        onChange && onChange(e.target.value)
    }

    return (
        <div className={styles.input} id={active || value ? styles.active : undefined}>
            <label>{placeholder}</label>
            <input
                {...params}
                className={invalid || error ? styles.invalid : undefined}
                type={inputType}
                spellCheck={false}
                value={value}
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
                onChange={handleChange}
            />
            {type === 'password' &&
                <>{inputType === 'password' ?
                    <i onClick={() => setInputType('text')}><EyeOff/></i> :
                    <i onClick={() => setInputType('password')}><Eye/></i>
                }</>
            }
        </div>
    )
}
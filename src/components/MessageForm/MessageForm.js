import {useState, useRef} from 'react'
import styles from './MessageForm.module.css'

import {Send} from 'libs/Icons'

export default function MessageForm({newMessage, loading}) {
    const [text, setText] = useState('')
    const inputRef = useRef()

    function changeText(e) {
        e.target.style.height = 'auto'
        e.target.style.height = e.target.scrollHeight + 'px'
        setText(e.target.value)
    }

    async function sendMessage() {
        if (loading) return
        const data = {
            images: [],
            room: null,
            text
        }
        text && newMessage(data)
        setText('')
        inputRef.current.style.height = 'auto'
    }

    return (
        <div className={styles.form}>
            <textarea placeholder="Tulis pesan..." spellCheck={false} rows={1} ref={inputRef} value={text} onChange={changeText}/>
            <i onClick={sendMessage}><Send/></i>
        </div>
    )
}
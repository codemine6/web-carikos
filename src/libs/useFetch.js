import {useState, useEffect} from 'react'
import axios from 'axios'
import API from './Api'

export default function useFetch(url) {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const source = axios.CancelToken.source()
        async function fetchData() {
            try {
                const res = await API.get(url, {cancelToken: source.token})
                if (res) {
                    setData(res.data.data)
                    setIsLoading(false)
                }
            } catch (err) {
                if (!axios.isCancel(err)) {
                    setError(err.response?.data.message)
                    console.log(err.response?.data.message)
                }
            }
        }
        fetchData()

        return () => source.cancel()
    }, [url])

    return {data, isLoading, error}
}
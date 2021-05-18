export default {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    emailPattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    passwordPattern: /[a-z\d]{6,20}$/i,
    phonePattern: /^(\+?62|0)8\d{7,11}$/,
    usernamePattern: /^[a-z]{2,10} ?[a-z]{2,10}$/i
}
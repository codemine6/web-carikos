import nookies from 'nookies'

function getAuth(context) {
    const {access} = nookies.get(context)
    if (!access) return null
    const token = access.split('.')[1]
    return JSON.parse(Buffer.from(token, 'base64').toString())
}

export function withAuth(gssp) {
    return async (context) => {
        const auth = getAuth(context)
        if (!auth) {
            return {
                redirect: {
                    destination: '/login',
                    permanent:false
                }
            }
        }
        return await gssp(context)
    }
}

export function withNoAuth(gssp) {
    return async (context) => {
        const auth = getAuth(context)
        if (auth?.exp > Math.floor(Date.now() / 1000)) {
            return {
                redirect: {
                    destination: '/',
                    permanent:false
                }
            }
        }
        return await gssp(context)
    }
}

export function withCustomerAuth(gssp) {
    return async (context) => {
        const auth = getAuth(context)
        if (!auth) {
            return {
                redirect: {
                    destination: '/login',
                    permanent:false
                }
            }
        } else if (auth.type !== 'customer') {
            return {
                redirect: {
                    destination: '/404',
                    permanent:false
                }
            }
        }
        return await gssp(context)
    }
}

export function withOwnerAuth(gssp) {
    return async (context) => {
        const auth = getAuth(context)
        if (!auth) {
            return {
                redirect: {
                    destination: '/login',
                    permanent:false
                }
            }
        } else if (auth.type !== 'owner') {
            return {
                redirect: {
                    destination: '/404',
                    permanent:false
                }
            }
        }
        return await gssp(context)
    }
}
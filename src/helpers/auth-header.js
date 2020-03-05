import { getToken } from "../helpers/local-storage"

export function authHeader() {
    // return authorization header with jwt token
    let token = getToken()

    if (token) {
        // return { 'Authorization': 'Bearer ' + token }
        return 'Bearer ' + token
    } else {
        // return {}
        return ''
    }
}
import { getToken } from "../helpers/local-storage"

export function authHeader() {
    let token = getToken()

    if (token) {
        return 'Bearer ' + token
    } else {
        return ''
    }
}
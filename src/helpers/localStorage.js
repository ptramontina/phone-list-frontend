export function storeToken (token) {
    localStorage.setItem('token', token)
}

export function getToken() {
    return localStorage.getItem('token')
}

export function removeToken () {
    localStorage.clear('token')
}

import { API_HOST } from '../util/constants'

export function verEmpleos() {
    const url = `${API_HOST}VerEmpleos`
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',

        },

    })
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            console.log('Error:', error.message)
            throw error
        })
}


export function actualizarEmpleos(idempleo, nombre, estado, pefil) {
    const url = `${API_HOST}ActualizarEmpleo`
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            idempleo: idempleo,
            nombre: nombre,
            estado: estado,
            pefil: pefil
        }),
    })
        .then((response) => {
            return response.json()
        })
        .catch((error) => {
            console.log('Error:', error.message)
            throw error
        })
}

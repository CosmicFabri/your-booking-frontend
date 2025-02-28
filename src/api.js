import { useAuthStore } from "./stores/auth"

// This is used to abstract fetch in one single place

const API_BASE_URL = import.meta.env.VITE_API_BASE

async function fetchData(url, method = 'GET', body = {}) {
    const auth = useAuthStore()

    try {
        const fetchOptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',  
            }
        }

        if (auth.isAuthenticated) {
            fetchOptions.headers['Authorization'] = `Bearer ${auth.token}`
        }

        if (method !== 'GET') {
            fetchOptions.body = JSON.stringify({
                ...body
            })
        }

        const response = await fetch(`${API_BASE_URL}/${url}`, fetchOptions)

        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json()
        return data

    } catch (error) {
        throw error
    }
}

export { fetchData }
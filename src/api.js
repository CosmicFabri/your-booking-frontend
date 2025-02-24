// This is used to abstract fetch in one single place

const API_BASE_URL = import.meta.env.VITE_API_BASE

async function fetchData(url, method = 'GET', options) {
    try {
        const response = fetch(`${API_BASE_URL}/${url}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers    
            },
            body: {
                ...options.body
            }
        })

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
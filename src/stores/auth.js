import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { fetchData } from "@/api"

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'))
    const user = ref({})

    const isAuthenticated = computed(() => !!token.value)
    const isAdmin = computed(() => user.value?.role === 'admin' || false) // If user is null, returns false
    
    const login = async (email, password) => {
        try {
            const options = {body: {email, password}}
            const data = await fetchData('login', 'POST', options)

            token.value = data.token
            user.value = data.user

            localStorage.setItem('token', data.token)
        } catch(error) {
            throw error
        }
    }

    const logout = async () => {
        try {
            const data = await fetchData('logout', 'POST')

            token.value = null
            user.value = null

            localStorage.removeItem('token')
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    // Retrieve user info from backend
    const attempt = async () => {
        try {
            const data = await fetchData('user', 'GET')

            user.value = data.user
        } catch (error) {
            user.value = {}
        }
    }

    return {
        token,
        user,
        isAuthenticated,
        isAdmin,
        attempt,
        login,
        logout
    }
})
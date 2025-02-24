import { defineStore } from "pinia"
import { ref } from "vue"
import { fetchData } from "@/api"

export const useAuthStore = defineStore('auth', () => {
    // token and user are necesary to preserve data across browser sessions
    const token = ref(localStorage.getItem('token'))
    const user = ref(localStorage.getItem('user'))

    const isAuthenticated = computed(() => !!token.value)
    const isAdmin = computed(() => user.value?.role === 'admin' || false) // If user is null, returns false
    
    const login = async (email, password) => {
        try {
            const options = {body: {email, password}}
            const data = await fetchData('login', 'POST', options)

            token.value = data.token
            user.value = data.user

            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
        } catch(error) {
            console.log(error)
        }
    }

    const logout = async () => {
        try {
            const options = {headers: {'Authentication': `Bearer: ${token}`}}
            const data = await fetchData('logout', 'POST', options)

            token.value = null
            user.value = null

            localStorage.removeItem('token')
            localStorage.removeItem('user')
        } catch (error) {
            console.log(error)
        }
    }

    return {
        token,
        user,
        isAuthenticated,
        isAdmin,
        login,
        logout
    }
})
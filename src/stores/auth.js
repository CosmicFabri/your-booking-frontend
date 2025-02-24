import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthStore = defineStore('auth', () => {
    // token and user are necesary to preserve adta across browser sessions
    const token = ref(localStorage.getItem('token'))
    const user = ref(localStorage.getItem('user'))

    const isAuthenticated = computed(() => !!token.value)
    const isAdmin = computed(() => user.value?.role === 'admin' || false) // If user is null, returns false
    
    const login = async (email, password) => {

    }

    const logout = async () => {

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
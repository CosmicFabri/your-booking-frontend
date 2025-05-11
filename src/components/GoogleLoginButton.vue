<script setup>
import { googleTokenLogin } from 'vue3-google-login';
import { fetchData } from '@/utils/api';
import { defineEmits } from 'vue';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

const emit = defineEmits(['success', 'error'])


const login = async () => {
    try {
        const response = await googleTokenLogin({clientId:CLIENT_ID})
        console.log(response)
        const token = response.access_token
        emit('success', token)
    } catch(e) {
        console.error(`error: ${e}`)
    }
    
}

</script>

<template>
    <button @click="login">Iniciar Sesión con Google</button>
</template>
<script setup>
import { RouterLink, useRoute } from 'vue-router';
import Button from '../Button.vue';

const isActiveLink = (routePath) => {
    const route = useRoute() // Current route path we're in
    return route.path === routePath
}
</script>

<template>
    <div class="flex flex-col pl-6 pr-12 py-8 bg-gray-200 justify-between w-48 h-[calc(100vh-7rem)] shadow-xl relative">
        <div class="absolute text-xl font-semibold text-sky-600">
            Administrador
        </div>
        <div class="flex flex-col gap-y-4 mt-12">
            <RouterLink :class="[isActiveLink('/admin/bookings') ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-300',
                'hover:rounded-xl px-4 py-2 rounded-xl']" to="/admin/bookings">Reservas</RouterLink>
            <RouterLink :class="[isActiveLink('/admin/spaces') ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-300',
                'hover:rounded-xl px-4 py-2 rounded-xl']" to="/admin/spaces">Espacios</RouterLink>
            <RouterLink :class="[isActiveLink('/admin/history') ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-300',
                'hover:rounded-xl px-4 py-2 rounded-xl']" to="/admin/history">Historial</RouterLink>
        </div>
        <div class="p-4">
            <Button
                :text="'Salir'"
                :to="'/'"
                :font-size="'2xl'"
                :color="'red'"
            ></Button>
        </div>
    </div>
</template>
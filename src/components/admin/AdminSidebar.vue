<script setup>
import { RouterLink, useRoute } from 'vue-router';

const isActiveLink = (routePath) => {
    const route = useRoute() // Current route path we're in
    return route.path === routePath
}
</script>

<template>
    <div class="flex flex-col pl-6 pr-12 py-8 bg-gray-200 justify-between w-48 h-[calc(100vh-7rem)] shadow-xl">
        <div class="flex flex-col gap-y-4">
            <RouterLink :class="[isActiveLink('/admin/bookings') ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-300',
                'hover:rounded-xl px-4 py-2 rounded-xl']" to="/admin/bookings">Bookings</RouterLink>
            <RouterLink :class="[isActiveLink('/admin/spaces') ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-300',
                'hover:rounded-xl px-4 py-2 rounded-xl']" to="/admin/spaces">Spaces</RouterLink>
            <RouterLink :class="[isActiveLink('/admin/history') ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-300',
                'hover:rounded-xl px-4 py-2 rounded-xl']" to="/admin/history">History</RouterLink>
        </div>
        <div>
            <RouterLink class="hover:underline p-4" to="/">Log out</RouterLink>
        </div>
    </div>
</template>
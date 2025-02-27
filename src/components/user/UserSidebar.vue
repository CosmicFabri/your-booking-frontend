<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="flex flex-col pl-4 pr-16 py-4 bg-gray-300 justify-between h-[calc(100vh-7rem)]">
        <div class="flex flex-col gap-y-4">
            <RouterLink to="/admin/bookings">Bookings</RouterLink>
            <RouterLink to="/admin/spaces">Book</RouterLink>
        </div>
        <div>
            <RouterLink to="/">Log out</RouterLink>
        </div>
    </div>
</template>
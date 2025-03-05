<script setup>
import { ref, onMounted, computed } from 'vue';
import { Paginator } from 'primevue';
import { useAuthStore } from '@/stores/auth';
import UserSidebar from '@/components/user/UserSidebar.vue';
import BookRow from '@/components/user/BookRow.vue';

const auth = useAuthStore()
const username = ref(auth.user.name)

// Total bookings to show on pagination
const bookings = ref([])

// Total number of records loaded
const records = ref(0)

// Start index for the pagination
const first = ref(0)

// Show 3 records per page
const rows = ref(3)

const paginatedBookings = computed(() => {
    return bookings.value.slice(first.value, first.value + rows.value);
})

onMounted(async () => {
    try {
        const response = await fetch('http://localhost:5000/joseBookings')
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        const jsonStr = JSON.stringify(json)

        bookings.value = JSON.parse(jsonStr)
        records.value = bookings.value.length
    } catch (error) {
        console.error('Error fetching bookings', error)
    }
})
</script>

<template>
    <div class="flex flex-row">
        <!-- Sidebar -->
        <UserSidebar :username="username"></UserSidebar>

        <!-- Main view -->
        <div class="flex flex-col flex-1 px-16 pt-12 gap-y-8">

            <!-- Title -->
            <div class="text-3xl font-semibold">Archivo</div>

            <div class="flex flex-col">

                <!-- Table header -->
                <div class="flex flex-row justify-center mx-auto bg-sky-300 text-gray-800 font-semibold border border-sky-600">
                    <div class="px-4 py-3 w-44 border-r border-sky-600 text-center">No. Reservación</div>
                    <div class="px-4 py-3 w-36 border-r border-sky-600 text-center">Espacio</div>
                    <div class="px-4 py-3 w-72 border-r border-sky-600 text-center">Usuario</div>
                    <div class="px-4 py-3 w-40 border-r border-sky-600 text-center">Fecha</div>
                    <div class="px-4 py-3 w-40 text-center">Horario</div>
                </div>

                <!-- Table contents -->
                <BookRow
                    v-for="(booking, index) in paginatedBookings"
                    :key="booking.id"
                    :book-id="parseInt(booking.id)"
                    :book-space="booking.space"
                    :book-user="booking.user"
                    :book-date="booking.date"
                    :book-schedule="`${booking.schedule.start} - ${booking.schedule.end}`"
                    :index="index"
                    class="mx-auto"
                />
            </div>

            <!-- Paginator component -->
            <Paginator
                v-model:first="first"
                :rows="3" 
                :total-records="records">
            </Paginator>
        </div>
    </div>
</template>
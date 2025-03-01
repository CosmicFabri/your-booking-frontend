<script setup>
import { ref, onMounted } from 'vue';
import UserSidebar from '@/components/user/UserSidebar.vue';
import BookRow from '@/components/user/BookRow.vue';

// Total bookings to show
const bookings = ref([])

// Number of total records loaded
const records = ref(0)

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
        <UserSidebar></UserSidebar>

        <!-- Main view -->
        <div class="flex flex-col flex-1 px-16 pt-12 gap-y-8">
            <!-- Title -->
            <div class="text-3xl font-semibold">Reservaciones</div>

            <div class="flex flex-col">
                <!-- Table header -->
                <div class="flex flex-row justify-center mx-auto bg-sky-300 text-gray-800 font-semibold border border-sky-600">
                    <div class="px-4 py-3 w-44 border-r border-sky-600 text-center">No. Reservación</div>
                    <div class="px-4 py-3 w-36 border-r border-sky-600 text-center">Espacio</div>
                    <div class="px-4 py-3 w-72 border-r border-sky-600 text-center">Usuario</div>
                    <div class="px-4 py-3 w-40 border-r border-sky-600 text-center">Fecha</div>
                    <div class="px-4 py-3 w-40 text-center">Horario</div>
                </div>

                <!-- Table content -->
                <BookRow
                    v-for="(booking, index) in bookings"
                    :key="booking.id"
                    :book-number="booking.number"
                    :book-space="booking.space"
                    :book-user="booking.user"
                    :book-date="booking.date"
                    :book-schedule="booking.schedule"
                    :cell-width="32"
                    :index="index"
                    class="mx-auto"
                />
            </div>
        </div>
    </div>
</template>
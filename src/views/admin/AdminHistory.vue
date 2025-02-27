<script setup>
import { ref, computed, onMounted } from 'vue';

import { Paginator } from 'primevue';
import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import HistoryRow from '@/components/admin/HistoryRow.vue';

// Total records to show on pagination
const bookings = ref([])

// Total number of records available
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
        const response = await fetch('http://localhost:5000/bookings')
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
        <AdminSidebar></AdminSidebar>

        <!-- Main view -->
        <div class="flex flex-col flex-1 px-16 pt-12 gap-y-8">

            <!-- Title -->
            <div class="text-3xl font-semibold">Historial de Reservaciones</div>

            <div class="flex flex-col">

                <!-- Table header -->
                <div class="flex flex-row justify-center mx-auto bg-sky-300 text-gray-800 font-semibold border border-sky-600">
                    <div class="px-4 py-3 w-44 border-r border-sky-600 text-center">No. Reservación</div>
                    <div class="px-4 py-3 w-48 border-r border-sky-600 text-center">Espacio</div>
                    <div class="px-4 py-3 w-72 border-r border-sky-600 text-center">Usuario</div>
                    <div class="px-4 py-3 w-48 text-center">Horario</div>
                </div>


                <!-- Table contents -->
                <HistoryRow
                    v-for="(booking, index) in paginatedBookings"
                    :key="booking.id"
                    :book-number="booking.number"
                    :book-space="booking.space"
                    :book-user="booking.user"
                    :book-schedule="booking.schedule"
                    :cell-width="32"
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
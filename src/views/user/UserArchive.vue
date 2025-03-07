<script setup>
import { ref, watch, onMounted } from 'vue';
import { Paginator } from 'primevue';
import { fetchData } from '@/utils/api';
import UserSidebar from '@/components/user/UserSidebar.vue';
import BookRow from '@/components/user/BookRow.vue';

const bookings = ref([])
const currentPage = ref(0)
const totalPages = ref(1)

async function fetchBookings(page) {
    try {
        const response = await fetchData(`bookings/user?page=${page}`, 'GET')
        bookings.value = response.data
    } catch (error) {

    }
}

watch(currentPage, async (newPage) => {
    await fetchBookings(newPage + 1)
})

onMounted(async () => {
    try {
        const response = await fetchData('bookings/user?page=1', 'GET')
        
        totalPages.value = response.last_page
        bookings.value = response.data
        console.log(currentPage.value)
        console.log(totalPages.value)
    } catch (error) {

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
            <div class="text-3xl font-semibold">Archivo</div>

            <div class="flex flex-col">

                <!-- Table header -->
                <div class="flex flex-row justify-center mx-auto bg-sky-300 text-gray-800 font-semibold border border-sky-600">
                    <div class="px-4 py-3 w-40 border-r border-sky-600 text-center">No. Reservación</div>
                    <div class="px-4 py-3 w-56 border-r border-sky-600 text-center">Espacio</div>
                    <div class="px-4 py-3 w-52 border-r border-sky-600 text-center">Fecha</div>
                    <div class="px-4 py-3 w-52 text-center">Horario</div>
                </div>

                <!-- Table contents -->
                <BookRow
                    v-for="(booking, index) in bookings"
                    :key="booking.id"
                    :book-id="parseInt(booking.id)"
                    :book-space="booking.space_name"
                    :book-date="booking.day"
                    :book-schedule="`${booking.start_hour} - ${booking.end_hour}`"
                    :index="index"
                    class="mx-auto"
                />
            </div>

            <!-- Paginator component -->
            <Paginator
                v-model:first="currentPage"
                :rows="1" 
                :total-records="totalPages">
            </Paginator>
        </div>
    </div>
</template>
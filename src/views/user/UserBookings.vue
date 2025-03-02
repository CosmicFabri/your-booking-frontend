<script setup>
import { ref, onMounted } from 'vue';
import UserSidebar from '@/components/user/UserSidebar.vue';
import BookRow from '@/components/user/BookRow.vue';
import Button from '@/components/Button.vue';

// Total bookings to show
const bookings = ref([])

// Number of total records loaded
const records = ref(0)

// ID of the selected booking to edit
const selectedBookId = ref(null)

// For opening/closing our 'edit booking' modal
const openEditBooking = ref(false)

const toggleEditModal = (id) => {
    selectedBookId.value = id
    openEditBooking.value = true
}

const closeEditModal = () => {
    selectedBookId.value = null
    openEditBooking.value = false
}



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

            <div class="flex flex-col mx-auto relative">
                <!-- Table header -->
                <div class="flex flex-row justify-center mx-auto bg-sky-300 text-gray-800 font-semibold border border-sky-600">
                    <div class="px-4 py-3 w-44 border-r border-sky-600 text-center">No. Reservación</div>
                    <div class="px-4 py-3 w-36 border-r border-sky-600 text-center">Espacio</div>
                    <div class="px-4 py-3 w-72 border-r border-sky-600 text-center">Usuario</div>
                    <div class="px-4 py-3 w-40 border-r border-sky-600 text-center">Fecha</div>
                    <div class="px-4 py-3 w-40 text-center">Horario</div>
                </div>

                <!-- Table contents -->
                <div
                    v-for="(booking, index) in bookings"
                    :key="booking.id"
                    class="flex flex-row gap-x-8 relative"
                >
                    <BookRow
                        :book-id="booking.id"
                        :book-space="booking.space"
                        :book-user="booking.user"
                        :book-date="booking.date"
                        :book-schedule="`${booking.schedule.start} - ${booking.schedule.end}`"
                        :index="index"
                        class="mx-auto"
                    />
                    <button
                        @click="toggleEditModal(booking.id)"
                        class="bg-sky-600 hover:bg-sky-700 text-white font-medium py-1 px-2
                        rounded-lg shadow-md transition-all duration-200 flex items-center gap-2 
                        absolute -right-12"
                    >
                        <i class="pi pi-pen-to-square text-white text-lg"></i>
                    </button>
                </div>

                <!-- Book button outside the loop -->
                <div v-if="bookings.length > 0" class="mt-4 flex justify-end">
                    <Button :to="'/user/book'" text="Reservar"></Button>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit booking modal -->
    <div v-if="openEditBooking" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" @click="closeEditModal">
        <div class="bg-white rounded-lg shadow-lg px-8 py-6 w-96 relative" @click.stop>
            <!-- Close button -->
            <button @click="closeEditModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                ✖
            </button>

            <!-- Title -->
            <div class="text-2xl font-semibold text-center mb-4">Editar reservación</div>


        </div>
    </div>
</template>
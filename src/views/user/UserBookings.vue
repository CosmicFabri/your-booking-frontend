<script setup>
import { ref, onMounted, watch } from 'vue';
import UserSidebar from '@/components/user/UserSidebar.vue';
import BookRow from '@/components/user/BookRow.vue';
import Button from '@/components/Button.vue';

// Total bookings to show
const bookings = ref([])

// Spaces retrieved
const spaces = ref([])

// Number of total records loaded
const records = ref(0)

// ID of the selected booking to edit
const selectedBookId = ref(null)

// For opening/closing the 'edit booking' modal
const openEditBooking = ref(false)

// Values we're updating in the form
const form = ref({
    space: '',
    user: '',
    date: '',
    schedule: {
        start: '',
        end: ''
    }
})

// Available times for the schedule
const availableStartTimes = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']
const availableEndTimes = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

const toggleEditModal = (id) => {
    selectedBookId.value = id

    const selectedBooking = bookings.value.find(booking => booking.id === id)
    if (selectedBooking) {
        form.value = {
            space: selectedBooking.space,
            user: selectedBooking.user, // Preserve the user name
            date: selectedBooking.date,
            schedule: { 
                start: selectedBooking.schedule.start, 
                end: selectedBooking.schedule.end 
            }
        }
    }

    retrieveSpaces()
    openEditBooking.value = true
}

const closeEditModal = () => {
    selectedBookId.value = null
    openEditBooking.value = false
}

const retrieveSpaces = async () => {
    try {
        const response = await fetch('http://localhost:5000/spaces')
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }
        spaces.value = await response.json()
    } catch (error) {
        console.error('Error fetching spaces', error)
    }
}

const fetchBookings = async () => {
    try {
        const response = await fetch('http://localhost:5000/joseBookings')
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        bookings.value = await response.json()
        records.value = bookings.value.length
    } catch (error) {
        console.error('Error fetching bookings', error)
    }
}

const handleSubmit = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/joseBookings/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form.value)
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        await fetchBookings()
        closeEditModal()
    } catch (error) {
        console.error(`Error updating booking with id ${id}`, error)
    }
}

const handleCancellation = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/joseBookings/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        await fetchBookings()
        closeEditModal()
    } catch (error) {
        console.error(`Error cancelling booking with id ${id}`, error)
    }
}

// Update the end time automatically when selecting the start hour
watch(() => form.value.schedule.start, (newStart) => {
    if (newStart) {
        const startIndex = availableStartTimes.indexOf(newStart)
        form.value.schedule.end = availableEndTimes[startIndex]
    }
})

onMounted(fetchBookings)
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

                <div v-for="(booking, index) in bookings" :key="booking.id" class="flex flex-row gap-x-8 relative">
                    <BookRow
                        :book-id="parseInt(booking.id)"
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

                <div v-if="bookings.length > 0" class="mt-4 flex justify-end">
                    <Button :to="'/user/book'" text="Reservar"></Button>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit booking modal -->
    <div v-if="openEditBooking" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" @click="closeEditModal">
        <div class="bg-white rounded-lg shadow-lg px-8 py-6 w-96 relative" @click.stop>
            <button @click="closeEditModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">✖</button>
            <div class="text-2xl font-semibold text-center mb-4">Editar reservación</div>

            <form @submit.prevent="handleSubmit(selectedBookId)" class="flex flex-col gap-y-4 mb-4">
                <div class="flex flex-col">
                    <span class="font-medium">Espacio:</span>
                    <select v-model="form.space" id="space" name="space" class="bg-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none" required>
                        <option v-for="space in spaces" :key="space.id">{{ space.name }}</option>
                    </select>
                </div>

                <div class="flex flex-col">
                    <label for="date" class="font-medium">Fecha:</label>
                    <input v-model="form.date" type="date" id="date" name="date" class="bg-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none" required>
                </div>

                <div class="flex flex-col">
                    <span class="font-medium">Horario:</span>
                    <div class="flex items-center gap-x-2">
                        <label for="start">De:</label>
                        <select v-model="form.schedule.start" id="start" name="start" class="bg-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none" required>
                            <option v-for="time in availableStartTimes" :key="time">{{ time }}</option>
                        </select>
                        <label for="end">A:</label>
                        <input v-model="form.schedule.end" type="text" id="end" name="end" class="bg-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 w-24 focus:outline-none" disabled>
                    </div>
                </div>

                <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200">
                    Aplicar cambios
                </button>
            </form>

            <button @click="handleCancellation(selectedBookId)" class="flex justify-around w-fill bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200">
                Cancelar reservación
            </button>
        </div>
    </div>
</template>

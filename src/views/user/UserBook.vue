<script setup>
import { ref, onMounted, watch } from 'vue';
import UserSidebar from '@/components/user/UserSidebar.vue';
import FullCalendar from '@/components/FullCalendar.vue';

// Spaces for our select element
const spaces = ref([])

// For showing/hiding the calendar and form modal
const showCalendarForm = ref(false)

// For showing/hiding the 'success' modal
// when submitting a new booking
const showSuccessModal = ref(false)

// For retrieving the ID of the last booking
const totalBookings = ref(null)

// ID of the last booking
const lastBookingId = ref(null)

// Structure of the new booking
const form = ref({
    id: totalBookings.value,
    space: '',
    user: 'José Aguilar Canepa',
    date: '',
    schedule: {
        start: '',
        end: ''
    }
})

// Available times for the schedule
const availableStartTimes = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']
const availableEndTimes = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

// Update the end time automatically when selecting the start hour
// Update the end time automatically when selecting the start hour
watch(() => form.value.schedule.start, (newStart) => {
    if (newStart) {
        const startIndex = availableStartTimes.indexOf(newStart)
        form.value.schedule.end = availableEndTimes[startIndex]
    }
})

// For fetching spaces, bookings and the last booking ID
const fetchEverything = async () => {
    fetchSpaces()
    fetchBookings()
    fetchLastId()
}

const fetchSpaces = async () => {
    try {
        const response = await fetch('http://localhost:5000/spaces');
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
            throw new Error(`Error: ${response.status}`)
        }

        const json = await response.json()
        totalBookings.value = json.length
    } catch (error) {
        console.error('Error fetching bookings', error)
    }
}

const fetchLastId = async () => {
    try {
        const response = await fetch('http://localhost:5000/joseBookings')
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }

        const json = await response.json()
        
        if (json.length > 0) {
            lastBookingId.value = parseInt(json[json.length - 1].id) // Get the last element's ID
        } else {
            lastBookingId.value = null
        }
    } catch (error) {
        console.error('Error fetching last booking ID', error)
    }
}

const toggleShowCalendarForm = () => {
    if (form.value.space) {
        showCalendarForm.value = true
    }
}

const closeShowCalendarForm = () => {
    showCalendarForm.value = false
}

const toggleShowSuccessModal = () => {
    showSuccessModal.value = true
}

const closeShowSuccessModal = () => {
    closeShowCalendarForm()
    showSuccessModal.value = false
}

const handleSubmit = async () => {
    const newBooking = {
        id: String(lastBookingId.value ? lastBookingId.value + 1 : 1), // Ensure ID is unique
        space: form.value.space,
        user: form.value.user,
        date: form.value.date,
        schedule: {
            start: form.value.schedule.start,
            end: form.value.schedule.end
        }
    }

    try {
        const response = await fetch('http://localhost:5000/joseBookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBooking)
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }

        totalBookings.value++
        toggleShowSuccessModal()
    } catch (error) {
        console.error(`Error submitting booking with id ${id}`, error)
    }
}

onMounted(fetchEverything)
</script>

<template>
    <div class="flex flex-row">
        <!-- Sidebar -->
        <UserSidebar></UserSidebar>

        <!-- Main view -->
        <div class="flex flex-col flex-1 px-16 pt-12 gap-y-8">
            <!-- Title -->
            <div class="text-3xl font-semibold">Reservar</div>

            <!-- Main form (book a space) -->
            <form @submit.prevent="handleSubmit" class="flex flex-col gap-y-12">
                <!-- Choose a space -->
                <div class="flex flex-row gap-x-4">
                    <span class="text-lg font-semibold">Espacio a reservar:</span>
                    <select v-model="form.space" @change="toggleShowCalendarForm"
                        class="bg-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none" required>
                        
                        <option value="" disabled selected hidden>Seleccionar</option>
                        <option v-for="space in spaces" :key="space.id" :value="space.name">
                            {{ space.name }}
                        </option>
                    </select>
                </div>
                
                <!-- Calendar and the rest of components -->
                <div v-if="showCalendarForm" class="flex flex-row flex-1 justify-center gap-x-12">
                    <!-- Calendar -->
                    <div class="w-96">
                        <FullCalendar></FullCalendar>
                    </div>

                    <!-- Date, time and submit -->
                    <div class="flex flex-col justify-between content-between">
                        <!-- Descriptive calendar text -->
                        <span class="text-md text-red-600 font-semibold">< Horas ocupadas para el espacio</span>

                        <div class="flex flex-col gap-y-6">
                            <!-- Descriptive form text -->
                            <span class="text-lg text-sky-600 font-semibold">Campos necesarios</span>

                            <!-- Date -->
                            <div class="flex flex-row justify-between items-center gap-x-4">
                                <label for="date" class="text-md font-semibold">Fecha:</label>
                                <input v-model="form.date" type="date" id="date" name="date" class="bg-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none" required>
                            </div>
    
                            <!-- Time -->
                            <div class="flex flex-col gap-y-2">
                                <span class="font-medium font-semibold">Horario:</span>
                                <div class="flex items-center gap-x-2">
                                    <label for="start">De:</label>
                                    <select v-model="form.schedule.start" id="start" name="start" class="bg-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none" required>
                                        <option v-for="time in availableStartTimes" :key="time">{{ time }}</option>
                                    </select>
                                    <label for="end">A:</label>
                                    <input v-model="form.schedule.end" type="text" id="end" name="end" class="bg-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 w-24 focus:outline-none" disabled>
                                </div>
                            </div>
    
                            <!-- Submit button -->
                            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200">
                                Reservar espacio
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <!-- Success submitting booking modal -->
    <div v-if="showSuccessModal" class="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50" @click="closeShowSuccessModal">
        <div class="flex flex-col gap-y-6 justify-stretch bg-white rounded-lg shadow-lg px-8 py-6 w-96 relative" @click.stop>
            <div class="flex flex-row items-center justify-center gap-x-4">
                <span class="pi pi-info-circle text-sky-600 font-semibold"></span>
                <span class="text-sky-600 text-lg font-semibold">Reserva exitosa</span>
            </div>
            <div class="text-md text-justify">
                Su reservación en el espacio {{ form.space }} a las
                {{ form.schedule.start }} horas con fecha {{ form.date }}
                ha sido agregada exitosamente.
            </div>
            <button @click="closeShowSuccessModal" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200">
                Aceptar
            </button>
        </div>
    </div>
</template>

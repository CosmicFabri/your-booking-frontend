<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { fetchData } from '@/utils/api';
import UserSidebar from '@/components/user/UserSidebar.vue';
import DayCalendar from '@/components/DayCalendar.vue';

const auth = useAuthStore()
const username = ref(auth.user.name)

// Spaces for our select element
const spaces = ref([])

// Returns an object with space.id as keys and an array of disponibility as values
const spacesDisponibility = computed(() => {
    return spaces.value.reduce((acc, space) => {
        acc[space.id] = [space.disponibility.start, space.disponibility.end]
        return acc
    },{})
})

// Structure of the booking post request
const form = ref({
    id_space: '',
    day: '',
    schedule: {
        start: '',
        end: ''
    }
})

const selectedSpace = ref(0) // Holds the id of the space
const selectedDay = ref('')
const selectedSchedule = ref([])
const unavailableHours = ref([])

const showDayPicker = computed(() => selectedSpace.value !== 0) // True if a space has been selected
const showTimeCalendar = ref(false)
const showSubmitButton = ref(false)

const onSpaceChanged = () => {
    showTimeCalendar.value = false
    showSubmitButton.value = false
    selectedDay.value = ''
    selectedSchedule.value = []
}

const onDayChanged = () => {
    showSubmitButton.value = false
    showTimeCalendar.value = false
    // Fetch availability for spaces

    // Show DayCalendar component
    showTimeCalendar.value = true
}

const getUnavailableHours = async () => {

}

const getHourSelection = (start, end) => {
    selectedSchedule.value = [start, end]
    alert(selectedSchedule.value)

    showSubmitButton.value = true
}

const handleUnselection = () => {
    showSubmitButton.value = false
    selectedSchedule.value = []
}

const showSuccessModal = ref(false)


const fetchSpaces = async () => {
    try {
        spaces.value = await fetchData('spaces', 'GET')
        console.log(spacesDisponibility.value)
    } catch (error) {
        console.error('Error fetching spaces', error)
    }
}

const closeShowSuccessModal = () => {
    showSubmitButton.value = false
    showTimeCalendar.value = false
    selectedSpace.value = 0
    showSuccessModal.value = false
}

const handleSubmit = async () => {
    const newBooking = {
        space: form.value.space,
        user: form.value.user,
        date: form.value.date,
        schedule: {
            // NOTICE: This will be the logic for retrieving the
            // time picked in the FullCalendar
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

        toggleShowSuccessModal()
    } catch (error) {
        console.error(`Error submitting booking with id ${newBooking.id}`, error)
    }
}

onMounted( async () => {
    await fetchSpaces()
})
</script>

<template>
    <div class="flex flex-row">
        <!-- Sidebar -->
        <UserSidebar :username="username"></UserSidebar>

        <!-- Main view -->
        <div class="flex flex-col pl-16 pt-12 gap-y-8 flex-1">
            <!-- Title -->
            <div class="text-3xl font-semibold">Reservar</div>

            <div class="flex justify-center w-full">
                <form @submit.prevent="handleSubmit" class="flex flex-row justify-center gap-x-20">
                    <!-- Choose a space -->
                    <div class="flex flex-col justify-around">
                        <div class="flex flex-col gap-y-8">
                            <div class="flex flex-col gap-y-4">
                                <span class="text-lg font-semibold">Espacio a reservar:</span>
                                <select v-model="selectedSpace" @change="onSpaceChanged"
                                    class="bg-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                                    required>
                                    <option value="" disabled selected hidden>Seleccionar</option>
                                    <option v-for="space in spaces" :key="space.id" :value="space.id">
                                        {{ space.name }}
                                    </option>
                                </select>
                            </div>
    
                            <!-- Date -->
                            <div v-if="showDayPicker" class="flex flex-row justify-between items-center gap-x-4">
                                <label for="date" class="text-md font-semibold">Fecha:</label>
                                <input v-model="selectedDay" @change="onDayChanged" type="date" id="date" name="date"
                                    class="bg-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                                    required>
                            </div>
                        </div>

                        <!-- Submit button -->
                        <button v-if="showSubmitButton" type="submit"
                            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200">
                            Reservar espacio
                        </button>
                    </div>

                    <!-- Calendar (hours) and the rest of components -->
                    <div v-if="showTimeCalendar" class="flex flex-col">
                        <div class="flex flex-col gap-y-4 max-w-fit">
                            <!-- Descriptive text -->
                            <span class="text-xl text-sky-600 font-semibold">
                                Elija una hora de inicio:
                            </span>

                            <!-- Calendar (hours) -->
                            <div class="w-[30vw] mx-auto">
                                <!-- :key attribute forces this component to re-renderize when the value changes -->
                                <DayCalendar 
                                    @select="getHourSelection"
                                    @unselect="handleUnselection"
                                    :key="selectedDay"
                                    :initial-date="selectedDay"
                                    :space-disponibility="spacesDisponibility[form.id_space]"></DayCalendar>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Success submitting booking modal -->
    <div v-if="showSuccessModal" class="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50"
        @click="closeShowSuccessModal">
        <div class="flex flex-col gap-y-6 justify-stretch bg-white rounded-lg shadow-lg px-8 py-6 w-96 relative"
            @click.stop>
            <div class="flex flex-row items-center justify-center gap-x-4">
                <span class="pi pi-info-circle text-sky-600 font-semibold"></span>
                <span class="text-sky-600 text-lg font-semibold">Reserva exitosa</span>
            </div>
            <div class="text-md text-justify">
                Su reservación en el espacio {{ form.space }} a las
                {{ form.schedule.start }} horas con fecha {{ form.date }}
                ha sido agregada exitosamente.
            </div>
            <button @click="closeShowSuccessModal"
                class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200">
                Aceptar
            </button>
        </div>
    </div>
</template>

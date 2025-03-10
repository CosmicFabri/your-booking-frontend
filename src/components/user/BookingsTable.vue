<script setup>
import { ref, onMounted, computed } from 'vue';
import { fetchData } from '@/utils/api';
import { DatePicker } from 'primevue';
import BookRow from '@/components/user/BookRow.vue';
import Button from '@/components/Button.vue';
import DayCalendar from '@/components/DayCalendar.vue';

// Total bookings to show
const bookings = ref([])

// Spaces retrieved
const spaces = ref([])

const selectedBookId = ref('')
const selectedSpace = ref(0) // Holds the id of the space

/*>>>>>>>>>> start Edit modal variables */
// For opening/closing the 'edit booking' modal
const openEditBooking = ref(false)

const showDayPicker = computed(() => selectedSpace.value !== 0) // True if a space has been selected
const showTimeCalendar = ref(true)
const showSubmitButton = ref(false)
const showSuccessModal = ref(false)
const disabledDates = [0, 6]

// Values for DayCalendar
const selectedDay = ref('')
const spaceDisponibility = ref([])
const unavailableHours = ref([])
const selectedSchedule = ref([])

// Format the Date object obtained to String date
const selectedDayFormatted = computed(() => {
    let string = ''   
    if(! (selectedDay.value instanceof Date)) {
        string = selectedDay.value
    } else{
        const year = selectedDay.value.getFullYear();
        const month = (selectedDay.value.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
        const day = selectedDay.value.getDate().toString().padStart(2, '0'); // getDate() for the actual day
        string = `${year}-${month}-${day}`
    }
    return string
})

const getHourSelection = (start, end) => {
    selectedSchedule.value = [start, end]
    showSubmitButton.value = true
}

// Since we store selectedSpace as the index, a computed variable for the name is needed
const spaceName = computed(() => {
    const index = spaces.value.findIndex((space) => space.id === selectedSpace.value)
    return spaces.value[index].name
})

// Returns an object with space.id as keys and an array of disponibility as values
const spacesDisponibility = computed(() => {
    return spaces.value.reduce((acc, space) => {
        acc[space.id] = [space.disponibility.start, space.disponibility.end]
        return acc
    },{})
})

const handleUnselection = () => {
    showSubmitButton.value = false
    selectedSchedule.value = []
}
const toggleEditModal = async (id) => {
    selectedBookId.value = id
    const selectedBooking = bookings.value.find(booking => booking.id === id)
    if (selectedBooking) {
        selectedDay.value = selectedBooking.day
        selectedSpace.value = selectedBooking.space_id

        await fetchSpaceDisponibility()
        await fetchUnavailableHours(selectedDay.value)
    }
    openEditBooking.value = true
    showTimeCalendar.value = true
}

const closeEditModal = () => {
    selectedBookId.value = null
    showTimeCalendar.value = false
    showSubmitButton.value = false
    openEditBooking.value = false
}

const onSpaceChanged = () => {
    showTimeCalendar.value = false
    showSubmitButton.value = false
    selectedDay.value = ''
    selectedSchedule.value = []
    unavailableHours.value = []
}

const onDayChanged = async () => {
    showSubmitButton.value = false
    showTimeCalendar.value = false 
    unavailableHours.value = []
    await fetchUnavailableHours(selectedDayFormatted.value)
    showTimeCalendar.value = true
}

const closeShowSuccessModal = () => {
    fetchBookings()
    showSubmitButton.value = false
    showTimeCalendar.value = false
    selectedSpace.value = 0
    showSuccessModal.value = false
}
/*>>>>>>>>>> end Edit modal variables */

/*>>>>>>>>>> start Cancel modal variables */
const openCancelModal = ref(false)

const toggleCancelModal = (id) => {
    selectedBookId.value = id
    openCancelModal.value = true
}

const closeCancelModal = () => {
    openCancelModal.value = false
    selectedBookId.value = null
}

/*>>>>>>>>>> end cancel modal variables */

const fetchSpaces = async () => {
    try {
        spaces.value = await fetchData('spaces', 'GET')
    } catch (error) {
        console.error('Error fetching spaces', error)
    }
}

const fetchSpaceDisponibility = async () => {
    try {
        const space = await fetchData(`spaces/${bookingSpaceId.value}`)
        spaceDisponibility.value = [space.disponibility.start, space.disponibility.end]
    } catch (error) {

    }
}

const fetchUnavailableHours = async (day) => {
    try {
        const response = await fetchData(`bookings/hours?idSpace=${selectedSpace.value}&day=${day}&idBooking=${selectedBookId.value}`)
        // Converting to the event format that FullCalendar expects
        unavailableHours.value = Array.from(response, (element) => {
            return {
                title: '',
                start: `${day}T${element.start_hour}`,
                end: `${day}T${element.end_hour}`
            }
        })
    } catch (error) {
        console.log(error)
    }
}


const fetchBookings = async () => {
    try {
        const response = await fetchData('bookings/user/pending', 'GET')
        bookings.value = response

        fetchSpaces()
    } catch (error) {
        console.error('Error fetching bookings', error)
    }
}


const handleSubmit = async () => {
    const body = {
        id_space: selectedSpace.value,
        day: selectedDayFormatted.value,
        start_hour: selectedSchedule.value[0],
        end_hour: selectedSchedule.value[1]
    }
    try {
        const response = await fetchData(`bookings/${selectedBookId.value}`, 'PATCH', body)
        showSuccessModal.value = true
        openEditBooking.value = false
    } catch (error) {

    }
}

const handleCancellation = async (id) => {
    try {
        const response = await fetchData(`bookings/${id}`, 'DELETE')

        await fetchBookings()
        closeCancelModal()
    } catch (error) {
        console.error(`Error cancelling booking with id ${id}`, error)
    }
}

onMounted(fetchBookings)
</script>

<template>       
        <div class="flex flex-col mx-auto relative">

            <!-- Table header -->
            <div class="flex flex-row justify-center mx-auto bg-sky-300 text-gray-800 font-semibold border border-sky-600">
                <div class="px-4 py-3 w-40 border-r border-sky-600 text-center">No. Reservación</div>
                <div class="px-4 py-3 w-56 border-r border-sky-600 text-center">Espacio</div>
                <div class="px-4 py-3 w-52 border-r border-sky-600 text-center">Fecha</div>
                <div class="px-4 py-3 w-52 text-center">Horario</div>
            </div>
            <div v-for="(booking, index) in bookings" :key="booking.id" class="flex flex-row gap-x-8 relative">
                <BookRow
                    :book-id="parseInt(booking.id)"
                    :book-space="booking.space_name"
                    :book-date="booking.day"
                    :book-schedule="`${booking.start_hour} - ${booking.end_hour}`"
                    :index="index"
                    class="mx-auto"
                />
                <button v-if="booking.editable"
                    @click="toggleEditModal(booking.id)"
                    class="bg-sky-600 hover:bg-sky-700 text-white font-medium py-1 px-2
                        rounded-lg shadow-md transition-all duration-200 flex items-center gap-2 
                        absolute -right-12">
                    <i class="pi pi-pen-to-square text-white text-lg"></i>
                </button>
                <button
                    @click="toggleCancelModal(booking.id)"
                    class="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-2
                    rounded-lg shadow-md transition-all duration-200 flex items-center gap-2"
                    :class="booking.editable? 'absolute -right-24': 'absolute -right-12'">
                    <i class="pi pi-trash text-white text-lg"></i>
                </button>
            </div>

            <div v-if="bookings.length > 0" class="mt-4 flex justify-end">
                <Button :to="'/user/book'" text="Reservar"></Button>
            </div>
        </div>

    <!-- Edit booking modal -->
    <div v-if="openEditBooking" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" @click="closeEditModal">
        <div 
            :class="{ 'w-3/5': showTimeCalendar }" 
            class="flex flex-col justify-stretch bg-white rounded-lg shadow-lg px-8 py-6 relative"
            @click.stop
        >
            <button @click="closeEditModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">✖</button>
            <div class="text-2xl font-semibold text-center mb-4">Editar reservación</div>
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
                            <label class="text-md font-semibold">Fecha:</label>
                            <DatePicker v-model="selectedDay" @update:modelValue="onDayChanged" :min-date="new Date()"
                                :disabled-days="disabledDates" :manual-input="false" />
                        </div>
                    </div>
        
                    <!-- Submit button -->
                    <button v-if="showSubmitButton" type="submit"
                        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200">
                        Actualizar reservación
                    </button>
                </div>
        
                <!-- Calendar (hours) and the rest of components -->
                <div v-if="showTimeCalendar" class="flex flex-col">
                    <div class="flex flex-col gap-y-4 max-w-fit">
                        <!-- Descriptive text -->
                        <span class="text-xl text-sky-600 font-semibold">
                            Arrastre el puntero para elegir el horario:
                        </span>
        
                        <!-- Calendar (hours) -->
                        <div class="w-[30vw] mx-auto">
                            <!-- :key attribute forces this component to re-renderize when the value changes -->
                            <DayCalendar @select="getHourSelection" @unselect="handleUnselection" :key="selectedDay"
                                :initial-date="selectedDayFormatted" :space-disponibility="spacesDisponibility[selectedSpace]"
                                :events="unavailableHours"></DayCalendar>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <!-- Success submitting booking modal -->
    <div v-if="showSuccessModal" class="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50"
        @click="closeShowSuccessModal">
        <div class="flex flex-col gap-y-6 justify-stretch bg-white rounded-lg shadow-lg px-8 py-6 w-96 relative"
            @click.stop>
            <div class="flex flex-row items-center justify-center gap-x-4">
                <span class="pi pi-info-circle text-sky-600 font-semibold"></span>
                <span class="text-sky-600 text-lg font-semibold">Modificación exitosa</span>
            </div>
            <div class="text-md text-justify">
                Su reservación en el espacio {{ spaceName }} a las
                {{ selectedSchedule[0] }} horas con fecha {{ selectedDayFormatted }}
                ha sido reescrita en el registro exitosamente.
            </div>
            <button @click="closeShowSuccessModal"
                class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200">
                Aceptar
            </button>
        </div>
    </div>

    <!-- Cancel Booking modal -->
    <div v-if="openCancelModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" @click="closeCancelModal">
        <div class="bg-white rounded-lg shadow-lg px-8 py-6 w-96 relative" @click.stop>
            <!-- Title -->
            <div class="text-2xl font-semibold text-center mb-4">Cancelar reservación</div>

            <!-- Description -->
            <div class="text-lg text-center mb-8">¿Estás seguro que quieres cancelar esta reservación?</div>

            <!-- Cancel and OK buttons -->
            <div class="flex flex-row justify-center gap-x-12">
                <Button
                    @click="closeCancelModal"
                    :text="'No cancelar'"
                ></Button>
                <Button
                    @click="handleCancellation(selectedBookId)"
                    :text="'Sí, Cancelar'"
                    :color="'red'"
                ></Button>               
            </div>
        </div>
    </div>
</template>

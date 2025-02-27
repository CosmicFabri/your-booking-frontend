<script setup>
import { ref, onMounted } from 'vue';

import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import SpaceRow from '@/components/admin/SpaceRow.vue';
import Button from '@/components/Button.vue';

// Spaces we're gonna be fetching
const spaces = ref([])

// For opening/closing our 'add space' modal
const openAddSpace = ref(false)

// For opening/closing our 'delete space' modal
const openDeleteSpace = ref(false)

// Selected space for its deletion
const selectedSpaceId = ref(null)

// Number of rows in total
const totalRows = ref(null)

const toggleAddModal = () => {
    openAddSpace.value = true
}

const closeAddModal = () => {
    openAddSpace.value = false
}

const toggleDeleteModal = (id) => {
    selectedSpaceId.value = id
    openDeleteSpace.value = true
}

const closeDeleteModal = () => {
    openDeleteSpace.value = false
    selectedSpaceId.value = null
}

const deleteSpace = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/spaces/${id}`,
            { method: 'DELETE' })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        // Close the modal
        closeDeleteModal()

        // Fetch updated spaces list
        await fetchSpaces();
    } catch (error) {
        console.error(`Error deleting space with id ${id}`, error)
    }
}

const fetchSpaces = async () => {
    try {
        const response = await fetch('http://localhost:5000/spaces')
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        spaces.value = await response.json()
        totalRows.value = spaces.value.length
    } catch (error) {
        console.error('Error fetching spaces', error)
    }
}

// Fetch spaces when the component is mounted
onMounted(fetchSpaces);
</script>

<template>
    <div class="flex flex-row">
        <!-- Sidebar -->
        <AdminSidebar></AdminSidebar>

        <!-- Main view -->
        <div class="flex flex-col flex-1 px-16 pt-12 gap-y-8">
            <!-- Title -->
            <div class="text-3xl font-semibold">Espacios</div>

            <!-- Table -->
            <div class="flex flex-col mx-auto relative">
                <!-- Table header -->
                <div class="flex flex-row bg-sky-300 text-gray-800 font-semibold border border-sky-600">
                    <div class="px-4 py-3 w-32 border-r border-sky-600 text-center">Nombre</div>
                    <div class="px-4 py-3 w-52 border-r border-sky-600 text-center">Descripción</div>
                    <div class="px-4 py-3 w-32 border-r border-sky-600 text-center">Capacidad</div>
                    <div class="px-4 py-3 w-48 border-r border-sky-600 text-center">Disponibilidad</div>
                </div>

                <!-- Table contents -->
                <div
                    v-for="(space, index) in spaces"
                    :key="space.id"
                    class="flex flex-row gap-x-8 relative"
                >
                    <SpaceRow
                        :space-name="space.name"
                        :space-description="space.description"
                        :space-capacity="space.capacity"
                        :space-disponibility="space.disponibility"
                        :index="index"
                        class="relative"
                    />
                    <button
                        @click="toggleDeleteModal(space.id)"
                        class="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-2
                        rounded-lg shadow-md transition-all duration-200 flex items-center gap-2 
                        absolute -right-12"
                    >
                        <i class="pi pi-trash text-white text-lg"></i>
                    </button>
                </div>

                <!-- Add button outside the loop -->
                <div v-if="spaces.length > 0" class="mt-4 flex justify-end">
                    <Button @click="toggleAddModal" text="Añadir"></Button>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Space modal -->
    <div v-if="openAddSpace" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" @click="closeAddModal">
        <div class="bg-white rounded-lg shadow-lg px-8 py-6 w-96 relative" @click.stop>
            <!-- Close button -->
            <button @click="closeAddModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                ✖
            </button>

            <!-- Title -->
            <div class="text-2xl font-semibold text-center mb-4">Añadir un espacio</div>

            <!-- Form -->
            <form class="flex flex-col gap-y-4">
                <div class="flex flex-col">
                    <label for="name" class="font-medium">Nombre:</label>
                    <input type="text" id="name" name="name" class="bg-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none" required>
                </div>

                <div class="flex flex-col">
                    <label for="description" class="font-medium">Descripción:</label>
                    <input type="text" id="description" name="description" class="bg-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none" required>
                </div>

                <div class="flex flex-col">
                    <label for="capacity" class="font-medium">Capacidad:</label>
                    <input type="number" id="capacity" name="capacity" class="bg-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none" required>
                </div>

                <div class="flex flex-col">
                    <span class="font-medium">Disponibilidad:</span>
                    <div class="flex items-center gap-x-2">
                        <label for="from">De:</label>
                        <select id="from" name="from" class="bg-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none">
                            <option>08:00</option>
                            <option>09:00</option>
                            <option>10:00</option>
                        </select>
                        <label for="to">A:</label>
                        <select id="to" name="to" class="bg-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400 focus:outline-none">
                            <option>17:00</option>
                            <option>18:00</option>
                            <option>19:00</option>
                        </select>
                    </div>
                </div>
            </form>

            <!-- Button -->
            <div class="flex justify-end mt-4">
                <Button :to="'/admin/spaces'" :text="'Añadir espacio'"></Button>
            </div>
        </div>
    </div>

    <!-- Delete Space modal -->
    <div v-if="openDeleteSpace" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" @click="closeDeleteModal">
        <div class="bg-white rounded-lg shadow-lg px-8 py-6 w-96 relative" @click.stop>
            <!-- Title -->
            <div class="text-2xl font-semibold text-center mb-4">Eliminar espacio</div>

            <!-- Description -->
            <div class="text-lg text-center mb-8">¿Estás seguro que quieres eliminar este espacio?</div>

            <!-- Cancel and OK buttons -->
            <div class="flex flex-row justify-center gap-x-12">
                <Button
                    @click="closeDeleteModal"
                    :text="'Cancelar'"
                ></Button>
                <Button
                    @click="deleteSpace(selectedSpaceId)"
                    :text="'Aceptar'"
                    :color="'red'"
                ></Button>
            </div>
        </div>
    </div>
</template>
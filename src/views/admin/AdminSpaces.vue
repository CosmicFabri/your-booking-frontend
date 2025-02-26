<script setup>
import { ref } from 'vue';

import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import SpaceRow from '@/components/admin/SpaceRow.vue';
import Button from '@/components/Button.vue';

const spaces = ref([
    {
        name: 'CIC-2',
        description: 'Sala 2 del CIC',
        capacity: 50,
        disponibility: '11:00 - 13:00'
    },
    {
        name: 'CIC-3',
        description: 'Sala 3 del CIC',
        capacity: 45,
        disponibility: '09:00 - 11:00'
    },
    {
        name: 'ACT',
        description: 'Sala de Actos',
        capacity: 80,
        disponibility: '11:00 - 13:00'
    },
    {
        name: 'DID',
        description: 'Sala Didáctica',
        capacity: 50,
        disponibility: '13:00 - 15:00'
    }
])

// The state of our modal
const open = ref(false)

const toggleModal = () => {
    open.value = true
    console.log(open.value)
}

const closeModal = () => {
    open.value = false;
}
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
            <div class="flex flex-col justify-center mx-auto">
                <!-- Table header -->
                <div class="flex flex-row bg-sky-300 text-gray-800 font-semibold border border-sky-600">
                    <div class="px-4 py-3 w-32 border-r border-sky-600 text-center">Nombre</div>
                    <div class="px-4 py-3 w-52 border-r border-sky-600 text-center">Descripción</div>
                    <div class="px-4 py-3 w-32 border-r border-sky-600 text-center">Capacidad</div>
                    <div class="px-4 py-3 w-52 text-center">Disponibilidad</div>
                </div>

                <!-- Table contents -->
                <SpaceRow
                    v-for="(space, index) in spaces"
                    :key="space.id"
                    :space-name="space.name"
                    :space-description="space.description"
                    :space-capacity="space.capacity"
                    :space-disponibility="space.disponibility"
                    :index="index"
                />
            </div>

            <!-- Button to add a space -->
            <div class="flex justify-end">
                <Button @click="toggleModal" :text="'Añadir espacio'"></Button>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div v-if="open" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" @click="closeModal">
        <div class="bg-white rounded-lg shadow-lg px-8 py-6 w-96 relative" @click.stop>
            <!-- Close button -->
            <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
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
</template>
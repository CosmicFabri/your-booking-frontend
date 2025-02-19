<script setup>
import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import Button from '@/components/Button.vue';
</script>

<template>
    <div class="flex flex-row">
        <!-- Sidebar -->
        <AdminSidebar />

        <!-- Main view -->
        <div class="flex flex-col px-24 py-16 gap-y-12">
            <!-- Title -->
            <div class="text-3xl font-semibold">Añadir un espacio</div>

            <!-- Form for adding a space -->
            <form class="flex flex-col gap-y-6">

                <!-- Nombre -->
                <div class="flex items-center">
                    <label for="name" class="w-32">Nombre:</label>
                    <input type="text" id="name" name="name"
                        class="bg-gray-200 rounded-lg w-64 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        required>
                </div>

                <!-- Descripción -->
                <div class="flex items-center">
                    <label for="description" class="w-32">Descripción:</label>
                    <input type="text" id="description" name="description"
                        class="bg-gray-200 rounded-lg w-64 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        required>
                </div>

                <!-- Capacidad -->
                <div class="flex items-center">
                    <label for="capacity" class="w-32">Capacidad:</label>
                    <input type="number" id="capacity" name="capacity"
                        class="bg-gray-200 rounded-lg w-32 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        required>
                </div>

                <!-- Disponibilidad -->
                <div class="flex flex-col gap-y-2">
                    <div>Disponibilidad</div>
                    <div class="flex items-center gap-x-2">
                        <label for="from">De:</label>
                        <select id="from" name="from"
                            class="bg-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400">
                            <option>08:00</option>
                            <option>09:00</option>
                            <option>10:00</option>
                        </select>
                        <label for="to">A:</label>
                        <select id="to" name="to"
                            class="bg-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-400">
                            <option>17:00</option>
                            <option>18:00</option>
                            <option>19:00</option>
                        </select>
                    </div>
                </div>
            </form>

            <!-- Button to add a space -->
            <div class="flex justify-end">
                <Button :to="'/admin/spaces'" :text="'Añadir espacio'"></Button>
            </div>
        </div>
    </div>
</template>

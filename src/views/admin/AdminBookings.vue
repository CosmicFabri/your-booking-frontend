<script setup>
import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import BookRow from '@/components/admin/BookRow.vue';
</script>

<template>
    <div class="flex flex-row">
        <!-- Sidebar -->
        <AdminSidebar></AdminSidebar>

        <!-- Main view -->
        <div class="flex flex-col px-24 py-16 gap-y-12">

            <!-- Title -->
            <div class="text-3xl font-semibold">Reservaciones</div>

            <div>Aquí se mostrará el calendario</div>

            <!-- Table showing the bookings of the date selected -->
            <div class="flex flex-col">

                <!-- Table header -->
                <div class="flex flex-row">
                    <div class="px-4 py-2 w-52 bg-sky-200 border-2 border-black font-semibold">No. Reservación</div>
                    <div class="px-4 py-2 w-52 bg-sky-200 border-2 border-black font-semibold">Espacio</div>
                    <div class="px-4 py-2 w-52 bg-sky-200 border-2 border-black font-semibold">Usuario</div>
                    <div class="px-4 py-2 w-52 bg-sky-200 border-2 border-black font-semibold">Horario</div>
                </div>

                <!-- Table contents -->
                <BookRow
                    :book-number="1"
                    :book-space="'CIC-1'"
                    :book-user="'José Carlos Aguilar Canepa'"
                    :book-schedule="'09:00 - 11:00'"></BookRow>
            </div>
        </div>
    </div>
</template>
<script setup>
import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import SpaceRow from '@/components/admin/SpaceRow.vue';
import Button from '@/components/Button.vue';
</script>

<template>
    <div class="flex flex-row">
        <!-- Sidebar -->
        <AdminSidebar></AdminSidebar>

        <!-- Main view -->
        <div class="flex flex-col px-24 py-16 gap-y-12">

            <!-- Title -->
            <div class="text-3xl font-semibold">Espacios</div>

            <!-- Table -->
            <div class="flex flex-col">
                <!-- Table header -->
                <div class="flex flex-row">
                    <div class="px-4 py-2 w-52 bg-sky-200 border-2 border-black font-semibold">Nombre</div>
                    <div class="px-4 py-2 w-52 bg-sky-200 border-2 border-black font-semibold">Descripción</div>
                    <div class="px-4 py-2 w-52 bg-sky-200 border-2 border-black font-semibold">Cantidad</div>
                    <div class="px-4 py-2 w-52 bg-sky-200 border-2 border-black font-semibold">Disponibilidad</div>
                </div>

                <!-- Table contents -->
                <SpaceRow
                    :space-name="'CIC-2'"
                    :space-description="'Sala 2 del CIC'"
                    :space-capacity="50"
                    :space-disponibility="'11:00 - 13:00'"
                ></SpaceRow>
                <SpaceRow
                    :space-name="'CIC-3'"
                    :space-description="'Sala 3 del CIC'"
                    :space-capacity="45"
                    :space-disponibility="'09:00 - 11:00'"
                ></SpaceRow>
                <SpaceRow
                    :space-name="'ACT'"
                    :space-description="'Sala de Actos'"
                    :space-capacity="80"
                    :space-disponibility="'09:00 - 11:00'"
                ></SpaceRow>
                <SpaceRow
                    :space-name="'DID'"
                    :space-description="'Sala Didáctica'"
                    :space-capacity="50"
                    :space-disponibility="'13:00 - 15:00'"
                ></SpaceRow>
            </div>

            <!-- Button to add a space -->
            <div class="flex justify-end">
                <Button :to="'/admin/spaces/add'" :text="'Añadir'"></Button>
            </div>
        </div>
    </div>
</template>
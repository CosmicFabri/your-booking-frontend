<script setup>
import UserSidebar from '@/components/user/UserSidebar.vue';
</script>

<template>
    <div class="flex flex-row">
        <!-- Sidebar -->
        <UserSidebar></UserSidebar>

        <!-- Main view -->
        <div class="flex flex-col flex-1 px-16 pt-12 gap-y-8">
            <!-- Title -->
            <div class="text-3xl font-semibold">Archivo</div>
        </div>
    </div>
</template>
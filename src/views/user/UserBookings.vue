<script setup>
import SelectButton from '@/components/user/SelectButton.vue';
import UserSidebar from '@/components/user/UserSidebar.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const router = useRoute()
const overflowClass = computed(() => router.path.name == 'user-bookings-table' ? 'overflow-auto' : 'overflow-auto')

</script>

<template>
    <div class="flex flex-row h-[calc(100vh-10rem)]">
        <!-- Sidebar -->
        <UserSidebar></UserSidebar>
    <div class="flex flex-col flex-1 px-16 pt-12 gap-y-8 "
        :class="overflowClass">
        <!-- Title -->
        <div class="flex justify-between">
            <div class="text-3xl font-semibold">Reservaciones</div>
            <SelectButton/>
        </div>

        <router-view />
    </div>
    </div>
    
</template>

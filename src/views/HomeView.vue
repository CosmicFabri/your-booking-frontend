<script setup>
import Button from '@/components/Button.vue';
</script>

<template>
    <div class="flex flex-row">
        <!-- Engineering Faculty picture (left) -->
        <div class="h-screen shadow-2xl" style="height: calc(100vh - 7rem);">
            <img src="../assets/img/Home.jpeg" alt="" class="w-full h-full object-cover">
        </div>

        <!-- Main view (Engineering Faculty logo, description, Book Now) -->
        <div class="flex flex-col justify-center items-center gap-y-16 flex-1">
            
            <!-- Engineering faculty logo -->
            <div class="flex flex-row items-center gap-x-4">
                <div class="w-36 h-36">
                    <img src="../assets/img/FDI_Logo.png">
                </div>
                <div class="flex flex-col gap-y-2 items-center">
                    <div class="font-bold text-6xl text-sky-900">Engineering</div>
                    <div class="font-bold text-6xl text-sky-900">Faculty</div>
                </div>
            </div>

            <!-- Description -->
            <div class="max-w-3xl text-2xl text-justify italic">
                With Your Booking, you can easily book spaces from the Faculty of Engineering, of the
                Autonomus University of Campeche. Manage your spaces and schedules in a convenient
                way, and edit them whenever you want, up to 24 hours before the booking date.
            </div>

            <!-- Book Now -->
            <Button :text="'Book now!'" :font-size="'2xl'"></Button>
        </div>
    </div>
</template>
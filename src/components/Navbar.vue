<script setup>
import Button from './Button.vue';
</script>

<template>
    <div class="bg-sky-200 xl:px-24 px-10 py-4 flex flex-row items-center shadow-xl justify-between">
        <!-- Logo image and app name -->
        <div class="flex-1 flex flex-row gap-x-4 items-center">
            <img class="w-24 h-20 object-fill" src="../assets/img/Your_Booking_Logo_Shadow.png">
            <div class="flex flex-col">
                <div class="sm:block hidden text-sky-800 md:text-3xl sm:text-2xl font-bold">Your</div>
                <div class="sm:block hidden text-sky-800 md:text-3xl sm:text-2xl font-bold">Booking</div>
            </div>
        </div>

        <!-- UACAM logo -->
        <div class="flex-1 flex justify-center">
            <img src="../assets/img/UACAM_Logo.png" class="lg:block w-56 h-16 hidden object-fill">
        </div>

        <!-- 'My Bookings' button -->
        <div class="flex-1 flex justify-end">
            <Button :text="'My Bookings'"></Button>
        </div>
    </div>
</template>
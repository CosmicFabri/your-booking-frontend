<script setup>
import Button from './Button.vue';
</script>

<template>
    <div class="bg-sky-200 xl:px-24 px-10 py-4 flex flex-row items-center shadow-xl justify-between">
        <!-- Logo image and app name -->
        <div class="flex flex-row gap-x-4 items-center">
            <img class="w-24 h-20 object-fill" src="../assets/img/Your_Booking_Logo_Shadow.png">
            <div class="flex flex-col">
                <div class="text-sky-800 sm:text-3xl text-2xl font-bold">Your</div>
                <div class="text-sky-800 sm:text-3xl text-2xl font-bold">Booking</div>
            </div>
        </div>

        <!-- UACAM logo -->
        <img src="../assets/img/UACAM_Logo.png" class="lg:flex w-68 h-20 -ml-28 lg:visible invisible object-fill">

        <!-- 'My Bookings' button -->
        <Button :text="'My Bookings'"></Button>
    </div>
</template>
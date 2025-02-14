<script setup>
import Button from './Button.vue';
</script>

<template>
    <div class="bg-sky-200 px-24 py-6 flex flex-row items-center shadow-xl mb-6 justify-between">
        <!-- Logo image and app name -->
        <div class="flex flex-row gap-x-4 items-center">
            <img class="w-24 h-20 object-fill" src="../assets/img/Your_Booking_Logo_Shadow.png">
            <div class="text-sky-800 text-3xl font-bold">Your Booking</div>
        </div>

        <!-- 'Book now!' button -->
        <Button :text="'Book now!'"></Button>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    bookNumber: Number,
    bookSpace: String,
    bookUser: String,
    bookSchedule: String
})
</script>

<template>
    <div class="flex flex-row">
        <div class="px-4 py-2 w-52 border-2 border-black">{{ props.bookNumber }}</div>
        <div class="px-4 py-2 w-52 border-2 border-black">{{ props.bookSpace }}</div>
        <div class="px-4 py-2 w-52 border-2 border-black">{{ props.bookUser }}</div>
        <div class="px-4 py-2 w-52 border-2 border-black">{{ props.bookSchedule }}</div>
    </div>
</template>
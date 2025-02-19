<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    spaceName: String,
    spaceDescription: String,
    spaceCapacity: Number,
    spaceDisponibility: String
})
</script>

<template>
    <div class="flex flex-row">
        <div class="px-4 py-2 w-52 border-2 border-black">{{ props.spaceName }}</div>
        <div class="px-4 py-2 w-52 border-2 border-black">{{ props.spaceDescription }}</div>
        <div class="px-4 py-2 w-52 border-2 border-black">{{ props.spaceCapacity }}</div>
        <div class="px-4 py-2 w-52 border-2 border-black">{{ props.spaceDisponibility }}</div>
    </div>
</template>
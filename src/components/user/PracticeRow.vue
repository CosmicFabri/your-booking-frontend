<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    practice: Object,
    index: Number // For alternating row colors
})

const isEven = computed(() => props.index % 2 === 0)
</script>

<template>
    <div 
        class="flex flex-row border border-gray-300"
        :class="isEven ? 'bg-gray-100' : 'bg-white'"
    >
        <div class="px-4 py-2 w-40 border-r border-gray-300 text-center">{{ practice.id }}</div>
        <div class="px-4 py-2 w-56 border-r border-gray-300 text-center">{{ practice.name }}</div>
    </div>
</template>
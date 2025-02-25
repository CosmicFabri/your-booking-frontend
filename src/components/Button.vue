<script setup>
const props = defineProps({
    text: String,
    to: String,
    fontSize: {
        type: String,
        default: 'xl'
    }
})
</script>

<template>
    <RouterLink
        :to="to"
        :class="[
            'bg-gradient-to-r from-sky-600 to-blue-500 text-white hover:from-sky-500 hover:to-blue-400',
            'focus:ring-4 focus:outline-none focus:ring-sky-300 rounded-xl sm:px-5 px-4 py-2',
            'text-center me-2 mb-2 border-2 border-solid border-sky-600 shadow-md hover:shadow-lg',
            'transition-all duration-300 ease-in-out transform hover:scale-105',
            `text-${fontSize}`
        ]">
        {{ text }}
    </RouterLink>
</template>
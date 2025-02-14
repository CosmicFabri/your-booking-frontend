<script setup>
const props = defineProps(['text', 'fontSize'])
</script>

<template>
    <RouterLink 
        :to="'/login'"
        :class="`bg-gradient-to-r from-sky-400 to-sky-700 text-white hover:from-sky-600 font-semibold
               hover:to-sky-900 text-${ props.fontSize } focus:ring-4 focus:outline-none focus:ring-sky-300
               rounded-xl sm:px-4 px-1.5 py-2 text-center me-2 mb-2 border-2 border-solid border-sky-600`">
        {{ props.text }}
    </RouterLink>
</template>
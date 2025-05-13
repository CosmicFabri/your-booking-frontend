<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import Button from './Button.vue';
import { ref } from 'vue';

const router = useRouter()

const props = defineProps({
    programs: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['programClicked'])

const handleClick = (id) => emit('programClicked', id)

const isActiveLink = (routePath) => {
    const route = useRoute() // Current route path we're in
    return route.fullPath === routePath
}

const back = () => router.push({name: 'home'})

</script>

<template>
    <div class="flex flex-col pl-6 pr-12 py-8 bg-gray-200 justify-between w-48 h-[calc(100vh-7rem)] shadow-xl">
        <div class="absolute text-xl font-semibold text-sky-600">
            Carreras
        </div>
        <div class="flex flex-col gap-y-4 mt-12">
            <RouterLink v-for="program in programs"
                :key="program.id" 
                :class="[isActiveLink(`/practices?programId=${String(program.id)}`) ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-300',
                    'hover:rounded-xl px-4 py-2 rounded-xl']" 
                :to="`/practices?programId=${program.id}`"
                v-on:click="() => handleClick(program.id)">{{ program.name }}</RouterLink>
        </div>
        <div class="p-4">
            <Button
                :text="'Volver'"
                @click="back"
                :font-size="'2xl'"
                :color="'gray'"
            ></Button>
        </div>
    </div>
</template>
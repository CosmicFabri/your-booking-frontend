<script setup>
import PracticesSidebar from '@/components/PracticesSidebar.vue';
import { Accordion, AccordionPanel, AccordionHeader, AccordionContent } from 'primevue';
import { useRouter, useRoute } from 'vue-router';
import { fetchData } from '@/utils/api';
import { ref, onMounted } from 'vue';

const API_BASE_URL = import.meta.env.VITE_API_BASE

const router = useRouter()
const route = useRoute()

const programs = ref([])
const selectedProgramId = ref(0)

const subjects = ref([])

const onProgramChanged = async (id, index) => {
    if(selectedProgramId.value != id) {
        await fetchSubjects(id)
        selectedProgramId.value = id
    }
}

const fetchSubjects = async (idProgram) => {
    const data = await fetchData(`subject?programId=${idProgram}`)
    subjects.value = data
}

const download = async (fileName) => {
    try {
        const response = await fetch(`${API_BASE_URL}/file/${fileName}`, {
            method: 'GET',
            headers: {
                // Si necesitas autenticar, pon aquí los headers
                // 'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al descargar el archivo');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        // Abre el PDF en una nueva pestaña
        window.open(url, '_blank');
    } catch (error) {
        console.log('Error al abrir el archivo:', error);
    }
};

onMounted(async () => {
    try{
        const response = await fetchData('program')
        programs.value = response
        selectedProgramId.value = programs.value[0].id

        const currentQuery = { ...route.query }

        // Si no hay "id" en la query, lo pones por defecto
        if (!currentQuery.programId) {
            currentQuery.programId = '1'
            router.replace({ query: currentQuery }) // Esto actualiza la URL sin recargar
        }

        await fetchSubjects(selectedProgramId.value)

    } catch (error) {
        console.log(error)
    }
})

</script>
<template>
    <div class="flex flex-row h-[calc(100vh-10rem)]">
        <PracticesSidebar
            :programs="programs"
            @program-clicked="onProgramChanged"/>
        
        <div class="flex flex-col flex-1 px-32 pt-12 gap-y-8 overflow-auto">
            <!-- Title -->
            <div class="flex justify-between">
                <div class="text-3xl font-semibold">Prácticas</div>
                <div class="self-end top-4 right-4">
                </div>
            </div>
            <Accordion value="0">
                <AccordionPanel v-for="(subject, index) in subjects"
                    :key="subject.id"
                    :value="index">
                    <AccordionHeader>{{ subject.name }}</AccordionHeader>
                    <AccordionContent>
                        <p v-for="(practice, index) in subject.practices" :key="practice.id"> {{ practice.name }} <span class="ml-4"></span>
                            <button v-if="practice.file_name != null" @click="download(practice.file_name)">Descargar Práctica</button>
                        </p>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div>
    </div>
</template>
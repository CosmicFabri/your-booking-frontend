<script setup>
import UserSidebar from '@/components/user/UserSidebar.vue';
import { fetchData } from '@/utils/api';
import { ref, onMounted } from 'vue';
import PracticeRow from '@/components/user/PracticeRow.vue';
import FileUpload from 'primevue/fileupload';

const API_BASE_URL = import.meta.env.VITE_API_BASE

const subjects = ref([])
const selectedSubject = ref(0)

const practices = ref([])

const onSubjectChanged = async () => {
    await fetchPractices(selectedSubject.value)
}

const fetchPractices = async (id) => {
    try {
        const response = await fetchData(`practice?subjectId=${id}`)
        practices.value = response
        console.log(practices.value)
    } catch (error) {

    }
}

const handleUpload = async (event, practiceId) => {
    const formData = new FormData();
    formData.append('file', event.files[0])
    formData.append('practiceId', practiceId)
    const file = event.files[0]
    const body = {file, practiceId}

    try {
        const response = await fetch(`${API_BASE_URL}/file`,{method: 'POST', body: formData})
        

        await fetchSubjects()
    } catch (error) {
        console.error(error)
    }
    
}

const fetchSubjects = async () => {
    try {
        const response = await fetchData('subject')
        subjects.value = response
    } catch(error) {

    }
}

onMounted(async () => {
    await fetchSubjects()
    
})

</script>
<template>
    <div class="flex flex-row h-[calc(100vh-10rem)]">
        <!-- Sidebar -->
        <UserSidebar></UserSidebar>
        <div class="flex flex-col flex-1 px-16 pt-12 overflow-auto">

            <!-- Title -->
            
            <div class="text-3xl font-semibold">Prácticas</div>
            


            <div class="flex flex-col">
                <select v-model="selectedSubject" @change="onSubjectChanged"
                        class="w-1/2 bg-gray-200 rounded-lg px-3 py-2 my-8 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                        >
                    <option value="" disabled selected hidden>Seleccionar materia</option>
                    <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
                        {{ subject.name }}
                    </option>
                </select>
                
                <!-- Table header -->
                <div class="flex flex-row justify-center bg-sky-300 mx-auto text-gray-800 font-semibold border border-sky-600">
                    <div class="px-4 py-3 w-40 border-r border-sky-600 text-center">Id Práctica</div>
                    <div class="px-4 py-3 w-56 border-r border-sky-600 text-center">Nombre</div>
                </div>
                <div v-for="(practice, index) in practices" :key="practice.id" class="flex flex-row gap-x-8 relative">
                    <PracticeRow 
                    :key="practice.id"
                    :practice="practice"
                    :index="index"
                    class="mx-auto"
                    />
                    <div v-if="practice.file_name == null" class="absolute right-1/4 top-1/2 transform -translate-y-1/2">
                            <FileUpload
                                mode="basic" 
                                custom-upload
                                name="demo[]" 
                                accept="application/pdf" 
                                @select="(event) => handleUpload(event, practice.id)" 
                                :auto="true" 
                                chooseLabel="Browse"
                                class="text-sm opacity-70 hover:opacity-100 transition-opacity"
                            />
                    </div>
                </div>
                
                
            </div>
            
        </div>
    </div>
</template>
<script setup>
import UserSidebar from '@/components/user/UserSidebar.vue';
import { fetchData } from '@/utils/api';
import { ref, onMounted } from 'vue';
import PracticeRow from '@/components/user/PracticeRow.vue';
import FileUpload from 'primevue/fileupload';
import SuccessModal from '@/components/ui/SuccessModal.vue';
import CancelModal from '@/components/ui/CancelModal.vue';

const API_BASE_URL = import.meta.env.VITE_API_BASE

const subjects = ref([])
const selectedSubject = ref(0)

const practices = ref([])

const onSubjectChanged = async () => {
    await fetchPractices(selectedSubject.value)
}

const successMessage = ref("")
const showSuccessModal = ref(false)
const closeSuccessModal = () => {
    showSuccessModal.value = false
}


const selectedFile = ref(null)

const showDeleteModal = ref(false)
const toggleDeleteModal = (fileName) => {
    selectedFile.value = fileName
    showDeleteModal.value = true
}

const closeDeleteModal = () => {
    selectedFile.value = null
    showDeleteModal.value = false
}

const deleteFile = async (fileName) => {
    try {
        const response = await fetchData(`file/${fileName}`, 'DELETE')
        successMessage.value = "Archivo eliminado con éxito"
        showDeleteModal.value = false
        showSuccessModal.value = true

    } catch (error){
        console.error(error)
    }
    
    selectedFile.value = null
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
        successMessage.value = "Se ha subido la práctica con éxito"
        showSuccessModal.value = true;

        subjects.value = []
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

const download = async (fileName) => {
    try {
        const response = await fetch(`${API_BASE_URL}/file/${fileName}`, {
            method: 'GET'
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
                

                <div class="flex flex-col mx-auto relative">
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
                    <div v-if="practice.file_name == null" class="absolute -right-24">
                            <FileUpload
                                mode="basic" 
                                custom-upload
                                name="demo[]" 
                                accept="application/pdf" 
                                @select="(event) => handleUpload(event, practice.id)" 
                                :auto="true" 
                                chooseLabel="Subir"
                                class="text-sm opacity-70 hover:opacity-100 transition-opacity"
                            />
                    </div>
                    <button v-if="practice.file_name != null"
                        @click="download(practice.file_name)"
                        class="bg-sky-600 hover:bg-sky-700 text-white font-medium py-1 px-2
                            rounded-lg shadow-md transition-all duration-200 flex items-center gap-2 
                            absolute -right-12">
                        <i class="pi pi-download text-white text-lg"></i>
                    </button>
                    <button v-if="practice.file_name != null"
                        @click="toggleDeleteModal(practice.file_name)"
                        class="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-2
                        rounded-lg shadow-md transition-all duration-200 flex items-center gap-2 absolute -right-24">
                        <i class="pi pi-trash text-white text-lg"></i>
                    </button>
                </div>
            </div>
                
            </div>
            
        </div>
        <SuccessModal
            v-if="showSuccessModal"
            title="Confirmación de práctica"
            :message=successMessage
            @close="closeSuccessModal"></SuccessModal>
        
        <CancelModal
            v-if="showDeleteModal"
            title="Eliminar archivo"
            description="¿Estás seguro que quieres eliminar el archivo de esta práctica?"
            action="eliminar"
            @close="closeDeleteModal"
            @cancel="deleteFile(selectedFile)"></CancelModal>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import AdminSidebar from '@/components/admin/AdminSidebar.vue';

// ID of the last user
const lastUserId = ref(null)

// For showing/hiding the 'success' modal
// when submitting a new user to the system
const showSuccessModal = ref(false)

const toggleShowSuccessModal = () => {
  showSuccessModal.value = true
}

const closeShowSuccessModal = () => {
  showSuccessModal.value = false
  clearForm() // Only clear form when closing modal
}

// Record we're gonna submit via POST
const form = ref({
  id: { type: Number },
  name: '',
  email: '',
  password: ''
})

const clearForm = () => {
  form.value.id = null
  form.value.name = ''
  form.value.email = ''
  form.value.password = ''
}

const fetchUsers = async () => {
  try {
    const response = await fetch('http://localhost:5000/users')
    if (!response.ok) {
      console.log(`Response status: ${response.status}`)
    }

    const json = await response.json()

    if (json.length > 0) {
      lastUserId.value = parseInt(json[json.length - 1].id) // Get the last element's ID
    } else {
      lastUserId.value = null
    }

    console.log(lastUserId.value)
  } catch (error) {
    console.error('Error fetching users', error)
  }
}

const handleSubmit = async () => {
  const newUser = {
    id: String(lastUserId.value ? lastUserId.value + 1 : 1), // Ensure ID is unique
    name: form.value.name,
    email: form.value.email,
    password: form.value.password
  }

  try {
    const response = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser)
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    toggleShowSuccessModal()
  } catch (error) {
    console.error(`Error submitting user with ID ${newUser.id}`, error)
  }
}

onMounted(fetchUsers)
</script>

<template>
  <div class="flex flex-row">
    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main view -->
    <div class="flex flex-1 flex-col justify-center items-center p-10">
      <!-- Title -->
      <h1 class="text-4xl font-bold text-gray-800 mb-6">Registro al Sistema</h1>

      <!-- Form Container -->
      <div class="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-y-6">
          <!-- User's name -->
          <div class="flex flex-col">
            <label for="user-name" class="font-semibold text-gray-700 mb-1">Nombre del usuario:</label>
            <input v-model="form.name" type="text" id="user-name" name="user-name"
              class="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none" />
          </div>

          <!-- E-mail -->
          <div class="flex flex-col">
            <label for="email" class="font-semibold text-gray-700 mb-1">Correo electrónico:</label>
            <input v-model="form.email" type="email" id="email" name="email"
              class="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none" />
          </div>

          <!-- Password -->
          <div class="flex flex-col">
            <label for="pass" class="font-semibold text-gray-700 mb-1">Contraseña:</label>
            <input v-model="form.password" type="password" id="pass" name="pass"
              class="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none" />
          </div>

          <!-- Submit Button -->
          <button type="submit"
            class="bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition">
            Registrar
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- Success submitting booking modal -->
  <div v-if="showSuccessModal" class="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50"
    @click="closeShowSuccessModal">
    <div class="flex flex-col gap-y-6 justify-stretch bg-white rounded-lg shadow-lg px-8 py-6 w-96 relative"
      @click.stop>
      <div class="flex flex-row items-center justify-center gap-x-4">
        <span class="pi pi-info-circle text-sky-600 font-semibold"></span>
        <span class="text-sky-600 text-lg font-semibold">Reserva exitosa</span>
      </div>
      <div class="text-md text-justify">
        El usuario {{ form.name }} ha sido añadido
        de manera exitosa al sistema.
      </div>
      <button @click="closeShowSuccessModal"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200">
        Aceptar
      </button>
    </div>
  </div>
</template>

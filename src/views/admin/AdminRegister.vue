<script setup>
import { ref } from 'vue';
import AdminSidebar from '@/components/admin/AdminSidebar.vue';

// Record we're gonna submit via POST
const form = ref({
    id: 0,
    name: '',
    email: '',
    password: ''
})

// const fetchUsers = async () => {
//     try {
//         const response = await fetch('http://localhost:5000/users')
//         if (!response.ok) {
//             console.log(`Response status: ${response.status}`)
//         }


//     } catch (error) {
//         console.error('Error fetching users', error)
//     }
// }

const handleSubmit = () => {
    
};
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
            <input 
              v-model="form.name" type="text" id="user-name" name="user-name"
              class="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <!-- E-mail -->
          <div class="flex flex-col">
            <label for="email" class="font-semibold text-gray-700 mb-1">Correo electrónico:</label>
            <input 
              v-model="form.email" type="email" id="email" name="email"
              class="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <!-- Password -->
          <div class="flex flex-col">
            <label for="pass" class="font-semibold text-gray-700 mb-1">Contraseña:</label>
            <input 
              v-model="form.password" type="password" id="pass" name="pass"
              class="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <!-- Submit Button -->
          <button 
            type="submit"
            class="bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

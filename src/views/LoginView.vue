<script setup>
</script>

<template>
    <div class="flex flex-row min-h-screen">
        <!-- Engineering Faculty picture (left, visible on desktop) -->
        <div class="md:flex hidden flex-1 shadow-2xl max-w-md max-h-4xl">
            <img src="../assets/img/Home_Vertical.jpeg" alt="" class="w-full h-full object-cover">
        </div>

        <!-- Main view -->
        <div class="flex flex-col justify-center items-center md:mt-0 mt-12 gap-y-8 flex-1 py-12">
            
            <!-- App and University logo (visible on phones) -->
            <div class="sm:hidden flex flex-col items-center gap-y-12 -mb-8">
                <div class="flex flex-row gap-x-4 items-center">
                    <img class="w-24 h-20 object-fill" src="../assets/img/Your_Booking_Logo_Shadow.png">
                    <div class="flex flex-col items-center gap-y-2">
                        <div class="text-sky-800 text-3xl font-extrabold">Your</div>
                        <div class="text-sky-800 text-3xl font-extrabold">Booking</div>
                    </div>
                </div>
                <div class="w-72 h-36">
                    <img src="../assets/img/UACAM_Logo.png">
                </div>
            </div>

            <!-- Engineering Faculty logo & Description -->
            <div class="flex flex-col items-center text-center mt-8 px-6">
                <div class="flex flex-row items-center gap-x-4">
                    <div class="w-20 h-20">
                        <img src="../assets/img/FDI_Logo.png">
                    </div>
                    <div class="font-bold xl:text-4xl text-2xl text-sky-900">
                        Engineering Faculty
                    </div>
                </div>
                <p class="text-gray-700 text-lg max-w-2xl mt-4">
                    With <span class="font-semibold text-sky-600">Your Booking</span>, you can easily book spaces from the 
                    Faculty of Engineering, of the Autonomous University of Campeche. Manage your spaces and schedules in a 
                    convenient way, and edit them whenever you want, up to 24 hours before the booking date.
                </p>
            </div>

            <!-- Log In container -->
            <div
                class="max-w-3xl xl:text-2xl text-lg p-6 mx-12 border-gray-300 border-2 border-solid rounded-xl shadow-xl bg-gray-100">
                <h2 class="text-center text-2xl font-bold text-gray-700 mb-6">Log In</h2>

                <form class="flex flex-col gap-y-4">
                    <div class="flex flex-col">
                        <label for="email" class="text-gray-700 font-medium">Email:</label>
                        <input type="email" id="email" name="email"
                            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                            placeholder="Enter your email" required>
                    </div>

                    <div class="flex flex-col">
                        <label for="password" class="text-gray-700 font-medium">Password:</label>
                        <input type="password" id="password" name="password"
                            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                            placeholder="Enter your password" required>
                    </div>

                    <button type="submit"
                        class="bg-sky-600 text-white hover:bg-sky-500 px-6 py-2 rounded-lg font-bold shadow-md transition duration-300">
                        Log In
                    </button>
                </form>

                <!-- Sign-up link -->
                <p class="text-center text-gray-600 text-sm mt-4">
                    Don't have an account?
                    <router-link to="/signup" class="text-sky-600 font-semibold hover:underline">Sign up</router-link>
                </p>
            </div>

            <!-- Engineering Faculty picture (bottom, visible on phones) -->
            <div class="md:hidden block min-w-screen max-h-xl">
                <img src="../assets/img/Home_Horizontal.jpeg">
            </div>
        </div>
    </div>
</template>

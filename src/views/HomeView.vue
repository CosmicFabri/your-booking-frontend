<script setup>
import Button from '@/components/Button.vue';
</script>

<template>
    <div class="flex flex-row">
        <!-- Engineering Faculty picture (left, visible on desktop) -->
        <div class="md:block hidden h-screen shadow-2xl" style="height: calc(100vh - 7rem);">
            <img src="../assets/img/Home_Vertical.jpeg" alt="" class="w-full h-full object-cover">
        </div>

        <!-- Main view (Engineering Faculty logo, description, Book Now; all three visible on desktop) -->
        <div class="flex flex-col justify-center items-center md:mt-0 mt-12 lg:gap-y-16 gap-y-8 flex-1">

            <!-- App and University logo (visible on phones) -->
            <div class="sm:hidden flex flex-col items-center gap-y-12 -mb-8">
                <!-- Your Booking logo (visible on phones) -->
                <div class="flex flex-row gap-x-4 items-center">
                    <img class="w-24 h-20 object-fill" src="../assets/img/Your_Booking_Logo_Shadow.png">
                    <div class="flex flex-col items-center gap-y-2">
                        <div class="text-sky-800 text-3xl font-extrabold">Your</div>
                        <div class="text-sky-800 text-3xl font-extrabold">Booking</div>
                    </div>
                </div>
    
                <!-- UACAM logo (visible on phones) -->
                <div class="w-72 h-36">
                    <img src="../assets/img/UACAM_Logo.png">
                </div>
            </div>
            
            <!-- Engineering faculty logo -->
            <div class="flex flex-row items-center gap-x-4 mx-8">
                <div class="xl:w-36 xl:h-36 w-24 h-24">
                    <img src="../assets/img/FDI_Logo.png">
                </div>
                <div class="flex flex-col gap-y-2 items-center">
                    <div class="font-bold xl:text-6xl text-3xl text-sky-900">Engineering</div>
                    <div class="font-bold xl:text-6xl text-3xl text-sky-900">Faculty</div>
                </div>
            </div>

            <!-- Description -->
            <div class="max-w-3xl xl:text-2xl text-lg text-justify italic p-6 mx-12 border-gray-300 border-2 border-solid rounded-xl shadow-xl">
                With Your Booking, you can easily book spaces from the Faculty of Engineering, of the
                Autonomus University of Campeche. Manage your spaces and schedules in a convenient
                way, and edit them whenever you want, up to 24 hours before the booking date.
            </div>

            <!-- Book Now -->
            <Button :text="'Book now!'" :font-size="'2xl'"></Button>

            <!-- Engineering Faculty picture (bottom, visible on phones) -->
            <div class="md:hidden block w-full">
                <img src="../assets/img/Home_Horizontal.jpeg">
            </div>
        </div>
    </div>
</template>
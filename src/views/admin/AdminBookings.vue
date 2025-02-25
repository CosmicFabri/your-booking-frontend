<script setup>
import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import FullCalendar from '@/components/FullCalendar.vue';
import BookRow from '@/components/admin/BookRow.vue';

const bookings = [
    {
        number: 1,
        space: 'CIC-1',
        user: 'José Aguilar Canepa',
        schedule: '09:00 - 11:00',
    },
    {
        number: 2,
        space: 'CIC-2',
        user: 'Justino Ramírez Ortegón',
        schedule: '11:00 - 13:00',
    }
]
</script>

    <template>
        <div class="flex flex-row">
            <!-- Sidebar -->
            <AdminSidebar></AdminSidebar>

            <!-- Main view -->
            <div class="flex flex-col flex-1 px-24 pt-16 gap-y-8">

                <!-- Title -->
                <div class="text-3xl font-semibold">Reservas</div>

                <div class="flex flex-row flex-1 justify-center gap-x-16">
                    <!-- Bookings calendar -->
                    <div class="flex-2 min-w-[500px] max-w-[800px]">
                        <FullCalendar></FullCalendar>
                    </div>

                    <!-- Table showing the bookings of the date selected -->
                    <div class="flex flex-col">

                        <!-- Table header -->
                        <div class="flex flex-row bg-sky-300 text-gray-800 font-semibold border border-sky-600">
                            <div class="px-4 py-3 w-24 border-r border-sky-600 text-center">No. Reserva</div>
                            <div class="px-4 py-3 w-28 border-r border-sky-600 text-center">Espacio</div>
                            <div class="px-4 py-3 w-48 border-r border-sky-600 text-center">Usuario</div>
                            <div class="px-4 py-3 w-36 text-center">Horario</div>
                        </div>


                        <!-- Table contents -->
                        <BookRow
                            v-for="(booking, index) in bookings"
                            :key="booking.id"
                            :book-number="booking.number"
                            :book-space="booking.space"
                            :book-user="booking.user"
                            :book-schedule="booking.schedule"
                            :cell-width="32"
                            :index="index"
                        />
                    </div>
                </div>
            </div>
        </div>
    </template>
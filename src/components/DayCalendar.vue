<script>
import FullCalendar from '@fullcalendar/vue3'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'


export default {
    props: {
        spaceDisponibility: {
            type: Object,
            required: true,
            default : ['07:00', '21:00']
        }
    }, 
    components: {
        FullCalendar // make the <FullCalendar> tag available
    },
    data() {
        return {
            calendarOptions: {
                plugins: [timeGridPlugin, interactionPlugin],
                initialView: 'timeGridDay',
                selectable: true,
                dateClick: this.handleDateClick,
                weekends: false,
                headerToolbar: false,
                allDaySlot: false,
                slotMinTime: this.spaceDisponibility[0],
                slotMaxTime: this.spaceDisponibility[1],
                slotDuration: '01:00:00',
                slotEventOverlap: false,
                expandRows: true
            }
        }
    },
    methods: {
        handleDateClick: function(arg) {
            this.$emit('dateClick', arg.dateStr)
        }
    },
    emits: ['dateClick']
}
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>

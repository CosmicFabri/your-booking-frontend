<script>
import FullCalendar from '@fullcalendar/vue3'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es';

export default {
    props: {
        initialDate: {
            type: String,
            required: true
        },
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
                locale: esLocale,
                selectable: true,
                initialDate: this.initialDate,
                dateClick: this.handleDateClick,
                select: this.handleSelect,
                unselect: this.handleUnselct,
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
        },
        handleSelect: function(selectionInfo) {
            const start = selectionInfo.startStr.substring(11, 16)
            const end = selectionInfo.endStr.substring(11, 16)
            this.$emit('select', start, end)
        },
        handleUnselct: function(jsEvent, view) {
            this.$emit('unselect')
        }
    },
    watch: {
        // Observa el cambio en initialDate y actualiza la opción de fecha
        initialDate(newDate) {
            this.calendarOptions.initialDate = newDate;
        }
    },
    emits: ['dateClick', 'select', 'unselect']
}
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        weekends: false,
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

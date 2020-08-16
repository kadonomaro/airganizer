<template>
  <div class="home">
		<calendar-month-selector />
    <calendar-component />
  </div>
</template>

<script>
import CalendarMonthSelector from '@/components/Calendar/CalendarMonthSelector.vue';
import CalendarComponent from '@/components/Calendar/CalendarComponent.vue';

export default {
  name: 'Home',
  components: {
		CalendarMonthSelector,
    CalendarComponent
  }
}
</script>

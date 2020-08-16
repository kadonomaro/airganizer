<template>
  <div class="home">
    <calendar-component />
  </div>
</template>

<script>
import CalendarComponent from '@/components/Calendar/CalendarComponent.vue';

export default {
  name: 'Home',
  components: {
    CalendarComponent
  }
}
</script>

<template>
  <div class="home">
		<div class="container">
			<calendar-component />
		</div>
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

<style lang="scss">
	.home {
		flex-grow: 1;
	}
</style>

<template>
  <div class="home">
		<button @click="setActiveComponent('calendar')">Календарь</button>
		<button @click="setActiveComponent('task-list')">Список</button>
		<div class="container">
			<component :is="component" />
		</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CalendarComponent from '@/components/Calendar/CalendarComponent.vue';
import TaskListComponent from '@/components/TaskList/TaskListComponent.vue';

export default {
  name: 'Home',
  components: {
		CalendarComponent,
		TaskListComponent
	},
	methods: {
		setActiveComponent(name) {
			this.$store.dispatch('setActiveComponent', name);
		}
	},
	computed: {
		...mapGetters(['getActiveComponent']),
		component() {
			return this.getActiveComponent + '-component';
		}
	}
}
</script>

<style lang="scss">
	.home {
		flex-grow: 1;
	}
</style>

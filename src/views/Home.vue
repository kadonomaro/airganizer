<template>
  <div class="home">
		<div class="container">
			<v-button
				:icon="'calendar'"
				:title="'Календарь'"
				:width="40"
				@on-click="setActiveComponent('calendar')"
			/>
			<v-button
				:icon="'list'"
				:title="'Список'"
				:width="40"
				@on-click="setActiveComponent('task-list')"
			/>
			<component :is="component" />
		</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VButton from '@/components/blocks/VButton.vue';
import CalendarComponent from '@/components/Calendar/CalendarComponent.vue';
import TaskListComponent from '@/components/TaskList/TaskListComponent.vue';

export default {
  name: 'Home',
  components: {
		CalendarComponent,
		TaskListComponent,
		VButton
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

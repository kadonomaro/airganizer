<template>
  <div class="home">
		<div class="container">
			<v-toolbar />
			<keep-alive>
				<component :is="component" />
			</keep-alive>
		</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CalendarComponent from '@/components/Calendar/CalendarComponent.vue';
import TaskListComponent from '@/components/TaskList/TaskListComponent.vue';
import SettingsComponent from '@/components/Settings/SettingsComponent.vue';
import VToolbar from '@/components/blocks/VToolbar.vue';

export default {
  name: 'Home',
  components: {
		CalendarComponent,
		TaskListComponent,
		SettingsComponent,
		VToolbar
	},
	metaInfo: {
		title: 'Airganizer - управление личным временем',
		meta: [{
			vmid: 'description',
			name: 'description',
			content: 'Airganizer это система для управления личными задачами. Помогает правильно организовывать ваше время.',
		}]
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

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
import { mapState, mapGetters } from 'vuex';
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
	metaInfo() {
		return {
			title: this.getLocale.meta.index.title,
			meta: [{
				vmid: 'description',
				name: 'description',
				content: this.getLocale.meta.index.description,
			}]
		}
	},
	computed: {
		...mapState({
			component: state => state.component
		}),
		...mapGetters(['getLocale']),
		component() {
			return this.component + '-component';
		}
	}
}
</script>

<style lang="scss">
	.home {
		flex-grow: 1;
		background-image: url("~@/assets/images/cloud.svg");
		background-repeat: no-repeat;
		background-position: -10px 20px;
	}
</style>

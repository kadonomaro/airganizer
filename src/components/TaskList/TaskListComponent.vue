<template>
	<div class="task-list">
		<span class="task-list__title" @click="toggleAllExpand">{{ computeTitle }}</span>
		<div class="task-list__day" v-for="(day, key) in getDateByAllDays" :key="key">
			<task-list-day :day="day" :title="key" :all-expanded="isAllExpanded" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import TaskListDay from './TaskListDay';

export default {
	name: 'TaskListComponent',
	components: {
		TaskListDay
	},
	data() {
		return {
			isAllExpanded: true
		}
	},
	computed: {
		...mapGetters(['getDateByAllDays']),
		computeTitle() {
			if (this.isAllExpanded) {
				return 'Скрыть все';
			} else {
			return 'Показать все'
			}
		}
	},
	methods: {
		toggleAllExpand() {
			this.isAllExpanded = !this.isAllExpanded;
		}
	}
}
</script>

<style lang="scss">
.task-list {
	padding: 30px 0;
	&__title {
		display: inline-block;
		margin-bottom: 10px;
		font-size: 18px;
		cursor: pointer;
	}
	&__day {
		margin-bottom: 5px;
	}
}
</style>

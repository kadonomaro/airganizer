<template>
	<div class="task-list">
		<span
			class="task-list__title"
			v-if="Object.keys(getDateByAllDays).length"
			@click="toggleAllExpand"
		>{{ computeTitle }}</span>
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
		},
		isHidden() {
			return !!Object.keys(this.getDateByAllDays).length
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
	user-select: none;
	&__title {
		display: inline-block;
		margin-bottom: 10px;
		font-size: 18px;
		cursor: pointer;
	}
}
</style>

<template>
	<div class="task-list">
		<div class="task-list__day" v-for="(day, key) in getDateByAllDays" :key="key">
			<task-list-day :day="day" :title="key" />
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
	computed: {
		...mapGetters(['getDateByAllDays'])
	}
}
</script>

<style lang="scss">
.task-list {
	padding: 30px 0;

	&__day {
		margin-bottom: 15px;
	}
}
</style>

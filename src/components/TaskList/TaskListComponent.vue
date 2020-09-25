<template>
	<div class="task-list">
		<div class="task-list__day" v-for="(day, key) in getDateByAllDays" :key="key">
			<span class="task-list__title">{{ key }}</span>
			<ul class="task-list__list">
					<li class="task-list__item" v-for="task in day.data" :key="task.id">
						<calendar-tasks-item :day="{ value: key, editable: true }" :task="task" />
					</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import CalendarTasksItem from '../Calendar/CalendarTasksItem';

export default {
	name: 'TaskListComponent',
	components: {
		CalendarTasksItem
	},
	computed: {
		...mapGetters([
			'getDateByAllDays'
		])
	}
}
</script>

<style lang="scss">
	.task-list {
		padding: 30px 0;
		&__day {
			margin-bottom: 10px;
			padding: 10px;
			background-color: #ffffff;
		}
		&__title {
			display: block;
			margin-bottom: 5px;
		}
		&__list {
			margin: 0;
			padding: 0;
			list-style: none;
		}
		&__item {
			margin-bottom: 10px;
		}
	}
</style>

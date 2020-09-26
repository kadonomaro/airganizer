<template>
	<div class="task-list">
		<div class="task-list__day" v-for="(day, key) in getDateByAllDays" :key="key">
			<span class="task-list__title" v-if="day.data.length">{{ key }}</span>
			<ul class="task-list__list" v-if="day.data.length">
					<li class="task-list__item" v-for="task in day.data" :key="task.id">
						<calendar-tasks-item
							:day="{ value: key, editable: true }"
							:task="task"
							v-if="!task.completed || getSettings.showCompletedTasks"
						/>
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
			'getDateByAllDays',
			'getSettings'
		])
	}
}
</script>

<style lang="scss">
	.task-list {
		padding: 30px 0;
		&__day {
			margin-bottom: 10px;
		}
		&__title {
			display: block;
			margin-bottom: 5px;
			font-weight: bold;
		}
		&__list {
			margin: 0;
			padding: 20px 10px 15px;
			background-color: #ffffff;
			list-style: none;
		}
		&__item {
			&:not(:last-child) {
				margin-bottom: 10px;
			}
		}
	}
</style>

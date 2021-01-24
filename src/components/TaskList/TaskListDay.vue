<template>
	<div class="task-list-day">
		<span class="task-list-day__title" v-if="day.data.length">{{ title }}</span>
		<ul class="task-list-day__list" v-if="day.data.length">
			<li class="task-list-day__item" v-for="task in day.data" :key="task.id">
				<calendar-tasks-item
					:day="{ value: title, editable: true }"
					:task="task"
					v-if="!task.completed || settings.showCompletedTasks"
				/>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import CalendarTasksItem from '../Calendar/CalendarTasksItem';

export default {
	name: "TaskListDay",
	components: {
		CalendarTasksItem
	},
	props: {
		title: {
			type: String,
			required: true
		},
		day: {
			type: Object,
			required: true
		}
	},
	computed: {
		...mapState({
			settings: state => state.settings.settings
		})
	}
}
</script>

<style lang="scss">
.task-list-day {
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

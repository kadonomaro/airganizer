<template>
	<div class="calendar-tasks" v-if="day.value">
		<span class="calendar-tasks__title">{{ title }}</span>
		<ul class="calendar-tasks__list" v-if="tasks">
				<li class="calendar-tasks__item" v-for="task in tasks.data" :key="task.id">
					<calendar-tasks-item :day="day" :task="task" />
				</li>
		</ul>
		<calendar-form :day="day"/>
	</div>
</template>

<script>
import * as moment from 'moment';
import { mapGetters } from 'vuex';
import CalendarForm from './CalendarForm';
import CalendarTasksItem from './CalendarTasksItem';

export default {
	name: 'CalendarTasks',
	components: {
		CalendarForm,
		CalendarTasksItem
	},
	props: {
		day: {
			type: Object,
			required: true
		}
	},
	computed: {
		...mapGetters([
			'getDateByDay'
		]),
		tasks() {
			return this.getDateByDay(this.day.value);
		},
		title() {
			return moment(this.day.value, 'DD-MM-YYYY').format('DD MMMM YYYY');
		}
	}
}
</script>

<style lang="scss">
	.calendar-tasks {
		padding: 10px;
		background-color: #ffffff;
		&__title {
			display: block;
			margin-bottom: 10px;
			font-size: 18px;
			font-weight: bold;
			text-align: center;
		}
		&__list {
			margin: 0 0 20px;
			padding: 0;
			list-style: none;
		}
		&__item {
			margin-bottom: 5px;
			transition: all 0.3s ease-in;
		}
	}
</style>

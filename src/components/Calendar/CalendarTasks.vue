<template>
	<div class="calendar-tasks" v-if="day.value">
		<div class="calendar-tasks__head">
			<span class="calendar-tasks__title">{{ title }}</span>
		</div>
		<ul class="calendar-tasks__list" v-if="isVisible">
				<li class="calendar-tasks__item" v-for="task in tasks.data" :key="task.id">
					<calendar-tasks-item
						:day="day"
						:task="task"
						v-if="!task.completed || settings.showCompletedTasks"
					/>
				</li>
		</ul>
		<div class="calendar-tasks__form" v-if="day.editable">
			<calendar-form :day="day"/>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import { mapState, mapGetters } from 'vuex';
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
		...mapState({
			settings: state => state.settings.settings
		}),
		...mapGetters(['getDateByDay']),
		tasks() {
			return this.getDateByDay(this.day.value);
		},
		isVisible() {
			if (this.tasks?.data?.length) {
				const isAllCompleted = this.tasks.data.every(task => task.completed);
				if (isAllCompleted && this.settings.showCompletedTasks) {
					return true;
				} else if (!isAllCompleted) {
					return true;
				}
			}
			return false;
		},
		title() {
			return moment(this.day.value, 'DD-MM-YYYY').format('DD MMMM YYYY');
		}
	}
}
</script>

<style lang="scss">
	.calendar-tasks {
		&__head {
			margin-bottom: 10px;
			padding: 15px 10px;
			background-color: #ffffff;
		}
		&__title {
			display: block;
			font-size: 18px;
			font-weight: bold;
			text-align: center;
		}
		&__list {
			margin: 0 0 10px;
			padding: 15px 10px 10px;
			list-style: none;
			background-color: #ffffff;
		}
		&__form {
			padding: 15px 10px;
			background-color: #ffffff;
		}
		&__item {
			margin-bottom: 10px;
			transition: all 0.3s ease-in;
		}
	}
</style>

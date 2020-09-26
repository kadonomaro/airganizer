<template>
	<div class="calendar">
		<calendar-month-selector :date="date" @on-change-month="changeDate" />
		<calendar-table :date="date" @on-select-day="selectDay"/>
		<calendar-tasks :day="day"/>
	</div>
</template>

<script>
import CalendarMonthSelector from './CalendarMonthSelector.vue';
import CalendarTable from './CalendarTable.vue';
import CalendarTasks from './CalendarTasks.vue';
import moment from 'moment';

export default {
	name: 'CalendarComponent',
	components: {
		CalendarMonthSelector,
		CalendarTable,
		CalendarTasks
	},
	data() {
		return {
			date: null,
			day: {}
		}
	},
	created() {
		this.date = moment();
	},
	methods: {
		changeDate(payload) {
			this.date = payload;
		},
		selectDay(payload) {
			this.day = payload;
		}
	}
}
</script>

<style lang="scss">
	.calendar {
		padding: 30px 0;
		background-image: url("~@/assets/images/cloud.svg");
		background-repeat: no-repeat;
		background-position: right 10px;
	}
</style>

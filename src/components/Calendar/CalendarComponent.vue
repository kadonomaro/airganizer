<template>
	<div class="calendar">
		<div class="container">
			<calendar-month-selector :date="date" @on-change-month="changeDate" />
    	<calendar-table :date="date" @on-select-day="selectDay"/>
			<calendar-list :day="day"/>
		</div>
	</div>
</template>

<script>
import CalendarMonthSelector from './CalendarMonthSelector.vue';
import CalendarTable from './CalendarTable.vue';
import CalendarList from './CalendarList.vue';
import * as moment from 'moment';

export default {
	name: 'CalendarComponent',
	components: {
		CalendarMonthSelector,
		CalendarTable,
		CalendarList
	},
	data() {
		return {
			date: null,
			day: ''
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
		padding: 50px 0;
	}
</style>

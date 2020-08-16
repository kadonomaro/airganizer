<template>
	<div class="calendar">
		<div class="container">
			<calendar-month-selector :date="date" @on-change="changeDate" />
    	<calendar-table :date="date"/>
		</div>
	</div>
</template>

<script>
import CalendarMonthSelector from './CalendarMonthSelector.vue';
import CalendarTable from './CalendarTable.vue';
import * as moment from 'moment';

export default {
	name: 'CalendarComponent',
	components: {
		CalendarMonthSelector,
    CalendarTable
	},
	data() {
		return {
			date: null
		}
	},
	created() {
		this.date = moment();
	},
	methods: {
		changeDate(payload) {
			this.date = payload;
		}
	}
}
</script>

<style>

</style>

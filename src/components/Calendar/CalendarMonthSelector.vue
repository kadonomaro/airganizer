<template>
	<div class="month-selector">
		<button @click="prevMonth">Prev</button>
		<span>{{ month | format('MMMM YYYY') }}</span>
		<button @click="nextMonth">Next</button>
	</div>
</template>

<script>
import * as moment from 'moment';

export default {
	name: 'CalendarMonthSelector',
	data() {
		return {
			month: null
		}
	},
	created() {
		this.month = moment();
	},
	methods: {
		prevMonth() {
			this.month = moment(this.month).subtract(1, 'month');
		},
		nextMonth() {
			this.month = moment(this.month).add(1, 'month');
		}
	}
}
</script>

<style lang="scss">

</style>

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
	props: {
		date: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			month: null
		}
	},
	created() {
		this.month = moment(this.date);
	},
	methods: {
		changeMonth(direction) {
			this.month = moment(this.month).add(1, 'month');
			this.$emit('on-change', this.month);
		},
		prevMonth() {
			this.changeMonth(-1);
		},
		nextMonth() {
			this.changeMonth(1);
		}
	}
}
</script>

<style lang="scss">

</style>

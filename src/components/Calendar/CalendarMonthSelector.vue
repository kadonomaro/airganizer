<template>
	<div class="calendar-selector">
		<button @click="prevMonth">Prev</button>
		<span class="calendar-selector__value">{{ month | format('MMMM YYYY') }}</span>
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
			this.month = moment(this.month).add(direction, 'month');
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
	.calendar-selector {
		padding: 10px 0;
		&__value {
			display: inline-block;
			padding: 0 10px;
			min-width: 120px;
			text-transform: capitalize;
		}
	}
</style>

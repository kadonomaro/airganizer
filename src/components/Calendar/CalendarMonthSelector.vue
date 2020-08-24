<template>
	<div class="calendar-selector">
		<v-button :icon="'arrow-left'" @on-click="prevMonth" />
		<span class="calendar-selector__value">{{ month | format('MMMM YYYY') }}</span>
		<v-button :icon="'arrow-right'" @on-click="nextMonth" />
	</div>
</template>

<script>
import * as moment from 'moment';
import VButton from '../blocks/VButton';

export default {
	name: 'CalendarMonthSelector',
	components: {
		VButton
	},
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
			this.$emit('on-change-month', this.month);
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
		display: flex;
		justify-content: center;
		align-items: center;
		max-width: 240px;
		margin: 0 auto;
		padding: 10px 0;
		color: #4f4f4f;
		background-color: #fdfdfd;
		border: 1px solid #ebebeb;
		border-radius: 12px;
		&__value {
			display: inline-block;
			padding: 0 10px;
			min-width: 120px;
			text-align: center;
			text-transform: capitalize;
		}
	}
</style>

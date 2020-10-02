<template>
	<div class="calendar-selector">
		<v-button
			:title="getLocale.controls.prev"
			:icon="'arrow-left'"
			@on-click="prevMonth"
		/>
		<span class="calendar-selector__value">{{ month | format('MMMM YYYY') }}</span>
		<v-button
			:title="getLocale.controls.next"
			:icon="'arrow-right'"
			@on-click="nextMonth"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
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
	},
	computed: {
		...mapGetters(['getLocale'])
	}
}
</script>

<style lang="scss">
	.calendar-selector {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		padding: 10px;
		color: $color-text;
		background-color: $color-background;
		border: 1px solid $color-border;
		border-radius: $border-large-radius;
		&__value {
			display: inline-block;
			padding: 0 10px;
			min-width: 150px;
			font-size: 18px;
			font-weight: bold;
			text-align: center;
			text-transform: capitalize;
		}
	}


	@media (max-width: $size-mobile) {
		.calendar-selector {
			width: 100%;
			box-sizing: border-box;
		}
	}
</style>

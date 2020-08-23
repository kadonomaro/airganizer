<template>
	<div class="calendar-markers" v-if="markers">
		<ul class="calendar-markers__list">
			<li class="calendar-markers__item">
				{{ markers }}
			</li>
		</ul>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'CalendarDayMarker',
	props: {
		day: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			computedDay: null
		}
	},
	created() {
		this.computedDay = this.day.format('DD-MM-YY');
	},
	computed: {
		...mapGetters([
			'getDateByDay'
		]),
		markers() {
			return this.getDateByDay(this.computedDay)?.data.length
		}
	}
}
</script>

<style lang="scss">
	.calendar-markers {
		position: absolute;
		top: 3px;
		left: 3px;
		right: 3px;
		color: #ffffff;
		font-size: 14px;
		&__list {
			display: flex;
			justify-content: space-between;
			width: 100%;
			margin: 0;
			padding: 0;
			list-style: none;
		}
		&__item {
			width: 15px;
			height: 15px;
			padding: 2px;
			background-color: #00aa1c;
			border-radius: 50%;
		}
	}
</style>

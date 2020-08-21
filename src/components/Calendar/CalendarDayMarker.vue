<template>
	<div class="calendar-markers" v-if="marker">
		{{ marker }}
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
		marker() {
			return this.getDateByDay(this.computedDay)?.data.length
		}
	}
}
</script>

<style lang="scss">
	.calendar-markers {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		&__list {

		}
	}
</style>

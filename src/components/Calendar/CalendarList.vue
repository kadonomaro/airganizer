<template>
	<div class="calendar-list" v-if="day">
		{{ list }}
		<calendar-form :storageKey="day"/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import CalendarForm from './CalendarForm';

export default {
	name: 'CalendarList',
	components: {
		CalendarForm
	},
	props: {
		day: {
			type: String,
			required: true
		}
	},
	computed: {
		...mapGetters([
			'getDateByDay'
		]),
		list() {
			return this.getDateByDay(this.day)
		}
	}
}
</script>

<style>

</style>

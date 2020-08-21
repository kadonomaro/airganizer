<template>
	<div class="calendar-list" v-if="day">
		<ul v-if="list">
			<li v-for="(item, index) in list.data" :key="index">
				{{ item }}
			</li>
		</ul>
		<calendar-form :day="day"/>
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

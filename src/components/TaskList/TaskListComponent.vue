<template>
	<div class="task-list">
		<div class="day" v-for="(day, key, index) in getDateByAllDays" :key="index">
			{{ key }}
			{{ day }}
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'TaskListComponent',
	created() {
		this.$store.dispatch('fetchData');
	},
	computed: {
		...mapGetters([
			'getDateByAllDays'
		])
	}
}
</script>

<style>

</style>

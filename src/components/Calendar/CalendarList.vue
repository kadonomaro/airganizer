<template>
	<div class="calendar-list" v-if="day">
		{{day}}
	</div>
</template>

<script>
export default {
	name: 'CalendarList',
	props: {
		day: {
			type: String,
			required: true
		}
	}
}
</script>

<style>

</style>

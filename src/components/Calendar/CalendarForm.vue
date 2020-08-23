<template>
	<div class="calendar-form">
		<form action="" class="calendar-form__form" @submit.prevent="onSubmit">
			<input type="text" class="calendar-form__field" v-model="form.title">
			<button class="calendar-form__button button">Добавить</button>
		</form>
	</div>
</template>

<script>

export default {
	name: 'CalendarForm',
	props: {
		day: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			form: {
				title: ''
			}
		}
	},
	methods: {
		onSubmit() {
			if (this.form.title) {
				const data = {
					id: Date.now().toString(),
					title: this.form.title,
					priority: 'low'
				}
				this.$store.dispatch('addData', [this.day, data]);
				this.form.title = '';
			}
		}
	}
}
</script>

<style>

</style>

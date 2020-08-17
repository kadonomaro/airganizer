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
		storageKey: {
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
			console.log({
				title: this.storageKey,
				data: this.form.title
			});
			this.form.title = '';
		}
	}
}
</script>

<style>

</style>

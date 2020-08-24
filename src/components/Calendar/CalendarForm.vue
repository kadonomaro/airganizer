<template>
	<div class="calendar-form">
		<form action="" class="calendar-form__form" @submit.prevent="onSubmit">
			<input type="text" class="calendar-form__field" v-model="form.title">
			<v-button>Добавить</v-button>
		</form>
	</div>
</template>

<script>
import VButton from '../blocks/VButton';

export default {
	name: 'CalendarForm',
	components: {
		VButton
	},
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
					id: (+new Date).toString(36),
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

<template>
	<div class="calendar-form" v-if="day.editable">
		<form action="" class="calendar-form__form" @submit.prevent="onSubmit">
			<input type="text" class="calendar-form__field input" v-model="form.title" placeholder="Введите название">
			<v-button class="calendar-form__button">Добавить</v-button>
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
			type: Object,
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
				this.$store.dispatch('addData', [this.day.value, data]);
				this.form.title = '';
			}
		}
	}
}
</script>

<style lang="scss">
	.calendar-form {
		&__field {
			width: 360px;
			max-width: 100%;
		}
		&__button {
			margin-left: 5px;
		}
	}
</style>

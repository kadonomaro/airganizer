<template>
	<div class="calendar-form" v-if="day.editable">
		<form action="" class="calendar-form__form" @submit.prevent="onSubmit">
			<input type="text" class="calendar-form__field input" v-model="form.title" placeholder="Введите название">
			<textarea type="text" class="calendar-form__field input" v-model="form.desc" placeholder="Описание"></textarea>
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
				title: '',
				desc: ''
			}
		}
	},
	methods: {
		onSubmit() {
			if (this.form.title) {
				const task = {
					id: (+new Date).toString(36),
					title: this.form.title,
					desc: this.form.desc,
					priority: 'low'
				}
				this.$store.dispatch('addTask', {
					day: this.day.value,
					value: task
				});
				this.clear();
			}
		},
		clear() {
			this.form.title = '';
			this.form.desc = '';
		}
	}
}
</script>

<style lang="scss">
	.calendar-form {
		display: flex;
		min-width: 400px;
		&__field {
			width: 100%;
			max-width: 100%;
			min-height: 20px;
			margin-bottom: 10px;
			resize: vertical;
		}
	}
</style>

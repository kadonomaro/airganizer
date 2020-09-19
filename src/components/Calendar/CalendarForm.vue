<template>
	<div class="calendar-form" v-if="day.editable">
		<form action="" class="calendar-form__form" @submit.prevent="onSubmit">
			<input type="text" class="calendar-form__field input" v-model="form.title" placeholder="Введите название">
			<textarea type="text" class="calendar-form__field input" v-model="form.desc" placeholder="Описание"></textarea>
			<div class="calendar-form__field">
				<v-timepicker @on-select-time="selectTime" :time="form.time"/>
			</div>
			<v-button class="calendar-form__button">Добавить</v-button>
		</form>
	</div>
</template>

<script>
import VButton from '../blocks/VButton';
import VTimepicker from '../blocks/VTimepicker';

export default {
	name: 'CalendarForm',
	components: {
		VButton,
		VTimepicker
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
				desc: '',
				time: ''
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
					time: this.form.time,
					priority: 'low',
					completed: false
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
			this.form.time = '';
		},

		selectTime(payload) {
			this.form.time = payload.hour + ':' + payload.minute;
		}
	}
}
</script>

<style lang="scss">
	.calendar-form {
		display: flex;
		width: 400px;
		max-width: 100%;
		&__field {
			width: 100%;
			max-width: 100%;
			min-height: 20px;
			margin-bottom: 10px;
			resize: vertical;
		}
	}


	@media (max-width: $size-mobile) {
		.calendar-form {
			width: 100%;
			&__form {
				width: inherit;
			}
		}
	}
</style>

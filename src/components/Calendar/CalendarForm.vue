<template>
	<div class="calendar-form" v-if="day.editable">
		<form action="" class="calendar-form__form" @submit.prevent="onSubmit">
			<input
				type="text"
				class="calendar-form__field input"
				v-model="form.title"
				:placeholder="getLocale.form.title"
			>
			<textarea
				type="text"
				class="calendar-form__field input"
				v-model="form.desc"
				:placeholder="getLocale.form.description"
			></textarea>
			<div class="calendar-form__field">
				<v-timepicker @on-select-time="selectTime" :time="form.time"/>
			</div>
			<v-button class="calendar-form__button">{{ getLocale.controls.add }}</v-button>
		</form>
	</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
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
				time: {
					hour: '',
					minute: ''
				}
			}
		}
	},
	methods: {
		...mapActions(['addTask']),
		onSubmit() {
			if (this.form.title) {
				const task = {
					id: (+new Date).toString(36),
					title: this.form.title,
					desc: this.form.desc,
					time: {
						hour: this.form.time.hour,
						minute: this.form.time.minute
					},
					priority: 'low',
					completed: false
				}
				this.addTask({ day: this.day.value, value: task });
				this.clear();
			}
		},

		clear() {
			this.form.title = '';
			this.form.desc = '';
			this.form.time = { hour: '', minute: '' }
		},

		selectTime(payload) {
			this.form.time = payload;
		}
	},
	computed: {
		...mapGetters(['getLocale'])
	}
}
</script>

<style lang="scss">
	.calendar-form {
		display: flex;
		width: 400px;
		max-width: 100%;
		&__form {
			width: 100%;
		}
		&__field {
			display: block;
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

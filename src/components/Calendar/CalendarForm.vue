<template>
	<div class="calendar-form">
		<form action="" class="calendar-form__form" @submit.prevent="onSubmit">
			<input type="text" class="calendar-form__field" v-model="form.title">
			<button class="calendar-form__button button">Добавить</button>
		</form>
	</div>
</template>

<script>
import { LocalStorage } from '@/libs/LocalStorage';

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
			storage: null,
			form: {
				title: ''
			}
		}
	},
	created() {
		this.storage = new LocalStorage('dates');
	},
	methods: {
		onSubmit() {
			// this.storage.save(this.form.title);
			this.storage.save({
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

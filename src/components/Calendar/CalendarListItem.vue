<template>
	<div class="calendar-item">
		<span class="calendar-item__title">{{ task.title }}</span>
		<div class="calendar-item__desc" v-if="task.desc">
			<p>{{ task.desc }}</p>
		</div>
		<v-button
			class="calendar-item__button"
			:icon="task.priority === 'high' ? 'high-priority' : 'low-priority'"
			:title="'Изменить приоритет'"
			@on-click="changePriority(task)"
			v-if="day.editable"
		/>
		<v-button
			class="calendar-item__button"
			:icon="'close'"
			:title="'Удалить'"
			@on-click="removeTask(task)"
		/>
	</div>
</template>

<script>
import VButton from '../blocks/VButton';

export default {
	name: 'CalendarListItem',
	components: {
		VButton
	},
	props: {
		task: {
			type: Object,
			required: true
		},
		day: {
			type: Object,
			required: true
		},
	},
	methods: {
		removeTask(task) {
			this.$store.dispatch('removeTask', {
				day: this.day.value,
				task
			});
		},

		changePriority(task) {
			this.$store.dispatch('changePriority', {
				day: this.day.value,
				task
			});
		}
	},
}
</script>

<style>

</style>

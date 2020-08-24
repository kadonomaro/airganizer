<template>
	<div class="calendar-list" v-if="day">
		<ul class="calendar-list__list" v-if="tasks">
			<li class="calendar-list__item" v-for="task in tasks.data" :key="task.id">
				<div class="calendar-item" :class="{'calendar-item--important': task.priority === 'high'}">
					<span class="calendar-item__title">{{ task.title }}</span>
					<v-button
						class="calendar-item__button"
						:icon="'switch'"
						:title="'Изменить тип'"
						@on-click="changePriority(task)"
					/>
					<v-button
						class="calendar-item__button"
						:icon="'close'"
						:title="'Удалить'"
						@on-click="removeTask(task)"
					/>
				</div>
			</li>
		</ul>
		<calendar-form :day="day"/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import CalendarForm from './CalendarForm';
import VButton from '../blocks/VButton';

export default {
	name: 'CalendarList',
	components: {
		CalendarForm,
		VButton
	},
	props: {
		day: {
			type: String,
			required: true
		}
	},
	methods: {
		removeTask(task) {
			this.$store.dispatch('removeTask', [this.day, task]);
		},

		changePriority(task) {
			this.$store.dispatch('changePriority', [this.day, task]);
		}
	},
	computed: {
		...mapGetters([
			'getDateByDay'
		]),
		tasks() {
			return this.getDateByDay(this.day);
		}
	}
}
</script>

<style lang="scss">
	.calendar-list {
		padding: 10px 0;
		&__list {
			margin: 0;
			padding: 0;
			list-style: none;
		}
		&__item {
			margin-bottom: 5px;
		}
	}

	.calendar-item {
		display: flex;
		align-items: center;
		padding: 10px 15px;
		color: $color-text;
		background-color: $color-background;
		border: 1px solid $color-border;
		border-radius: $border-large-radius;
		&__title {
			display: block;
			margin-right: auto;
		}
		&__button {
			margin-left: 5px;
		}
	}
	.calendar-item--important {
		position: relative;
		&::before {
			content: '';
			position: absolute;
			top: -10px;
			left: -5px;
			width: 25px;
			height: 25px;
			background-image: url('~@/assets/icons/hot.svg');
		}
	}
</style>

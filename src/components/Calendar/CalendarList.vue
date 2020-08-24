<template>
	<div class="calendar-list" v-if="day">
		<ul class="calendar-list__list" v-if="tasks">
			<li class="calendar-list__item" v-for="task in tasks.data" :key="task.id">
				<div class="calendar-item">
					<span class="calendar-item__title">{{ task.title }}</span>
					<v-button class="calendar-item__button" :icon="'switch'" @on-click="changePriority(task)" />
					<v-button class="calendar-item__button" :icon="'close'" @on-click="removeItem(task)" />
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
		removeItem(task) {
			this.$store.dispatch('removeItem', [this.day, task]);
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
		padding: 20px 0;
		&__list {
			margin: 0;
			padding: 0;
			list-style: none;
		}
		&__item {
			margin-bottom: 15px;
		}
	}

	.calendar-item {
		display: flex;
		align-items: center;
		padding: 15px 20px;
		background-color: #ffffff;
		border-radius: 10px;
		box-shadow: 0 10px 20px rgba($color: #d53636, $alpha: 0.15);
		&__title {
			display: block;
			margin-right: auto;
		}
		&__button {
			margin-left: 5px;
		}

	}
</style>

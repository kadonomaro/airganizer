<template>
	<div class="calendar-list" v-if="day">
		<ul class="calendar-list__list" v-if="tasks">
			<li class="calendar-list__item" v-for="task in tasks.data" :key="task.id">
				<div class="calendar-item">
					<span class="calendar-item__title">{{ task.title }}</span>
					<button class="calendar-item__button" @click="changePriority(task)">V</button>
					<button class="calendar-item__button" @click="removeItem(task)">X</button>
				</div>
			</li>
		</ul>
		<calendar-form :day="day"/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import CalendarForm from './CalendarForm';

export default {
	name: 'CalendarList',
	components: {
		CalendarForm
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
			margin-bottom: 5px;
		}
	}

	.calendar-item {
		display: flex;
		align-items: center;
		padding: 5px 10px;
		background-color: #3baeda;
		&__title {
			display: block;
			margin-right: auto;
		}
		&__button {
			margin-left: 5px;
		}
	}
</style>

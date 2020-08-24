<template>
	<div class="calendar-list" v-if="day">
		<ul class="calendar-list__list" v-if="tasks">
			<li class="calendar-list__item" v-for="task in tasks.data" :key="task.id">
				<div class="calendar-item">
					<span class="calendar-item__title">{{ task.title }}</span>
					<button class="calendar-item__button calendar-item__button--switch" @click="changePriority(task)"></button>
					<button class="calendar-item__button" @click="removeItem(task)"></button>
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
			width: 30px;
			height: 30px;
			background-color: #f1e4e4;
			background-image: url("data:image/svg+xml,%3Csvg width='14' height='14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 1l-1-1-6 6-6-6-1 1 6 6-6 6 1 1 6-6 6 6 1-1-6-6 6-6z' fill='%23CC8E8E'/%3E%3C/svg%3E");
			background-repeat: no-repeat;
			background-position: center;
			background-size: 15px;
			border: none;
			border-radius: 50%;
			cursor: pointer;
			transition: background-color 0.1s ease-in;
			&:hover {
				background-color: darken($color: #f1e4e4, $amount: 5%);
			}
		}
		&__button--switch {
			background-image: url("data:image/svg+xml,%3Csvg viewBox='-16 -18 533.3 533' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M248 25c40 0 79 11 114 32 23 14 43 31 60 50l-59-2a12 12 0 10-1 25l81 3a13 13 0 0017-16l-3-82a13 13 0 10-25 1l1 47A247 247 0 00248 0C178 0 114 29 67 81 25 128 0 190 0 249a12 12 0 1025 0c0-53 23-109 60-151 43-47 101-73 163-73zm0 0M488 236c-7 0-13 6-13 13 0 52-23 108-60 150a217 217 0 01-277 41c-23-14-43-31-60-50l59 2a13 13 0 001-25l-81-3a13 13 0 00-17 16l3 82a13 13 0 0025-1l-1-47a247 247 0 00185 83c70 0 134-29 181-81 42-47 67-109 67-167 0-7-6-13-12-13zm0 0'/%3E%3C/svg%3E");
		}
	}
</style>

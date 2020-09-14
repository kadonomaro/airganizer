<template>
	<div class="calendar-list" v-if="day.value">
		<span class="calendar-list__title">{{ title }}</span>
		<ul class="calendar-list__list" v-if="tasks">
				<li class="calendar-list__item" v-for="task in tasks.data" :key="task.id">
					<calendar-list-item :day="day" :task="task" />
				</li>
		</ul>
		<calendar-form :day="day"/>
	</div>
</template>

<script>
import * as moment from 'moment';
import { mapGetters } from 'vuex';
import CalendarForm from './CalendarForm';
import CalendarListItem from './CalendarListItem';

export default {
	name: 'CalendarList',
	components: {
		CalendarForm,
		CalendarListItem
	},
	props: {
		day: {
			type: Object,
			required: true
		}
	},
	computed: {
		...mapGetters([
			'getDateByDay'
		]),
		tasks() {
			return this.getDateByDay(this.day.value);
		},
		title() {
			return moment(this.day.value, 'DD-MM-YYYY').format('DD MMMM YYYY');
		}
	}
}
</script>

<style lang="scss">
	.calendar-list {
		padding: 10px;
		background-color: #ffffff;
		&__title {
			display: block;
			margin-bottom: 10px;
			font-size: 18px;
			font-weight: bold;
			text-align: center;
		}
		&__list {
			margin: 0 0 20px;
			padding: 0;
			list-style: none;
		}
		&__item {
			margin-bottom: 5px;
			transition: all 0.3s ease-in;
		}
	}

	.calendar-item {
		display: flex;
		align-items: center;
		padding: 6px 12px;
		color: $color-text;
		font-size: 18px;
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

</style>

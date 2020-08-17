<template>
		<table class="calendar-table">
			<tbody>
				<tr class="calendar-table__week calendar-table__week--head">
					<th v-for="header in weekHeaders" :key="header">{{ header }}</th>
				</tr>
				<tr class="calendar-table__week" v-for="(week, index) in calendar" :key="index">
					<td class="calendar-table__day"
						:class="{
							'calendar-table__day--active': day.active,
							'calendar-table__day--disabled' : day.disabled
						}"
						v-for="(day, index) in week.days"
						:key="index"
						@click="selectDay(day)"
					>
						{{ day.value | format('DD') }}
					</td>
				</tr>
			</tbody>
		</table>
</template>

<script>
import * as moment from 'moment';

export default {
	name: 'CalendarTable',
	props: {
		date: {
			type: Object,
			required: true
		}
	},
	methods: {
		selectDay(day) {
			this.$emit('on-select-day', day.value.format('DD-MM-YY'))
		}
	},
	computed: {
		calendar() {
			const calendar = [];
			const startDay = moment(this.date).clone().startOf('month').startOf('week');
			const endDay = moment(this.date).clone().endOf('month').endOf('week');
			const date = startDay.clone().subtract(1, 'day');

			while (date.isBefore(endDay, 'day')) {
				calendar.push({
					days: Array(7)
						.fill(0)
						.map(() => {
							const value = date.add(1, 'day').clone()
							return {
								value,
								active: moment().isSame(value, 'date'),
								disabled: !moment().isSame(value, 'month'),
								selected: moment().isSame(value, 'date')
							}
						})
				})
			}
			return calendar;
		},
		weekHeaders() {
			return ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
		}
	}
}
</script>

<style lang="scss">
	.calendar-table {
		td, th {
			padding: 10px 15px;
		}
		width: 100%;
		border-collapse: collapse;
		&__week {
			border-bottom: 1px solid #e7e7e7;
		}
		&__week--head {
			color: #ffffff;
			background-color: #3baeda;
			th {
				padding: 10px 15px;
				border: none;
			}
		}
		&__day {
			&:hover {
				background-color: rgba($color: #e7e7e7, $alpha: 0.7);
				cursor: pointer;
			}
		}
		&__day--active {
			font-weight: bold;
			background-color: rgba($color: #f90, $alpha: 0.5);
		}
		&__day--disabled {
			color: #b1b1b1;
		}
	}
</style>

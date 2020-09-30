<template>
	<div class="calendar-table-wrapper">
		<table class="calendar-table">
			<thead>
				<tr class="calendar-table__week calendar-table__week--head">
					<th v-for="header in weekHeaders" :key="header">{{ header }}</th>
				</tr>
			</thead>
			<tbody>
				<tr class="calendar-table__week" v-for="(week, index) in calendar" :key="index">
					<td class="calendar-table__day"
						:class="{
							'calendar-table__day--active': day.active,
							'calendar-table__day--disabled': day.disabled,
							'calendar-table__day--selected': selectedDay.value === day.value
						}"
						v-for="(day, index) in week.days"
						:key="index"
						@click="selectDay(day)"
					>
						<calendar-day-marker :day="day.value"/>
						<span>{{ day.value | format('DD') }}</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import moment from 'moment';
import CalendarDayMarker from './CalendarDayMarker';

export default {
	name: 'CalendarTable',
	components: {
		CalendarDayMarker
	},
	props: {
		date: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			selectedDay: {
				value: null
			}
		}
	},
	methods: {
		selectDay(day) {
			this.selectedDay = day;
			this.$emit('on-select-day', {
				value: day.value.format('DD-MM-YYYY'),
				editable: day.editable
			});
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
								editable: moment().isSameOrBefore(value, 'day')
							}
						})
				});
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
	.calendar-table-wrapper {
		padding: 10px 0;
		overflow-x: auto;
	}
	.calendar-table {
		max-width: 100%;
		width: 100%;
		text-align: right;
		border: 1px solid #eff3f9;
		border-collapse: collapse;
		td, th {
			min-width: 50px;
			padding: 10px 15px;
			border: 1px solid #eff3f9;
		}
		&__week--head {
			color: #ffffff;
			background-color: $color-background-dark;
			th {
				padding: 10px 15px;
				border: none;
			}
		}
		&__day {
			position: relative;
			font-size: 18px;
			background-color: $color-background;
			cursor: pointer;
			transition: background-color, box-shadow 0.1s ease-in;
			&:hover {
				background-color: $color-hover;
				box-shadow: 0 0 7px rgba(#000000, 0.1);
			}
		}
		&__day--active {
			background-color: rgba($color: $color-brand, $alpha: 0.5);
		}
		&__day--selected {
			box-shadow: 0 0 0 2px $color-text inset;
			&:hover {
				background-color: $color-hover;
				box-shadow: 0 0 7px rgba(#000000, 0.1), 0 0 0 2px $color-text inset;
			}
		}
		&__day--disabled {
			color: #b1b1b1;
		}
	}


	@media (max-width: $size-mobile) {
		.calendar-table {
			td, th {
				padding: 15px 10px 5px;
			}
			&__day {

				font-size: 16px;
			}
		}
	}
</style>

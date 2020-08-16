<template>
	<div class="calendar">
		CalendarComponent
		<table class="calendar__table">
			<tbody>
				<tr class="calendar__week" v-for="(week, index) in calendar" :key="index">
					<td class="calendar__day"
						:class="{
							'calendar__day--active': day.active,
							'calendar__day--disabled' : day.disabled
							}"
						v-for="(day, index) in week.days"
						:key="index"
					>
						{{ day.value | format('ddd DD MMMM') }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import * as moment from 'moment';

export default {
	name: 'CalendarComponent',
	created() {
		this.momentInit();
	},
	methods: {
		momentInit() {
			moment.updateLocale('ru', {
				week: {
					dow: 1
				}
			});
		}
	},
	computed: {
		calendar() {
			const calendar = [];
			const startDay = moment().clone().startOf('month').startOf('week');
			const endDay = moment().clone().endOf('month').endOf('week');

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
								disabled: !moment().isSame(value, 'month')
							}
						})
				})
			}
			console.log(calendar);
			return calendar;
		}
	}
}
</script>

<style lang="scss">
	.calendar {
		&__table {
			border-collapse: collapse;
		}
		&__week {

		}
		&__day {
			padding: 10px 15px;
			border: 1px solid #707070;
		}
		&__day--active {
			background-color: rgba($color: #f90, $alpha: 0.5);
		}
		&__day--disabled {
			opacity: 0.5;
		}
	}
</style>

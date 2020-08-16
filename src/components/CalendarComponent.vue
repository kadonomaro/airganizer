<template>
	<div class="calendar">
		CalendarComponent
		<table class="calendar__table">
			<tbody>
				<tr class="calendar__week" v-for="week in month" :key="week.week">
					<td class="calendar__day" v-for="(day, index) in week.days" :key="index">
						{{ day.value }}
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
	computed: {
		month() {
			const startWeek = moment().startOf('month').week();
			const endWeek = moment().endOf('month').week();
			const calendar = []

			for(let week = startWeek; week < endWeek; week++){
				calendar.push({
					week: week,
					days: Array(7).fill(0).map((day, index) => {
						return {
							value: moment().week(week).startOf('week').clone().add(day + index, 'day').format('ddd DD MMM')
						};
					})
				});
			}
			console.log(calendar);
			return calendar
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
	}
</style>

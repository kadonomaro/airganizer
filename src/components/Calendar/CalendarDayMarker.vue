<template>
	<div class="calendar-markers">
		<ul class="calendar-markers__list">
			<li
				class="calendar-markers__item"
				v-for="marker in markers"
				:key="marker.type"
			>
				<span
					class="calendar-markers__marker"
					:class="{
						'calendar-markers__marker--high': marker.type === 'high',
						'calendar-markers__marker--active': marker.type === 'active',
						'calendar-markers__marker--completed': marker.type === 'completed',
					}"
					v-if="marker.count"
				>{{ marker.count }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'CalendarDayMarker',
	props: {
		day: {
			type: Object,
			required: true
		}
	},
	computed: {
		...mapGetters([
			'getDayTasksMarkers'
		]),

		markers() {
			return this.getDayTasksMarkers(this.day.format('DD-MM-YYYY'));
		}
	}
}
</script>

<style lang="scss">
	.calendar-markers {
		position: absolute;
		top: 50%;
		left: 5px;
		right: 5px;
		color: #ffffff;
		font-size: 14px;
		text-align: center;
		transform: translateY(-50%);
		&__list {
			display: flex;
			width: 100%;
			margin: 0;
			padding: 0;
			list-style: none;
		}
		&__marker {
			display: block;
			width: 20px;
			height: 20px;
			margin-right: 2px;
			padding: 2px;
			line-height: 20px;
			background-size: cover;
			border-radius: 50%;
		}
		&__marker--active {
			background-color: #00aa1c;
		}
		&__marker--high {
			background-image: url('~@/assets/icons/fire.svg');
		}
		&__marker--completed {
			background-color: $color-text;
		}
	}
</style>

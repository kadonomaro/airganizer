<template>
	<div class="calendar-markers">
		<ul class="calendar-markers__list">
			<li
				class="calendar-markers__item"
				v-for="item in priority"
				:key="item.type"
			>
				<span
					class="calendar-markers__marker"
					:class="{'calendar-markers__marker--high': item.type === 'high'}"
					v-if="item.count"
				>{{ item.count }}</span>
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
			'getDayTasksPriority'
		]),

		priority() {
			return this.getDayTasksPriority(this.day.format('DD-MM-YY'));
		}
	}
}
</script>

<style lang="scss">
	.calendar-markers {
		position: absolute;
		top: 3px;
		left: 5px;
		right: 5px;
		color: #ffffff;
		font-size: 14px;
		font-weight: normal;
		&__list {
			display: flex;
			justify-content: space-between;
			width: 100%;
			margin: 0;
			padding: 0;
			list-style: none;
		}
		&__marker {
			display: block;
			width: 20px;
			height: 20px;
			padding: 2px;
			line-height: 20px;
			background-color: #00aa1c;
			border-radius: 50%;
		}
		&__marker--high {
			background-color: transparent;
			background-image: url('~@/assets/icons/hot.svg');
		}
	}
</style>

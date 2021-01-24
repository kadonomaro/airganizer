<template>
	<div class="task-list-day">
		<span
			class="task-list-day__title"
			:class="{ 'task-list-day__title--opened': isExpanded }"
			v-if="day.data.length"
			@click="toggleExpand"
		>{{ title }}</span>
		<ul class="task-list-day__list" v-if="day.data.length" v-show="isExpanded">
			<li class="task-list-day__item" v-for="task in day.data" :key="task.id">
				<calendar-tasks-item
					:day="{ value: title, editable: true }"
					:task="task"
					v-if="!task.completed || settings.showCompletedTasks"
				/>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import CalendarTasksItem from '../Calendar/CalendarTasksItem';

export default {
	name: "TaskListDay",
	components: {
		CalendarTasksItem
	},
	props: {
		allExpanded: {
			type: Boolean,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		day: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			isExpanded: true
		}
	},
	computed: {
		...mapState({
			settings: state => state.settings.settings
		})
	},
	methods: {
		toggleExpand() {
			this.isExpanded = !this.isExpanded;
		}
	},
	watch: {
		allExpanded(value) {
			this.isExpanded = value;
		}
	}
}
</script>

<style lang="scss">
.task-list-day {
	&__title {
		position: relative;
		display: inline-block;
		padding: 6px 3px;
		font-weight: bold;
		cursor: pointer;
		transition: color 0.1s ease-in;
		&::before {
			content: '';
			position: absolute;
			top: 12.5px;
			right: -10px;
			border-style: solid;
			border-width: 5px 0 5px 7px;
			border-color: transparent transparent transparent $color-text;
			transition: transform 0.1s ease-in, border-color 0.1s ease-in;
		}
	}
	&__title--opened {
		color: $color-brand;
		&::before {
			border-color: transparent transparent transparent $color-brand;
			transform: rotate(90deg);
		}
	}

	&__list {
		margin: 0;
		padding: 20px 10px 15px;
		background-color: #ffffff;
		list-style: none;
	}

	&__item {
		&:not(:last-child) {
			margin-bottom: 10px;
		}
	}
}
</style>

<template>
	<div class="calendar-item" :class="{'calendar-item--completed': task.completed}">
		<div
			class="calendar-item__head"
			:class="{
				'calendar-item__head--clickable': task.desc,
				'calendar-item__head--opened' : isOpened
				}"
			@click="toggle"
		>
			<span class="calendar-item__title">{{ task.title }}</span>
			<span class="calendar-item__time" v-if="task.time">{{ task.time }}</span>
			<div class="calendar-item__controls">
				<v-button
					class="calendar-item__button"
					:icon="'check'"
					:title="'Завершить'"
					@on-click="completeTask(task)"
				/>
				<v-button
					class="calendar-item__button"
					:icon="task.priority === 'high' ? 'high-priority' : 'low-priority'"
					:title="'Изменить приоритет'"
					@on-click="changePriority(task)"
					v-if="day.editable"
				/>
				<v-button
					class="calendar-item__button"
					:icon="'close'"
					:title="'Удалить'"
					@on-click="openModalHandler"
				/>
			</div>
		</div>
		<div class="calendar-item__desc" v-if="task.desc && isOpened">
			<p>{{ task.desc }}</p>
		</div>

		<v-modal v-if="isModalVisible" @close="closeModalHandler">
      <template v-slot:header>
        <span>Удаление</span>
      </template>
      <template v-slot:body>
        <p>Вы действительно хотите удалить «{{ task.title }}»?</p>
      </template>
			<template v-slot:footer>
        <v-button
					style="margin-right:5px;"
					@on-click="closeModalHandler"
				>Отменить</v-button>
				<v-button
					@on-click="removeTask(task)"
				>Удалить</v-button>
      </template>
    </v-modal>

	</div>
</template>

<script>
import VButton from '../blocks/VButton.vue';
import VModal from '../blocks/VModal';

export default {
	name: 'CalendarTasksItem',
	components: {
		VButton,
		VModal
	},
	props: {
		task: {
			type: Object,
			required: true
		},
		day: {
			type: Object,
			required: true
		},
	},
	data() {
		return {
			isOpened: false,
			isModalVisible: false
		}
	},
	methods: {
		toggle () {
			this.isOpened = !this.isOpened;
		},

		completeTask(task) {
			this.$store.dispatch('completeTask', {
				day: this.day.value,
				task
			});
		},

		removeTask(task) {
			this.$store.dispatch('removeTask', {
				day: this.day.value,
				task
			});
		},

		changePriority(task) {
			this.$store.dispatch('changePriority', {
				day: this.day.value,
				task
			});
		},
		openModalHandler() {
			this.isModalVisible = true;
		},

		closeModalHandler() {
			this.isModalVisible = false;
		}
	},
}
</script>

<style lang="scss">
	.calendar-item {
		&__head {
			position: relative;
			z-index: 9;
			display: flex;
			align-items: center;
			padding: 6px 12px;
			color: $color-text;
			font-size: 18px;
			background-color: $color-background;
			border: 1px solid $color-border;
			border-radius: $border-large-radius;
		}
		&__head--clickable {
			padding-left: 25px;
			cursor: pointer;
			&::before {
				position: absolute;
				left: 10px;
				content: '';
				border-style: solid;
				border-width: 5px 0 5px 7px;
				border-color: transparent transparent transparent $color-text;
				transition: transform 0.1s ease-in, border-color 0.1s ease-in;
			}
		}
		&__head--opened {
			&::before {
				border-color: transparent transparent transparent $color-brand;
				transform: rotate(90deg);
			}
		}
		&__title {
			display: block;
			margin-right: auto;
		}
		&__time {
			position: absolute;
			top: 0;
			left: 9px;
			display: block;
			padding: 0 3px;
			font-size: 14px;
			font-weight: bold;
			line-height: 14px;
			background-color: #ffffff;
			transform: translateY(-50%);
		}
		&__controls {
			display: flex;
		}
		&__desc {
			font-size: 14px;
			margin: 0 20px;
			padding: 6px 12px;
			border: 1px solid;
			border-color: transparent $color-border $color-border $color-border;
			border-radius: 0 0 $border-large-radius $border-large-radius;
		}
		&__button {
			margin-left: 3px;
		}
	}
	.calendar-item--completed {
		text-decoration: line-through;
		opacity: 0.5;
	}


	@media (max-width: $size-mobile) {
		.calendar-item {
			&__head {
				font-size: 16px;
			}
		}
	}
</style>

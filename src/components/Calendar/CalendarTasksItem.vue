<template>
	<div class="calendar-item">
		<div
			class="calendar-item__head"
			:class="{
				'calendar-item__head--clickable': task.desc,
				'calendar-item__head--transparent': task.completed,
				'calendar-item__head--opened' : isOpened
				}"
			@click="toggle(task.desc)"
		>
			<span class="calendar-item__title">{{ task.title }}</span>
			<span class="calendar-item__time" v-if="task.time">{{ task.time }}</span>
			<div class="calendar-item__controls" v-if="isControlsVisible">
				<v-button
					class="calendar-item__button"
					title="Редактировать"
					:icon="'edit'"
					@on-click="openModalHandler('edit')"
				/>
				<v-button
					class="calendar-item__button"
					title="Завершить"
					:icon="'check'"
					@on-click="completeTask(task)"
				/>
				<v-button
					class="calendar-item__button"
					title="Изменить приоритет"
					:icon="task.priority === 'high' ? 'high-priority' : 'low-priority'"
					@on-click="changePriority(task)"
					v-if="day.editable"
				/>
				<v-button
					class="calendar-item__button"
					title="Удалить"
					:icon="'close'"
					@on-click="openModalHandler('delete')"
				/>
			</div>
			<v-button class="calendar-item__controls-toggle" :icon="'menu'" @on-click="toggleControls" />
		</div>
		<div class="calendar-item__desc" v-if="task.desc && isOpened">
			<p>{{ task.desc }}</p>
		</div>

		<v-modal v-if="modal.visible" @close="closeModalHandler">
      <template v-slot:header>
        <span v-if="modal.type === 'delete'">Удаление</span>
				<span v-else-if="modal.type === 'edit'">Изменение</span>
      </template>
      <template v-slot:body>

        <p v-if="modal.type === 'delete'">Вы действительно хотите удалить «{{ task.title }}»?</p>
				<form v-else-if="modal.type === 'edit'">
					<input type="text" class="input" v-model="task.title">
					<v-timepicker :time="time"/>
				</form>

      </template>
			<template v-slot:footer>
        <v-button
					style="margin-right:5px;"
					@on-click="closeModalHandler"
				>Отменить</v-button>
				<v-button
					v-if="modal.type === 'delete'"
					@on-click="removeTask(task)"
				>Удалить</v-button>
				<v-button
					v-else-if="modal.type === 'edit'"
					@on-click="changeTask(task)"
				>Изменить</v-button>
      </template>
    </v-modal>

	</div>
</template>

<script>
import VButton from '../blocks/VButton.vue';
import VModal from '../blocks/VModal';
import VTimepicker from '../blocks/VTimepicker';

export default {
	name: 'CalendarTasksItem',
	components: {
		VButton,
		VModal,
		VTimepicker
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
			modal: {
				visible: false,
				type: ''
			},
			isControlsVisible: false
		}
	},
	methods: {
		toggle(state) {
			if (state) this.isOpened = !this.isOpened;
		},

		toggleControls() {
			this.isControlsVisible = !this.isControlsVisible;
		},

		completeTask(task) {
			this.$store.dispatch('completeTask', {
				day: this.day.value,
				task
			});
		},

		changeTask(task) {
			console.log(task, ' changed');
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

		openModalHandler(type) {
			this.modal.visible = true;
			this.modal.type = type;
		},

		closeModalHandler() {
			this.modal.visible = false;
		}
	},
	computed: {
		time() {
			const time = this.task.time.split(':');
			return { hour: time[0], minute: time[1] };
		}
	}
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
			-webkit-tap-highlight-color: transparent;
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
		&__head--transparent {
			opacity: 0.5;
			text-decoration: line-through;
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
		&__controls-toggle {
			margin-left: 3px;
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


	@media (max-width: $size-mobile) {
		.calendar-item {
			position: relative;
			&__head {
				padding-right: 6px;
				font-size: 16px;
			}
			&__controls {
				position: absolute;
				right: 60px;
				border-radius: $border-small-radius;
			}
			&__controls-toggle {
				display: block;
			}
			&__button {
				&:first-child {
					margin-left: 0;
				}
			}
		}
	}
</style>

<template>
	<div class="calendar-item">
		<div
			class="calendar-item__head"
			:class="{
				'calendar-item__head--clickable': task.desc,
				'calendar-item__head--transparent': task.completed,
				'calendar-item__head--opened' : isOpened,
				'calendar-item__head--high-priority': task.priority === 'high'
				}"
			@click="toggle(task.desc)"
		>
			<span class="calendar-item__title">{{ task.title }}</span>
			<span class="calendar-item__time" v-if="task.time">{{ formattedTime }}</span>
			<transition name="fade">
				<div class="calendar-item__controls" v-if="isControlsVisible">
					<v-button
						class="calendar-item__button"
						:title="getLocale.controls.edit"
						:icon="'edit'"
						v-if="day.editable || getSettings.еditingExpiredTasks"
						@on-click="openModalHandler('edit')"
					/>
					<v-button
						class="calendar-item__button"
						:title="getLocale.controls.complete"
						:icon="'check'"
						@on-click="completeTask(task)"
					/>
					<v-button
						class="calendar-item__button"
						:title="getLocale.controls.priority"
						:icon="task.priority === 'high' ? 'high-priority' : 'low-priority'"
						@on-click="changePriority(task)"
						v-if="day.editable || getSettings.еditingExpiredTasks"
					/>
					<v-button
						class="calendar-item__button"
						:title="getLocale.controls.delete"
						:icon="'close'"
						@on-click="getSettings.removeTaskConfirm ? openModalHandler('delete') : removeTask(task)"
					/>
				</div>
			</transition>
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
					<input
						type="text"
						class="input calendar-item__input"
						v-model="currentTask.title"
						placeholder="Название"
					>
					<textarea
						type="text"
						class="input calendar-item__input"
						v-model="currentTask.desc"
						placeholder="Описание"
					></textarea>
					<v-timepicker :time="time" @on-select-time="changeTimeHandler"/>
				</form>

      </template>
			<template v-slot:footer>
        <v-button
					style="margin-right:5px;"
					:type="'danger'"
					@on-click="closeModalHandler"
					ref="cancel"
				>Отменить</v-button>
				<v-button
					v-if="modal.type === 'delete'"
					:type="'success'"
					@on-click="removeTask(task)"
				>Удалить</v-button>
				<v-button
					v-else-if="modal.type === 'edit'"
					:type="'success'"
					@on-click="changeTask(task)"
				>Изменить</v-button>
      </template>
    </v-modal>

	</div>
</template>

<script>
import { mapGetters } from 'vuex';
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
			currentTask: {},
			modal: {
				visible: false,
				type: ''
			},
			isControlsVisible: false
		}
	},
	created() {
		this.currentTask = {...this.task};
	},
	methods: {
		toggle(state) {
			if (state) this.isOpened = !this.isOpened;
		},

		toggleControls() {
			this.isControlsVisible = !this.isControlsVisible;
		},

		changeTimeHandler(payload) {
			this.currentTask.time = payload;
		},

		completeTask(task) {
			this.currentTask.completed = !this.currentTask.completed;

			this.$store.dispatch('changeTask', {
				day: this.day.value,
				task: this.currentTask
			});
		},

		changeTask(task) {
			this.modal.visible = false;
			this.$store.dispatch('changeTask', {
				day: this.day.value,
				task: this.currentTask
			});
		},

		removeTask(task) {
			this.$store.dispatch('removeTask', {
				day: this.day.value,
				task
			});
		},

		changePriority(task) {
			this.currentTask.priority === 'high'
				? this.currentTask.priority = 'low'
				: this.currentTask.priority = 'high';

			this.$store.dispatch('changeTask', {
				day: this.day.value,
				task: this.currentTask
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
		...mapGetters(['getSettings', 'getLocale']),
		time() {
			return {
				hour: this.task.time.hour,
				minute: this.task.time.minute
			};
		},
		formattedTime() {
			if (this.time.hour && this.time.minute) {
				return this.time.hour + ':' + this.time.minute;
			} else {
				return '';
			}
		}
	}
}
</script>

<style lang="scss">
	.calendar-item {
		position: relative;
		&__head {
			position: relative;
			z-index: 9;
			display: flex;
			align-items: center;
			padding: 6px 12px 6px 20px;
			color: $color-text;
			font-size: 18px;
			background-color: $color-background;
			border: 1px solid $color-border;
			border-radius: $border-large-radius;
		}
		&__head--high-priority {
			&::after {
				content: '';
				position: absolute;
				top: -10px;
				left: -10px;
				width: 25px;
				height: 25px;
				background-image: url('~@/assets/icons/hot.svg');
			}
		}
		&__head--clickable {
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
			left: 15px;
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
		&__input {
			width: 100%;
			margin-bottom: 10px;
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
				right: 50px;
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

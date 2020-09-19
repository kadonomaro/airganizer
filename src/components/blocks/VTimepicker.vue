<template>
	<div class="timepicker">
		<input
			class="timepicker__input input"
			type="text"
			:value="timeValue"
			readonly
			@focus="open"
			@keydown.exact.esc="close"
			ref="timepicker"
		>
		<div class="timepicker__dropdown" v-if="isOpen">
			<ul class="timepicker__list">
				<li
					v-for="(_, hour) in 24"
					class="timepicker__item"
					:class="{'timepicker__item--active': +hour === +currentTime.hour}"
					:key="hour"
					@click="selectHour(hour)"
				>
					{{ hour < 10 ? '0' + hour : hour }}
				</li>
			</ul>
			<ul class="timepicker__list">
				<li
					:class="{'timepicker__item--active': +minute === +currentTime.minute}"
					class="timepicker__item"
					v-for="(_, minute) in 60"
					:key="minute"
					@click="selectMinute(minute)"
				>
					{{ minute < 10 ? '0' + minute : minute }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'VTimepicker',
	props: {
		time: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			isOpen: false,
			currentTime: {
				hour: 'ЧЧ',
				minute: 'ММ'
			}
		}
	},
	created() {
		document.addEventListener('click', this.closeEvent);
	},
	destroyed() {
		document.removeEventListener('click', this.closeEvent);
	},
	methods: {
		open() {
			this.isOpen = true;
		},

		close() {
			this.isOpen = false;
		},

		clear() {
			this.currentTime.hour = 'ЧЧ';
			this.currentTime.minute = 'ММ';
			this.close();
		},

		selectHour(value) {
			this.currentTime.hour = value < 10 ? '0' + value : value;
		},

		selectMinute(value) {
			this.currentTime.minute = value < 10 ? '0' + value : value;
		},

		closeEvent(event) {
			if (event.target !== this.$refs.timepicker) {
				this.close();
			}
		}
	},
	computed: {
		timeValue() {
			return this.currentTime.hour + ':' + this.currentTime.minute;
		}
	},
	watch: {
		currentTime: {
			deep: true,
			handler(time) {
				if(time.hour !== 'ЧЧ' && time.minute !== 'ММ') {
					this.$emit('on-select-time', time);
				}
			}
		},
		time(value) {
			if (!value) {
				this.clear();
			}
		}

	}
}
</script>

<style lang="scss">
	.timepicker {
		position: relative;
		z-index: 99;
		max-width: 100px;
		&__input {
			width: 100%;
		}
		&__dropdown {
			position: absolute;
			bottom: 0;
			display: flex;
			width: 100%;
			background-color: #ffffff;
			border-radius: $border-small-radius;
			box-shadow: 0 3px 7px rgba($color: #000000, $alpha: 0.3);
			transform: translateY(100%);
			overflow: hidden;
		}
		&__list {
			margin: 0;
			padding: 0;
			max-height: 160px;
			width: 50%;
			text-align: center;
			list-style: none;
			overflow-y: auto;
		}
		&__item {
			padding: 4px 0;
			cursor: pointer;
			transition: background-color 0.1s ease-in;
			&:hover {
				background-color: #ececec;
			}
		}
		&__item--active {
			background-color: rgba($color: $color-brand, $alpha: 0.5);
		}
	}
</style>

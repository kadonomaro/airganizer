<template>
	<button
		class="button"
		:class="style"
		:style="{
			'width': width + 'px',
			'height': width + 'px',
		}"
		@click.stop="clickHandler"
	>
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: 'VButton',
	props: {
		icon: {
			type: String,
			required: false
		},
		type: {
			type: String,
			required: false
		},
		width: {
			type: Number,
			required: false
		}
	},
	methods: {
		clickHandler() {
			this.$emit('on-click');
		}
	},
	computed: {
		style() {
			return [
				this.icon ? 'button--' + this.icon : '',
				this.type ? 'button--' + this.type : '',
				this.$slots.default ? 'button--text' : ''
			]
		}
	}
}
</script>

<style lang="scss">
	.button {
		width: 30px;
		height: 30px;
		padding: 10px;
		color: $color-text-dark;
		font-family: inherit;
		font-size: 14px;
		background-color: $color-background;
		background-repeat: no-repeat;
		background-position: center;
		background-size: 70%;
		border: 1px solid $color-border;
		border-radius: $border-small-radius;
		cursor: pointer;
		transition: background-color 0.1s ease-in;
		&:hover {
			background-color: $color-hover;
		}
		&:hover:disabled {
			background-color: $color-background;
		}
		&:disabled {
			opacity: 0.5;
			cursor: initial;
		}
	}
	.button--text {
		width: auto;
		height: auto;
		padding: 8px 16px;
		border-radius: $border-small-radius;
	}
	.button--danger {
		background-color: $color-danger;
		border-color: $color-danger;
		&:hover {
			background-color: darken($color: $color-danger, $amount: 5%);
		}
	}
	.button--success {
		background-color: $color-success;
		border-color: $color-success;
		&:hover {
			background-color: darken($color: $color-success, $amount: 5%);
		}
	}
	.button--close {
		background-image: url('~@/assets/icons/close.svg');
	}
	.button--add {
		background-image: url('~@/assets/icons/add.svg');
	}
	.button--check {
		background-image: url('~@/assets/icons/check.svg');
	}
	.button--low-priority {
		background-image: url('~@/assets/icons/priority.svg');
	}
	.button--high-priority {
		background-image: url('~@/assets/icons/hot.svg');
	}
	.button--calendar {
		background-image: url('~@/assets/icons/calendar.svg');
	}
	.button--list {
		background-image: url('~@/assets/icons/list.svg');
	}
	.button--menu {
		background-image: url('~@/assets/icons/menu.svg');
	}
	.button--edit {
		background-image: url('~@/assets/icons/edit.svg');
	}
	.button--settings {
		background-image: url('~@/assets/icons/settings.svg');
	}
	.button--arrow-left {
		background-image: url('~@/assets/icons/arrow-left.svg');
	}
	.button--arrow-right {
		background-image: url('~@/assets/icons/arrow-right.svg');
	}


	@media (max-width: $size-mobile) {
		.button {
			width: 40px;
			height: 40px;
		}
		.button--text {
			width: auto;
			height: auto;
		}
	}
</style>

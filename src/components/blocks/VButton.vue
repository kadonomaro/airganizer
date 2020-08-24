<template>
	<button class="app-button" :class="style" @click="clickHandler">
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: 'AppButton',
	props: {
		icon: {
			type: String,
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
				this.icon ? 'app-button--' + this.icon : '',
				this.$slots.default ? 'app-button--text' : ''
			]
		}
	}
}
</script>

<style lang="scss">
	.app-button {
		width: 30px;
		height: 30px;
		padding: 10px;
		color: $color-text-dark;
		background-color: $color-background;
		background-repeat: no-repeat;
		background-position: center;
		background-size: 65%;
		border: 1px solid $color-border;
		border-radius: 50%;
		cursor: pointer;
		transition: background-color 0.1s ease-in;
		&:hover {
			background-color: darken($color: $color-background, $amount: 5%);
		}
	}
	.app-button--text {
		width: auto;
		height: auto;
		padding: 8px 16px;
		border-radius: 8px;
	}
	.app-button--close {
		background-image: url('~@/assets/icons/close.svg');
	}
	.app-button--add {
		background-image: url('~@/assets/icons/add.svg');
	}
	.app-button--switch {
		background-image: url('~@/assets/icons/switch.svg');
	}
	.app-button--arrow-left {
		background-image: url('~@/assets/icons/arrow-left.svg');
	}
	.app-button--arrow-right {
		background-image: url('~@/assets/icons/arrow-right.svg');
	}
</style>

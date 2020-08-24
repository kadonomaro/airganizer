<template>
	<button class="app-button" :class="style" @click.prevent="clickHandler">{{text}}</button>
</template>

<script>
export default {
	name: 'AppButton',
	props: {
		icon: {
			type: String,
			required: false
		},
		text: {
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
				'app-button--' + this.icon
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
		background-color: #202020;
		background-repeat: no-repeat;
		background-position: center;
		background-size: 20px;
		border: 1px solid #4C4C4C;
		border-radius: 8px;
		border-radius: 50%;
		cursor: pointer;
	}
	.app-button--close {
		background-image: url('~@/assets/icons/close.svg');
	}
	.app-button--add {
		background-image: url('~@/assets/icons/add.svg');
	}
	.app-button--arrow-left {
		background-image: url('~@/assets/icons/arrow-left.svg');
	}
	.app-button--arrow-right {
		background-image: url('~@/assets/icons/arrow-right.svg');
	}
</style>

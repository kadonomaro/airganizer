<template>
	<label class="checkbox">
		<input
			class="checkbox__input visually-hidden"
			type="checkbox"
			v-model="isChecked"
			@change="changeHandler"
		>
		<span class="checkbox__custom"></span>
		<span class="checkbox__text" v-if="text">{{ text }}</span>
	</label>
</template>

<script>
export default {
	name: 'VCheckbox',
	props: {
		checked: {
			type: Boolean,
			required: false,
			default: false
		},
		text: {
			type: String,
			required: false
		}
	},
	data() {
		return {
			isChecked: false
		}
	},
	created() {
		this.isChecked = this.checked;
	},
	methods: {
		changeHandler() {
			this.$emit('on-change', this.checked);
		}
	}
}
</script>

<style lang="scss">
	.checkbox {
		display: flex;
		align-items: center;
		&__input {
			&:checked ~ .checkbox__custom {
				background-color: $color-success;
				&::before {
					transform: translate(20px, -50%);
				}
			}
		}
		&__custom {
			position: relative;
			flex-shrink: 0;
			display: block;
			width: 40px;
			height: 20px;
			padding: 2px;
			background-color: $color-danger;
			border: 1px solid $color-border;
			border-radius: 100px;
			box-sizing: border-box;
			cursor: pointer;
			&::before {
				content: '';
				position: absolute;
				top: 50%;
				width: 14px;
				height: 14px;
				background-color: $color-border;
				border-radius: 50%;
				box-shadow: 0 0 2px rgba($color: #000000, $alpha: 0.5);
				transform: translate(0, -50%);
				transition: transform 0.1s ease-in;
			}
		}
		&__text {
			margin-left: 5px;
		}
	}


	@media (max-width: $size-mobile) {
		.checkbox {
			&__custom {
				width: 60px;
				height: 30px;
				&::before {
					width: 24px;
					height: 24px;
				}
			}
			&__input {
				&:checked ~ .checkbox__custom {
					&::before {
						transform: translate(30px, -50%);
					}
				}
			}
		}
	}
</style>

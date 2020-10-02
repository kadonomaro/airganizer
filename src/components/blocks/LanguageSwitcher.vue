<template>
	<div class="language-switcher">
		<label class="language-switcher__label">
			<input
				class="language-switcher__input visually-hidden"
				name="language"
				type="radio"
				value="ru"
				:checked="getLanguage === 'ru'"
				@change="changeHandler"
			>
			<span class="language-switcher__input-custom language-switcher__input-custom--ru"></span>
		</label>
		<label class="language-switcher__label">
			<input
				class="language-switcher__input visually-hidden"
				name="language"
				type="radio"
				value="en"
				:checked="getLanguage === 'en'"
				@change="changeHandler"
			>
			<span class="language-switcher__input-custom language-switcher__input-custom--en"></span>
		</label>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'LanguageSwitcher',
	methods: {
		changeHandler(event) {
			this.$store.dispatch('changeLanguage', event.target.value);
		}
	},
	computed: {
		...mapGetters(['getLanguage'])
	}
}
</script>

<style lang="scss">
	.language-switcher {
		display: flex;
		&__input {
			&:checked ~ .language-switcher__input-custom {
				filter: grayscale(0);
			}
		}
		&__input-custom {
			display: block;
			margin-right: 5px;
			width: 40px;
			height: 25px;
			background-size: cover;
			background-repeat: no-repeat;
			transition: filter 0.1s ease-in;
			filter: grayscale(1);
			cursor: pointer;
		}
		&__input-custom--ru {
			background-image: url('~@/assets/icons/ru-flag.svg');
		}
		&__input-custom--en {
			background-image: url('~@/assets/icons/uk-flag.svg');
		}
	}


	@media (max-width: $size-mobile) {
		.language-switcher {
			&__input-custom {
				width: 56px;
				height: 35px;
			}
		}
	}
</style>

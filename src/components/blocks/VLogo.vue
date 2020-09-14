<template>
	<div class="logo">
		<img class="logo__image" :src="logo" alt="airganizer logo" width="60" v-if="isHomePage">
		<router-link to="/" v-else title="На главную">
			<img class="logo__image" :src="logo" alt="airganizer logo" width="60">
		</router-link>
		<div class="logo__text" v-if="text">
			<span class="logo__title"><span class="logo__title--blue">Air</span>ganizer</span>
			<span class="logo__subtitle">Управление личным временем</span>
		</div>
	</div>
</template>

<script>
import logo from '@/assets/logo.png';

export default {
	name: 'VLogo',
	props: {
		text: {
			type: Boolean,
			required: false
		}
	},
	data() {
		return {
			logo
		}
	},
	computed: {
		isHomePage() {
			return this.$route.name === 'Home';
		}
	}
}
</script>

<style lang="scss">
	.logo {
		display: flex;
		align-items: center;
		&__text {
			margin-left: 10px;
			line-height: 1;
		}
		&__title {
			display: block;
			font-size: 20px;
			font-weight: bold;
		}
		&__title--blue {
			color: $color-brand;
		}
		&__subtitle {
			font-size: 14px;
		}
	}
</style>

<template>
	<div class="logo">
		<img class="logo__image" :src="logo" alt="airganizer logo" width="60">
		<div class="logo__text">
			<span class="logo__title">Airganizer</span>
			<span class="logo__subtitle">Управление личным временем</span>
		</div>
	</div>
</template>

<script>
import logo from '@/assets/logo.png'

export default {
	name: 'VLogo',
	data() {
		return {
			logo
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
			font-weight: bold;
		}
		&__subtitle {
			font-size: 12px;
		}
	}
</style>

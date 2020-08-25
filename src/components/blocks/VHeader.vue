<template>
	<header class="header">
		<div class="header__logo">
			<v-logo />
		</div>
	</header>
</template>

<script>
import VLogo from './VLogo';

export default {
	name: 'VHeader',
	components: {
		VLogo
	}
}
</script>

<style lang="scss">
	.header {
		padding: 10px;
		background-color: $color-background;
		border-bottom: 1px solid $color-border;
		box-shadow: 0 5px 5px rgba($color: #000000, $alpha: 0.05);
	}
</style>

<template>
	<footer class="footer">
		<div class="footer__inner">
			<div class="footer__logo">
				<v-logo />
			</div>
			<div class="footer__author">
				<a href="https://airsoftware.ru.com/" target="_blank">
					<img :src="require('@/assets/images/airsoftware.png')" alt="Airsoftware" title="Airsoftware">
				</a>
			</div>
		</div>
	</footer>
</template>

<script>
import VLogo from './VLogo';

export default {
	name: 'VFooter',
	components: {
		VLogo
	}
}
</script>

<style lang="scss">
	.footer {
		padding: 15px 20px;
		color: #ffffff;
		background-color: $color-background-dark;
		border-top: 1px solid $color-border;
		box-shadow: 0 -5px 5px rgba($color: #000000, $alpha: 0.05);
		&__inner {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		&__author {
			width: 30px;
			height: 30px;
			padding: 3px;
			background-color: #ffffff;
			border-radius: 50%;
			box-sizing: border-box;
		}
	}
</style>

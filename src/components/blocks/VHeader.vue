<template>
	<header class="header">
		<div class="header__logo">
			<v-logo :text="true" />
		</div>
		<div class="header__side">
			<div class="header__profile">
				<user-info />
			</div>
			<div class="header__nav">
				<v-navigation />
			</div>
		</div>

	</header>
</template>

<script>
import VLogo from './VLogo';
import VNavigation from './VNavigation';
import UserInfo from './UserInfo';

export default {
	name: 'VHeader',
	components: {
		VLogo,
		VNavigation,
		UserInfo
	}
}
</script>

<style lang="scss">
	.header {
		display: flex;
		align-items: center;
		padding: 10px 20px;
		background-color: $color-background;
		border-bottom: 1px solid $color-border;
		box-shadow: 0 5px 5px rgba($color: #000000, $alpha: 0.05);
		&__logo {
			margin-right: auto;
		}
		&__side {
			display: flex;
		}
		&__profile {
			margin-right: 10px;
		}
	}


	@media (max-width: $size-mobile) {
		.header {
			padding: 10px;
			&__side {
				display: block;
				text-align: right;
			}
			&__profile {
				margin-right: 0;
				margin-bottom: 5px;
			}
		}
	}
</style>

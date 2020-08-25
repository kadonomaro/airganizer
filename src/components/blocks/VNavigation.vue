<template>
	<nav class="navigation">
		<ul class="navigation__list">
			<li class="navigation__item">
				<router-link
					class="navigation__link navigation__link--login"
					:to="'login'"
				>Войти</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>

export default {
	name: 'VNavigation'
}
</script>

<style lang="scss">
	.navigation {
		&__list {
			margin: 0;
			padding: 0;
			list-style: none;
		}
		&__item {
			display: flex;
			align-items: center;
		}
		&__link {
			display: block;
			color: inherit;
			text-decoration: none;
		}
		&__link--login {
			position: relative;
			padding-left: 30px;
			&::before {
				content: '';
				position: absolute;
				top: 50%;
				left: 0;
				width: 25px;
				height: 25px;
				background-image: url('~@/assets/icons/login.svg');
				background-repeat: no-repeat;
				transform: translateY(-50%);
			}
		}
	}
</style>

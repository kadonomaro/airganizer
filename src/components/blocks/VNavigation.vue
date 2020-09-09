<template>
	<nav class="navigation">
		<ul class="navigation__list">
			<li class="navigation__item" v-if="!getAuthStatus">
				<router-link
					class="navigation__link navigation__link--icon navigation__link--login"
					:to="'login'"
				>Войти</router-link>
			</li>

			<li class="navigation__item" v-else>
				<a
					href=""
					class="navigation__link navigation__link--icon navigation__link--logout"
					@click.prevent="clickHandler"
				>Выйти</a>
			</li>
		</ul>
	</nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'VNavigation',
	methods: {
		clickHandler() {
			this.$store.dispatch('logout');
		}
	},
	computed: {
		...mapGetters([
			'getAuthStatus'
		])
	}
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
		&__link--icon {
			position: relative;
			padding-left: 30px;
			&::before {
				content: '';
				position: absolute;
				top: 50%;
				left: 0;
				width: 25px;
				height: 25px;
				background-repeat: no-repeat;
				transform: translateY(-50%);
			}
		}
		&__link--login {
			&::before {
				background-image: url('~@/assets/icons/login.svg');
			}
		}
		&__link--logout {
			&::before {
				background-image: url('~@/assets/icons/logout.svg');
			}
		}
	}
</style>

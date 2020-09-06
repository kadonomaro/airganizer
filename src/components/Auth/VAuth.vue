<template>
	<div class="auth-overlay">
		<div class="auth">
			<div class="auth__logo">
				<v-logo />
			</div>
			<span class="auth__title">{{ title }}</span>

			<form v-if="type === 'login'" class="auth__form">
				<label class="auth__label auth__label--name">
					<input type="text" class="auth__field input" placeholder="Адрес электронной почты" v-model="user.email">
				</label>
				<label class="auth__label auth__label--password">
					<input type="password" class="auth__field input" placeholder="Пароль" autocomplete="on" v-model="user.password">
				</label>
				<button class="auth__button button button--text">Войти</button>
				<span class="auth__text">
					Еще нет аккаунта? <router-link class="auth__link" to="/registration">Зарегистрируйтесь</router-link>
				</span>
			</form>


			<form v-if="type === 'registration'" class="auth__form">
				<label class="auth__label auth__label--name">
					<input
						type="text"
						class="auth__field input"
						:class="{'input--error': $v.user.name.$error}"
						placeholder="Имя пользователя"
						v-model="user.name"
						@blur="$v.user.name.$touch()"
					>
				</label>
				<label class="auth__label auth__label--email">
					<input
						type="text"
						class="auth__field input"
						:class="{'input--error': $v.user.email.$error}"
						placeholder="Адрес электронной почты"
						v-model="user.email"
						@blur="$v.user.email.$touch()"
					>
				</label>
				<label class="auth__label auth__label--password">
					<input
						type="password"
						class="auth__field input"
						:class="{'input--error': $v.user.password.$error}"
						placeholder="Пароль"
						autocomplete="on"
						v-model="user.password"
						@blur="$v.user.password.$touch()"
					>
				</label>
				<label class="auth__label auth__label--password">
					<input
						type="password"
						class="auth__field input"
						:class="{'input--error': $v.user.repeatPassword.$error}"
						placeholder="Повторите пароль"
						autocomplete="on"
						v-model="user.repeatPassword"
						@blur="$v.user.repeatPassword.$touch()"
					>
				</label>
				<button
					class="auth__button button button--text"
					:disabled="$v.$invalid"
				>Зарегистрироваться</button>
				<span class="auth__text">
					Уже есть аккаунт? <router-link class="auth__link" to="/login">Войти</router-link>
				</span>
			</form>

		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import VLogo from '@/components/blocks/VLogo.vue';
import { required, minLength, sameAs } from 'vuelidate/lib/validators';

export default {
	name: 'v-auth',
	components: {
		VLogo
	},
	props: {
		type: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			user: {
				name: '',
				email: '',
				password: '',
				repeatPassword: ''
			}
		}
	},
	validations: {
		user: {
			name: {
				required
			},
			email: {
				required
			},
			password: {
				required,
				minLength: minLength(6)
			},
			repeatPassword: {
				sameAs: sameAs('password')
			}
		}
	},
	computed: {
		title() {
			return this.type === 'login' ? 'Авторизация' : 'Регистрация';
		}
	}
}
</script>

<style lang="scss">
	.auth-overlay {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
	}

	.auth {
		position: relative;
		width: 300px;
		padding: 40px 20px 20px;
		background-color: #ffffff;
		border: 1px solid $color-border;
		border-radius: $border-small-radius;
		box-sizing: border-box;
		&__title {
			display: block;
			margin-bottom: 10px;
			font-size: 18px;
			font-weight: bold;
			line-height: 1;
			text-align: center;
		}
		&__logo {
			position: absolute;
			top: 0;
			left: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 75px;
			height: 75px;
			background-color: #ffffff;
			border-radius: 50%;
			border: 1px solid $color-border;
			transform: translate(-50%, -50%);
		}
		&__label {
			position: relative;
			display: block;
			margin-bottom: 10px;
			&::before {
				content: '';
				position: absolute;
				top: 50%;
				right: 10px;
				width: 15px;
				height: 15px;
				transform: translateY(-50%);
				background-repeat: no-repeat;
				background-size: contain;
				background-position: center;
			}
		}
		&__label--name {
			&::before {
				background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cmask id='path-1-inside-1' fill='white'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5 5C6.38071 5 7.5 3.88071 7.5 2.5C7.5 1.11929 6.38071 0 5 0C3.61929 0 2.5 1.11929 2.5 2.5C2.5 3.88071 3.61929 5 5 5ZM5 5C4.34339 5 3.69321 5.12933 3.08658 5.3806C2.47995 5.63188 1.92876 6.00017 1.46447 6.46447C1.00017 6.92876 0.631876 7.47996 0.380602 8.08658C0.129329 8.69321 0 9.34339 0 10H5H10C10 9.34339 9.87067 8.69321 9.6194 8.08658C9.36812 7.47995 8.99983 6.92876 8.53553 6.46447C8.07124 6.00017 7.52004 5.63188 6.91342 5.3806C6.30679 5.12933 5.65661 5 5 5Z'/%3E%3C/mask%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5 5C6.38071 5 7.5 3.88071 7.5 2.5C7.5 1.11929 6.38071 0 5 0C3.61929 0 2.5 1.11929 2.5 2.5C2.5 3.88071 3.61929 5 5 5ZM5 5C4.34339 5 3.69321 5.12933 3.08658 5.3806C2.47995 5.63188 1.92876 6.00017 1.46447 6.46447C1.00017 6.92876 0.631876 7.47996 0.380602 8.08658C0.129329 8.69321 0 9.34339 0 10H5H10C10 9.34339 9.87067 8.69321 9.6194 8.08658C9.36812 7.47995 8.99983 6.92876 8.53553 6.46447C8.07124 6.00017 7.52004 5.63188 6.91342 5.3806C6.30679 5.12933 5.65661 5 5 5Z' fill='%23606060'/%3E%3Cpath d='M1.46447 6.46447L0.757359 5.75736L0.757359 5.75736L1.46447 6.46447ZM0.380602 8.08658L-0.543277 7.7039L-0.543277 7.7039L0.380602 8.08658ZM0 10H-1V11H0V10ZM10 10V11H11V10H10ZM9.6194 8.08658L10.5433 7.7039L10.5433 7.7039L9.6194 8.08658ZM8.53553 6.46447L9.24264 5.75736L9.24264 5.75736L8.53553 6.46447ZM6.5 2.5C6.5 3.32843 5.82843 4 5 4V6C6.933 6 8.5 4.433 8.5 2.5H6.5ZM5 1C5.82843 1 6.5 1.67157 6.5 2.5H8.5C8.5 0.567003 6.933 -1 5 -1V1ZM3.5 2.5C3.5 1.67157 4.17157 1 5 1V-1C3.067 -1 1.5 0.567003 1.5 2.5H3.5ZM5 4C4.17157 4 3.5 3.32843 3.5 2.5H1.5C1.5 4.433 3.067 6 5 6V4ZM5 4C4.21207 4 3.43185 4.15519 2.7039 4.45672L3.46927 6.30448C3.95457 6.10346 4.47471 6 5 6V4ZM2.7039 4.45672C1.97595 4.75825 1.31451 5.20021 0.757359 5.75736L2.17157 7.17157C2.54301 6.80014 2.98396 6.5055 3.46927 6.30448L2.7039 4.45672ZM0.757359 5.75736C0.200207 6.31451 -0.241749 6.97595 -0.543277 7.7039L1.30448 8.46927C1.5055 7.98396 1.80014 7.54301 2.17157 7.17157L0.757359 5.75736ZM-0.543277 7.7039C-0.844806 8.43185 -1 9.21207 -1 10H1C1 9.47471 1.10346 8.95457 1.30448 8.46927L-0.543277 7.7039ZM0 11H5V9H0V11ZM5 11H10V9H5V11ZM11 10C11 9.21207 10.8448 8.43185 10.5433 7.7039L8.69552 8.46927C8.89654 8.95457 9 9.47471 9 10H11ZM10.5433 7.7039C10.2417 6.97595 9.79979 6.31451 9.24264 5.75736L7.82843 7.17157C8.19986 7.54301 8.4945 7.98396 8.69552 8.46927L10.5433 7.7039ZM9.24264 5.75736C8.68549 5.20021 8.02405 4.75825 7.2961 4.45672L6.53073 6.30448C7.01604 6.5055 7.45699 6.80014 7.82843 7.17157L9.24264 5.75736ZM7.2961 4.45672C6.56815 4.15519 5.78793 4 5 4V6C5.52529 6 6.04543 6.10346 6.53073 6.30448L7.2961 4.45672Z' fill='%23606060' mask='url(%23path-1-inside-1)'/%3E%3C/svg%3E%0A");
			}
		}
		&__label--email {
			&::before {
				background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3C!--Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)--%3E%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512'%3E%3Cpath fill='%23606060' d='M339.392 258.624L512 367.744V144.896zM0 144.896v222.848l172.608-109.12zM480 80H32C16.032 80 3.36 91.904.96 107.232L256 275.264l255.04-168.032C508.64 91.904 495.968 80 480 80zM310.08 277.952l-45.28 29.824a15.983 15.983 0 01-8.8 2.624c-3.072 0-6.112-.864-8.8-2.624l-45.28-29.856L1.024 404.992C3.488 420.192 16.096 432 32 432h448c15.904 0 28.512-11.808 30.976-27.008L310.08 277.952z'/%3E%3C/svg%3E");
			}
		}
		&__label--password {
			&::before {
				background-image: url("data:image/svg+xml,%3Csvg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3.5' cy='3.5' r='2.5' stroke='%23606060' stroke-width='2'/%3E%3Cpath d='M6 3H12' stroke='%23606060' stroke-width='2'/%3E%3Cpath d='M9 5.25V3H10.4667V5.25H9Z' fill='%23606060' stroke='%23606060'/%3E%3C/svg%3E%0A");
			}
		}
		&__field {
			width: 100%;
			box-sizing: border-box;
		}
		&__button {
			width: 100%;
			margin-bottom: 10px;
		}
		&__link {
			color: $color-text-dark;
		}
		&__text {
			display: block;
			font-size: 14px;
		}
	}
</style>

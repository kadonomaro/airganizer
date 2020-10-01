<template>
	<div class="login">
		<v-auth :type="'login'" />
	</div>
</template>

<script>
import VAuth from '@/components/Auth/VAuth.vue';

export default {
	name: 'Login',
	components: {
		VAuth
	},
	metaInfo: {
		title: 'Airganizer - авторизация пользователя',
		meta: [{
			vmid: 'description',
			name: 'description',
			content: 'Airganizer это система для управления личными задачами. Помогает правильно организовывать ваше время.',
		}]
	}
}
</script>

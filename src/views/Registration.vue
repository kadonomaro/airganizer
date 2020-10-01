<template>
	<div class="registration">
		<v-auth :type="'registration'" />
	</div>
</template>

<script>
import VAuth from '@/components/Auth/VAuth.vue';

export default {
	name: 'Registration',
	components: {
		VAuth
	},
	metaInfo: {
		title: 'Airganizer - регистрация нового пользователя',
		meta: [{
			vmid: 'description',
			name: 'description',
			content: 'Airganizer это система для управления личными задачами. Помогает правильно организовывать ваше время.',
		}]
	}
}
</script>

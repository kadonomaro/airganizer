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
	}
}
</script>

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
	}
}
</script>

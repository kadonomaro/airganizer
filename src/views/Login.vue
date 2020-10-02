<template>
	<div class="login">
		<v-auth :type="'login'" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import VAuth from '@/components/Auth/VAuth.vue';

export default {
	name: 'Login',
	components: {
		VAuth
	},
	metaInfo() {
		return {
			title: this.getLocale.meta.login.title,
			meta: [{
				vmid: 'description',
				name: 'description',
				content: this.getLocale.meta.login.description,
			}]
		}
	},
	computed: {
		...mapGetters(['getLocale'])
	}
}
</script>

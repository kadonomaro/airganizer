<template>
	<div class="registration">
		<v-auth :type="'registration'" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import VAuth from '@/components/Auth/VAuth.vue';

export default {
	name: 'Registration',
	components: {
		VAuth
	},
	metaInfo() {
		return {
			title: this.getLocale.meta.register.title,
			meta: [{
				vmid: 'description',
				name: 'description',
				content: this.getLocale.meta.register.description,
			}]
		}
	},
	computed: {
		...mapGetters(['getLocale'])
	}
}
</script>

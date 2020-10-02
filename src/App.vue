<template>
  <div id="app">
		<component :is="layout">
			<router-view/>
		</component>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

export default {
	components: {
		MainLayout,
		AuthLayout
	},
	created() {
		this.$store.dispatch('fetchData');
		this.$store.dispatch('fetchSettings');
		this.$store.dispatch('fetchLocalization');
		moment.locale(this.getLanguage, { week: { dow: 1 } });
	},
	computed: {
		...mapGetters(['getLanguage']),
		layout() {
			return (this.$route.meta.layout || 'Main') + 'Layout';
		}
	}
}
</script>

<style lang="scss">
#app {
  font-family: Jost, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-text-dark;
}

</style>

<template>
  <div id="app">
		<component :is="layout">
			<router-view/>
		</component>
  </div>
</template>

<script>
import moment from 'moment';
import { mapState, mapActions } from 'vuex';
import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';

export default {
	components: {
		MainLayout,
		AuthLayout
	},
	created() {
		this.init();
		moment.updateLocale(this.language, { week: { dow: 1 } });
	},
	computed: {
		...mapState({
			language: state => state.localization.language
		}),
		layout() {
			return (this.$route.meta.layout || 'Main') + 'Layout';
		}
	},
	methods: {
		...mapActions(['fetchData', 'fetchSettings', 'fetchLocalization']),
		init() {
			this.fetchData();
			this.fetchSettings;
			this.fetchLocalization();
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

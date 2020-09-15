<template>
	<div class="main-layout">
		<v-header />
    <router-view/>
		<v-footer />
	</div>
</template>

<script>
import VHeader from '@/components/blocks/VHeader.vue';
import VFooter from '@/components/blocks/VFooter.vue';

export default {
	name: 'MainLayout',
	components: {
		VHeader,
		VFooter
	}
}
</script>

<style lang="scss">
	.main-layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>

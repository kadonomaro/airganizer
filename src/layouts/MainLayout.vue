<template>
	<div class="main-layout">
		<v-header />
    <router-view/>
	</div>
</template>

<script>
import VHeader from '@/components/blocks/VHeader.vue';

export default {
	name: 'MainLayout',
	components: {
		VHeader
	}
}
</script>

<style>

</style>

<template>
  <div id="app">
		<v-header />
    <router-view/>
  </div>
</template>

<script>
import VHeader from '@/components/blocks/VHeader.vue';

export default {
	components: {
		VHeader
	}
}
</script>

<style lang="scss">
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-text-dark;
}

</style>

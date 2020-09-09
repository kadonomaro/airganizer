<template>
	<div class="user-info" v-if="getUserName">
		<span class="user-info__title">{{ getUserName }}</span>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'UserInfo',
	computed: {
		...mapGetters([
			'getUserName'
		])
	}
}
</script>

<style lang="scss">
	.user-info {
		padding: 0 5px;
	}
</style>

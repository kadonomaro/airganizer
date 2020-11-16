<template>
	<div class="user-info" v-if="username">
		<span class="user-info__title">{{ username }}</span>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'UserInfo',
	computed: {
		...mapState({
			username: state => state.user.name
		})
	}
}
</script>

<style lang="scss">
	.user-info {
		padding: 0 5px;
	}
</style>

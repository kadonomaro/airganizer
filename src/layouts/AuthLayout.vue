<template>
	<div class="auth-layout">
		<transition name="fade" mode="out-in">
			<router-view/>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'AuthLayout'
}
</script>

<template>
	<div class="settings">
		<ul class="settings__list">
			<li class="settings__item">
				<input type="checkbox">
				<span>text</span>
			</li>
			<li class="settings__item">
				<input type="checkbox">
				<span>text</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'SettingsComponent'
}
</script>

<style lang="scss">
	.settings {
		padding: 30px 0;
		&__list {
			margin: 0;
			padding: 10px;
			list-style: none;
			background-color: #ffffff;
		}
		&__item {
			margin-bottom: 10px;
		}
	}
</style>

<template>
	<div class="settings">
		<ul class="settings__list">
			<li class="settings__item">
				<v-checkbox :text="'text'" :checked="true"/>
			</li>
			<li class="settings__item">
				<v-checkbox :text="'text'"/>
			</li>
		</ul>
	</div>
</template>

<script>
import VCheckbox from '../blocks/VCheckbox.vue';

export default {
	name: 'SettingsComponent',
	components: {
		VCheckbox
	}
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

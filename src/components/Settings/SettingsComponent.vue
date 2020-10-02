<template>
	<div class="settings">
		<span class="settings__title">Настройки</span>
		<ul class="settings__list">
			<li class="settings__item">
				<v-checkbox
					:text="getLocale.settings.confirm"
					:checked="getSettings.removeTaskConfirm"
					@on-change="updateSettings('removeTaskConfirm')"
				/>
			</li>
			<li class="settings__item">
				<v-checkbox
					:text="getLocale.settings.complete"
					:checked="getSettings.showCompletedTasks"
					@on-change="updateSettings('showCompletedTasks')"
				/>
			</li>
			<li class="settings__item">
				<v-checkbox
					:text="getLocale.settings.edit"
					:checked="getSettings.еditingExpiredTasks"
					@on-change="updateSettings('еditingExpiredTasks')"
				/>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import VCheckbox from '../blocks/VCheckbox.vue';

export default {
	name: 'SettingsComponent',
	components: {
		VCheckbox
	},
	methods: {
		updateSettings(type) {
			this.$store.dispatch('updateSettings', type);
		}
	},
	computed: {
		...mapGetters(['getSettings', 'getLocale'])
	}
}
</script>

<style lang="scss">
	.settings {
		padding: 30px 0;
		&__title {
			display: block;
			margin-bottom: 5px;
			font-size: 18px;
			font-weight: bold;
		}
		&__list {
			margin: 0;
			padding: 10px;
			list-style: none;
			background-color: #ffffff;
		}
		&__item {
			&:not(:last-child) {
				margin-bottom: 10px;
			}
		}
	}
</style>

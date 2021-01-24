<template>
	<div class="settings">
		<span class="settings__title">{{ getLocale.components.settings }}</span>
		<ul class="settings__list">
			<li class="settings__item">
				<language-switcher />
			</li>
			<li class="settings__item">
				<v-checkbox
					:text="getLocale.settings.confirm"
					:checked="settings.removeTaskConfirm"
					@on-change="updateSettingsHandler('removeTaskConfirm')"
				/>
			</li>
			<li class="settings__item">
				<v-checkbox
					:text="getLocale.settings.complete"
					:checked="settings.showCompletedTasks"
					@on-change="updateSettingsHandler('showCompletedTasks')"
				/>
			</li>
			<li class="settings__item">
				<v-checkbox
					:text="getLocale.settings.edit"
					:checked="settings.editingExpiredTasks"
					@on-change="updateSettingsHandler('editingExpiredTasks')"
				/>
			</li>
		</ul>
	</div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import VCheckbox from '../blocks/VCheckbox.vue';
import LanguageSwitcher from '../blocks/LanguageSwitcher.vue';

export default {
	name: 'SettingsComponent',
	components: {
		VCheckbox,
		LanguageSwitcher
	},
	methods: {
		...mapActions(['updateSettings']),
		updateSettingsHandler(type) {
			this.updateSettings(type);
		}
	},
	computed: {
		...mapState({
			settings: state => state.settings.settings
		}),
		...mapGetters(['getLocale'])
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

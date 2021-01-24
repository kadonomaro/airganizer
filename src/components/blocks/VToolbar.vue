<template>
	<div class="toolbar">
		<v-button
			class="toolbar__button"
			:class="{'toolbar__button--active': component === 'calendar'}"
			:icon="'calendar'"
			:title="getLocale.components.calendar"
			:width="40"
			@on-click="setActiveComponent('calendar')"
		/>
		<v-button
			class="toolbar__button"
			:class="{'toolbar__button--active': component === 'task-list'}"
			:icon="'list'"
			:title="getLocale.components.list"
			:width="40"
			@on-click="setActiveComponent('task-list')"
		/>
		<v-button
			class="toolbar__button"
			:class="{'toolbar__button--active': component === 'settings'}"
			:icon="'settings'"
			:title="getLocale.components.settings"
			:width="40"
			@on-click="setActiveComponent('settings')"
		/>
	</div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
import VButton from '@/components/blocks/VButton.vue';

export default {
	name: 'VToolbar',
	components: {
		VButton
	},
	methods: {
		...mapActions(["setActiveComponent"]),
	},
	computed: {
		...mapState({
			component: state => state.component.component
		}),
		...mapGetters(['getLocale'])
	}
}
</script>

<style lang="scss">
	.toolbar {
		padding: 10px 0;
		&__button {
			&:not(:last-child) {
				margin-right: 5px;
			}
		}
		&__button--active {
			box-shadow: 0 0 3px rgba($color: $color-brand, $alpha: 1);
		}
	}
</style>

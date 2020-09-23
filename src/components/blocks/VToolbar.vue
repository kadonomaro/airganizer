<template>
	<div class="toolbar">
		<v-button
			class="toolbar__button"
			:class="{'toolbar__button--active': getActiveComponent === 'calendar'}"
			:icon="'calendar'"
			:title="'Календарь'"
			:width="40"
			@on-click="setActiveComponent('calendar')"
		/>
		<v-button
			class="toolbar__button"
			:class="{'toolbar__button--active': getActiveComponent === 'task-list'}"
			:icon="'list'"
			:title="'Список'"
			:width="40"
			@on-click="setActiveComponent('task-list')"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import VButton from '@/components/blocks/VButton.vue';

export default {
	name: 'VToolbar',
	components: {
		VButton
	},
	methods: {
		setActiveComponent(name) {
			this.$store.dispatch('setActiveComponent', name);
		}
	},
	computed: {
		...mapGetters(['getActiveComponent'])
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

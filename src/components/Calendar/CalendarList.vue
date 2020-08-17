<template>
	<div class="calendar-list" v-if="day">
		<ul>
			<li v-for="(item, index) in list" :key="index">
				<span>{{item.data}}</span>
			</li>
		</ul>
		<calendar-form :storageKey="day"/>
	</div>
</template>

<script>
import CalendarForm from './CalendarForm';
import { LocalStorage } from '@/libs/LocalStorage';

export default {
	name: 'CalendarList',
	components: {
		CalendarForm
	},
	props: {
		day: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			storage: null
		}
	},
	created() {
		this.storage = new LocalStorage('dates')
	},
	computed: {
		list() {
			return this.storage.load().filter(item => item.title === this.day);
		}
	}
}
</script>

<style>

</style>

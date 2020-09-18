<template>
  <div class="list">
		<div class="container">
			<task-list-component />
		</div>
  </div>
</template>

<script>
import TaskListComponent from '@/components/TaskList/TaskListComponent.vue';

export default {
  name: 'List',
  components: {
    TaskListComponent
  }
}
</script>

<style lang="scss">
	.list {
		flex-grow: 1;
	}
</style>

<template>
  <div class="list">
    <task-list-component />
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

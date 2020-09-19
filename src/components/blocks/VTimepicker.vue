<template>
	<div class="timepicker">
		<input class="timepicker__input input" type="text" placeholder="ЧЧ:ММ">
		<div class="timepicker__dropdown" v-if="isOpen">
			<ul class="timepicker__list">
				<li class="timepicker__item" v-for="(_, hour) in 24" :key="hour">{{ hour }}</li>
			</ul>
			<ul class="timepicker__list">
				<li class="timepicker__item" v-for="(_, minute) in 60" :key="minute">{{ minute }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'VTimepicker',
	data() {
		return {
			isOpen: true
		}
	}
}
</script>

<style lang="scss">
	.timepicker {
		position: relative;
		z-index: 99;
		max-width: 100px;
		&__input {
			width: 100%;
		}
		&__dropdown {
			position: absolute;
			bottom: 0;
			display: flex;
			width: 100%;
			background-color: #ffffff;
			border-radius: $border-small-radius;
			box-shadow: 0 3px 7px rgba($color: #000000, $alpha: 0.3);
			transform: translateY(100%);
			overflow: hidden;
		}
		&__list {
			margin: 0;
			padding: 0;
			max-height: 160px;
			width: 50%;
			text-align: center;
			list-style: none;
			overflow-y: auto;
		}
		&__item {
			padding: 4px 0;
			cursor: pointer;
			transition: background-color 0.1s ease-in;
			&:hover {
				background-color: #ececec;
			}
		}
	}
</style>

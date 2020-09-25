<template>
	  <transition name="modal-fade">
    <div class="modal-overlay" @click.self="closeHandler">
      <div class="modal">
        <header class="modal__header">
          <slot name="header"></slot>
					<v-button
						class="modal__button-close"
						:icon="'close'"
						@on-click="closeHandler"
					/>
        </header>
        <div class="modal__body">
          <slot name="body"></slot>
        </div>
        <footer class="modal__footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import vButton from './VButton.vue';

export default {
  name: 'v-modal',
  components: {
    vButton
  },
  methods: {
    closeHandler() {
      this.$emit('close');
    }
  },
};
</script>

<style lang="scss">
	@import '@/assets/css/variables.scss';

  .modal-overlay {
		position: fixed;
		z-index: 9999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
		align-items: center;
		padding: 10px;
    background-color: rgba($color: #ffffff, $alpha: 0.7);
  }
  .modal {
		position: relative;
		z-index: 999;
    min-width: 300px;
    max-width: 600px;
		background-color: #ffffff;
		border-radius: $border-small-radius;
		box-shadow: 0 0 7px rgba($color: #000000, $alpha: 0.2);
    &__header,
    &__footer {
      display: flex;
      padding: 10px 10px;
    }
    &__header {
			position: relative;
			padding-right: 45px;
      justify-content: space-between;
      color: #ffffff;
      font-size: 18px;
			background-color: $color-background-dark;
			border-top-left-radius: $border-small-radius;
			border-top-right-radius: $border-small-radius;
    }
    &__body {
      position: relative;
      padding: 10px 10px;
      font-size: 16px;
    }
    &__footer {
			justify-content: flex-end;
			align-items: center;
      border-top: 1px solid $color-border;
    }
    &__button-close {
      position: absolute;
      top: 50%;
      right: 10px;
			transform: translateY(-50%);
		}
		&__button--ok {
			margin-left: 10px;
		}
  }
  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 0.3s ease
  }
</style>

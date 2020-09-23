<template>
	  <transition name="modal-fade">
    <div class="modal-overlay" @click.self="closeHandler">
      <div class="modal">
        <header class="modal__header">
          <slot name="header"></slot>
					<v-button
						class="modal__button modal__button--close"
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
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($color: #ffffff, $alpha: 0.7);
  }
  .modal {
		position: relative;
		z-index: 999;
    min-width: 300px;
    max-width: 600px;
		background: #ffffff;
		border-radius: 3px;
		overflow-x: auto;
		box-shadow: 0 3px 15px rgba($color: #000000, $alpha: 0.2);
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
    &__button {
      padding: 0;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
    &__button--close {
      position: absolute;
      top: 50%;
      right: 10px;
      width: 30px;
      height: 30px;
      background-image: url('~@/assets/icons/close.svg');
      background-size: 70%;
      background-repeat: no-repeat;
      background-position: center;
			border: 2px solid #ffffff;
			border-radius: 3px;
			transform: translateY(-50%);
			transition: background-color 0.2s ease-in, background-image 0.2s ease-in;
			&:hover,
			&:focus {
				background-color: #ffffff;
			}
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

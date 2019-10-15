<template>
  <div :class="['modal', {'active': active}]">
    <a class="modal-close" @click.prevent="closeModal" aria-label="close"></a>
    <div class="modal-content" role="document">
      <slot name="modal-content"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modal',
    props: {
      active: { type: Boolean, required: true }
    },
    methods: {
      closeModal () {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @mixin cover {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .modal {
    position: fixed;
    @include cover;
    z-index: 100;
    pointer-events: none;
    visibility: hidden;

    .modal-close {
      position: absolute;
      @include cover;
      background: rgba(#000,.5);
      opacity: 0;
      visibility: hidden;
      transition: var(--base-speed) ease;
    }

    .modal-content {
      text-align: center;
      background: white;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-top-left-radius: .8rem;
      border-top-right-radius: .8rem;
      padding: 2.2rem 0rem 1.6rem;
      transform: translate3d(0, 100%, 0);
      transition: var(--base-speed) ease;
    }
  }

  .modal.active {
    pointer-events: visible;
    visibility: visible;

    .modal-close {
      opacity: 1;
      visibility: visible;
    }

    .modal-content {
      transform: translate3d(0, 0, 0);
    }
  }
</style>
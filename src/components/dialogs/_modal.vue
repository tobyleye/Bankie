<template>
  <transition name="showModalContent">
    <div class="modal">
     <div class="modal-content" role="document">
        <slot name="modal-content"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal',
  }
</script>

<style lang="scss">

  .modal-close {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
    background: rgba(#000,.5);
  }

  .modal {
    z-index: 20;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    .modal-content {
      width: 100%;
      z-index: 30;
      text-align: center;
      background: white;
      border-radius: .8rem .8rem 0 0;
      padding: 2.2rem 0rem 1.6rem;
    }
  }

  .showModalOverlay-enter,
  .showModalOverlay-leave-to {
    opacity: 0;
  }

  .showModalContent-leave-to,
  .showModalContent-enter {
    transform: translate3d(0, 100%, 0);
  }

  // modal overlay
  .showModalOverlay-enter-active,
  .showModalOverlay-leave-active,
  // modal content
  .showModalContent-enter-active,
  .showModalContent-leave-active  {
    transition: .3s ease;
  }

  .showModalOverlay-leave-active {
    transition-delay: .3s;
  }
  
</style>
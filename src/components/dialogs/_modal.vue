<template>
  <!-- <transition> -->
    <div class="modal">
      <transition name="showoverlay"
        @after-enter="showContent = true"
        @after-leave="closeModal">
        <a class="modal-close" @click.prevent="showContent = false" aria-label="close" v-if="showOverlay"></a>
      </transition>
      <transition name="showcontent"
        @after-leave="showOverlay = false">
        <div class="modal-content" role="document" v-if="showContent">
          <slot name="modal-content"></slot>
        </div>
      </transition>
    </div>
  <!-- </transition> -->
</template>

<script>
  export default {
    name: 'modal',
    data: () => ({showOverlay: false, showContent: false}),
    methods: {
      closeModal () {
        this.$emit('close')
      }
    },
    mounted() {
      this.showOverlay = true;
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
    z-index: 20;
    position: fixed;
    @include cover;
    display: flex;
    align-items: flex-end;

    .modal-close {
      position: absolute;
      @include cover;
      background: rgba(#000,.4);
    }

    .modal-content {
      width: 100%;
      z-index: 30;
      text-align: center;
      background: white;
      border-radius: .8rem .8rem 0 0;
      padding: 2.2rem 0rem 1.6rem;
    }
  }

  // --- revert to this ---
  // .showmodal-enter,
  // .showmodal-leave-to {

  //   .modal-close {
  //     opacity: 0;
  //   }

  //   .modal-content {
  //     transform: translate3d(0, 100%, 0);
  //   }
  // }

  // .showmodal-enter-active,
  // .showmodal-leave-active {
  //   $transition-duration: .35s;

  //   transition: $transition-duration;

  //   .modal-content {
  //     transition: $transition-duration;
  //   }

  //   .modal-close {
  //     transition: $transition-duration;
  //     transition-delay: .2s;
  //   }
  // }

  .showoverlay-enter,
  .showoverlay-leave-to {
    opacity: 0;
  }

  .showoverlay-enter-active,
  .showoverlay-leave-active {
    transition: .2s;
  }

  .showcontent-enter,
  .showcontent-leave-to {
    transform: translate3d(0, 100%, 0);
  }

  .showcontent-enter-active,
  .showcontent-leave-active {
    transition: .3s;
  }

</style>
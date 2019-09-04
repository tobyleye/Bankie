<template>
  <modal id="code-renderer" :active="renderCode" @close="close">
    <template v-slot:modal-content>
      <p>Your code is </p>
      <input type="text" class="code" ref="code" :value="code" readonly>
      <div class="row">
        <a href="#" class="button" @click.prevent="copyCode">Copy</a>
        <a :href="`tel:${encodeURIComponent(code)}`" class="button">Call</a>
      </div>
    </template>
  </modal>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Modal from './_modal.vue';

  export default {
    name: 'CodeRenderer',
    components: {
      Modal
    },
    computed: {
      ...mapGetters([
        'renderCode',
        'code',
      ])
    },
    methods: {
      close () {
        this.$store.commit('DISMISS_RENDER_MODAL')
      },
      copyCode(evt) {
        this.$refs.code.select()
        document.execCommand("copy");
        evt.target.textContent = 'Copied!';
        setTimeout(() => {
          evt.target.textContent = 'Copy'
        }, 1200);
      }
    }
  }
</script>

<style lang="scss" scoped>

  .code {
    border: 0;
    outline: 0;
    margin: 1rem 0 1.6rem;
    font-family: inherit;
    font-size: 1.8rem;
    letter-spacing: .5px;
    color: var(--theme);
    font-weight: 600;
    text-align: center;
  }

  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2rem;
    border-top: 1px solid #f4f4f4;
    padding: 1.6rem 1rem 0;
  }

  .button {
    display: block;
    width: 100%;
    text-decoration: none;
    outline: 0;
    border: 1px solid var(--theme);
    border-radius: .3rem;
    background: none;
    color: var(--theme);
    font-size: 1.4rem;
    text-transform: uppercase;
    padding: .9rem 1.6rem;
    cursor: pointer;
  }
</style>
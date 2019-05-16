<template>
  <div class="render-code" role="dialog" aria-hidden="true" :class="{'visible': active}" :style="themeStyle">
    <div class="modal-close" @click="$emit('update:active', false)"></div>
    <div class="modal-content">
      <p>Your code is </p>
      <input type="text" class="code" ref="code" :value="code" readonly>
      <div class="row">
        <div class="half">
          <a href="javascript:void(0)" class="button" @click="copyCode">Copy</a>
        </div>
        <div class="half">
          <a :href="`tel:${encodeURIComponent(code)}`" class="button">Call</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'RenderCode',
    props: {
      active: {
        type: Boolean,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      theme: {
        type: String,
        required: true,
      }
    },
    computed: {
      themeStyle() {
        return `color: ${this.theme}`
      }
    },
    methods: {
      copyCode(evt) {
        this.$refs.code.select()
        document.execCommand("copy");
        evt.target.textContent = 'Copied!';
        setTimeout(() => {
          evt.target.textContent = 'Copy'
        }, 1000);
      }
    }
  }
</script>

<style>
  .code {
    border: 0;
    outline: 0;
    text-align: center;
    font-size: 18px;
    width: 100%;
    color: inherit;
    margin: .5em 0 1em;
  }

  .render-code .row {
    padding-top: 1em;
    border-top: 1px solid #f5f5f5;
  }

  .render-code .modal-content p {
    color: rgba(0,0,0,.8);
  }

  .row {
    display: flex;
    justify-content: space-between;
    padding: 0 1em;
  }

  .row .half {
    width: 48%;
  }

  a.button {
    display: block;
    width: 100%;
    text-decoration: none;
    outline: 0;
    border: 1px solid transparent;
    border-color: inherit;
    border-radius: 3px;
    font-size: 14px;
    background: none;
    color: inherit;
    text-transform: uppercase;
    padding: .6em 1em;
    cursor: pointer;
  }
</style>
<template>
  <div class="render-code" role="dialog" aria-hidden="true" :class="{'visible': active}">
    <div class="modal-close" @click="$emit('update:active', false)"></div>
    <div class="modal-content">
      <p>Your code is </p>
      <input type="text" class="code" ref="codeInput" :value="code" readonly>
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
        default: '*123#'
      }
    },
    methods: {
      copyCode(evt) {
        this.$refs.codeInput.select()
        document.execCommand("copy");
        evt.target.textContent = 'Copied!';
        setTimeout(() => {
          evt.target.textContent = 'Copy'
        }, 1000);
       // Todo:  Do some actual copying --
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
    color: #4c8ffb;
    margin: .5em 0 1em;
  }

  .render-code .row {
    padding-top: 1em;
    border-top: 1px solid #f5f5f5;
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
    border: 1px solid #3079ed;
    border-radius: 3px;
    font-size: 14px;
    background: none;
    color: #3079ed;
    text-transform: uppercase;
    padding: .6em 1em;
    cursor: pointer;
  }
</style>
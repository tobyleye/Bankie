<template>
  <header role="banner" class="header" id="header">
    <!-- inner slot : replaced by bank's logo in main-->
    <slot name="header-inner">
      <div class="intro header-inner">
        <h1 class="title">Bankie</h1>
        <p>Generate and save USSD code for<br>your bank without stress</p>
      </div>
    </slot>
    <!-- nav slot -->
    <slot name="nav"></slot>
  </header>
</template>


<script>
  export default {
    name: 'AppHeader',
  }
</script>

<style>
  .header {
    height: 180px;
    position: relative;
    z-index: 1;
    box-shadow: 0 1px 7px rgba(0,0,0,.4);
  }

  .header-inner {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2.5em 1em 4em;
  }
</style>

<style scoped>
  .intro {
    background: #2b5876;
    width: 100%;
    height: 100%;
  }
  
  .intro .title {
    font-size: 22px;
    color: #fff;
    line-height: 1.2;
  }

  .intro p {
    font-size: 14px;
    margin-top: 10px;
    color: #ccc;
  }

</style>

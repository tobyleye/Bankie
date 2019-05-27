<template>
  <header role="banner" class="app-header">
    <slot name="header-inner">
      <div class="intro header-inner">
        <h1 class="title">Bankie</h1>
        <p>Generate and save USSD code for<br>your bank without stress</p>
      </div>
    </slot>
    <slot name="nav"></slot>
  </header>
</template>


<script>
  export default {
    name: 'Header',
  }
</script>

<style>
  .app-header {
    height: 180px;
    text-align: center;
    position: relative;
    z-index: 1;
    box-shadow: 0 1px 7px rgba(0,0,0,.4);
  }
  
  .intro .title {
    font-size: 22px;
    line-height: 1.2;
  }

  .intro p {
    font-size: 14px;
    margin-top: 10px;
    color: #ccc;
  }
  
  .header-inner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2.5em 1em 4em;
  }

  .intro {
    background: #2b5876;
  }

  .intro .title {
    color: #fff;
  }

  .intro p {
    color: #ccc;
    margin-top: 10px;
    font-size: 14px;
  }
</style>

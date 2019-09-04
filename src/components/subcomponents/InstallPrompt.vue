<template>
  <div class="install-prompt" v-if="showInstallBanner">
    <div style="display: flex;">
      <img src="/static/icons/icon-20.png" alt="" style="margin-right: 4px;">
      <a href="#" class="install" @click.prevent="showA2HSPrompt">Install Bankie on your device</a>
    </div>
    <a href="#" class="close" @click.prevent="showInstallBanner = false">No, Thanks</a>
  </div>
</template>

<script>
  let installEvent;

  export default {
    name: "InstallPrompt",
    data: () => ({
      showInstallBanner: false
    }),
    
    created() {
      window.addEventListener('beforeinstallprompt', event => {
        event.preventDefault();
        this.showInstallBanner = true;
        installEvent = event;
      });
    },

    methods: {
      showA2HSPrompt() {
        this.showInstallBanner = false;
        installEvent.prompt();
        installEvent.userChoice.then(this.handleA2HSResponse);
      },

      handleA2HSResponse(choiceResult) {
        if (choiceResult.outcome == 'accepted') {
          // close custom prompt 
          this.showInstallBanner = false;
        }
      }
    }
  }
</script>

<style>
  .install-prompt {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1em;
    font-size: 14px;
    /*box-shadow: 0px -2px 5px rgba(0,0,0,.2);*/
    display: flex;
    background: #49555a;
    justify-content: space-between;
    align-items: center;
  }

  a.close {
    border: 0;
    display: inline-block;
    padding: 4px 10px;
    border-radius: 2px;
    background: #ea8585;
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
  }

  a.install {
    font-weight: 500;
    color: #fff;
  }
</style>
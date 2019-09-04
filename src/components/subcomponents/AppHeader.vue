<template>
  <header :style="headerStyle" class="header" id="header">
    <div v-if="step == 1" class="header_intro">
      <h1>Bankie</h1>
      <h2>Generate and save USSD code for<br>your bank without stress</h2>
    </div>
    <div v-else class="logo_holder">
      <img :src="'/static/logos/' + selectedBank.logo" alt="logo"/>
    </div>
    <nav class="header_toggles" role="tablist">
      <a href="#" v-if="step > 1" @click.prevent="previousStep" class="header_toggle active">
        <i style="margin-right: 20px;" class="material-icons sm">arrow_back</i>
        Back
      </a>
      <a href="#" v-if="step == 1" @click.prevent="switchTab('create')" :class="toggleClass('create')" role="tab">Create</a>
      <a href="#" @click.prevent="switchTab('saved')" :class="toggleClass('saved')" role="tab">Saved</a>
    </nav>
  </header>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'AppHeader',
    computed: {
      ...mapGetters([
        'step',
        'theme',
        'currentTab',
        'selectedBank'
      ]),
      headerStyle () {
        if (this.currentTab === 'create') {
          return { background: 'var(--theme)'}
        }
        return ''
      }
    },
    methods: {
      ...mapActions([
        'previousStep'
      ]),
      switchTab (tab) {
        this.$store.dispatch('resetToFirstStep')
        this.$store.commit('SWITCH_TAB', tab)
      },
      toggleClass(tab) {
        const header_toggle = 'header_toggle'
        if (tab == this.currentTab) {
          return header_toggle + ' active'
        }
        return header_toggle
      }
    }
  }
</script>

<style lang="scss">

  $toggle_height: 50px;

  .header {
    height: var(--app-header-size);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: $toggle_height;
    z-index: 10;
    background: #ca3e47;
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
  }

  .header_toggles {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: $toggle_height;
    
    .header_toggle {
      flex: 1;
      color: #fff;
      text-align: center;
      height: 100%;
      line-height: $toggle_height;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .header_toggle.active {
      border-bottom: 4px solid #fff;
    }
  }

  .header_intro {
    text-align: center;

    h1 {
      font-size: 1.8rem;
      color: #fff;
      text-transform: uppercase;
      margin-bottom: .8rem;
    }

    h2 {
      font-size: 1.4rem;
      color: #f6f8f9;
      font-weight: 400;
      line-height: 1.2;
    }
  }

  .logo_holder {
    width: 70px;
    height: 70px;
    background: #fff;
    padding: 10px;
    border-radius: 3px;
    animation: moon-slide var(--base-speed) ease;

    img {
      width: 100%;
      height: 100%;
    }
  }
</style>

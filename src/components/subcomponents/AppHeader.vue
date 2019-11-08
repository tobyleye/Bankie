<template>
  <header :style="headerStyle" class="header" id="header">
    <template>
      <div v-if="step == 1" class="header_intro">
        <h1>Bankie</h1>
        <h2>
          Generate and save USSD code for
          <br />your bank without stress
        </h2>
      </div>
      <div v-else class="logo_holder">
        <img :src="'/static/logos/' + selectedBank.logo" alt="logo" />
      </div>
    </template>
    <!-- toggles -->
    <nav class="header_toggles" role="tablist">
      <a href="#" v-if="step > 1" @click.prevent="previousStep" class="header_toggle active">
        <i style="margin-right: 20px;" class="material-icons sm">arrow_back</i>
        Back
      </a>
      <a
        href="#"
        v-if="step == 1"
        @click.prevent="switchTab('create')"
        :class="['header_toggle', {'active': currentTab == 'create'}]"
        role="tab"
      >Create</a>
      <a
        href="#"
        @click.prevent="switchTab('saved')"
        :class="['header_toggle', {'active': currentTab == 'saved'}]"
        role="tab"
      >Saved</a>
    </nav>
  </header>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AppHeader",
  computed: {
    ...mapGetters(["step", "theme", "currentTab", "selectedBank"]),
    headerStyle() {
      if (this.currentTab === "create") {
        return { background: "var(--theme)" };
      }
      return "";
    }
  },
  methods: {
    ...mapActions(["previousStep"]),
    switchTab(tab) {
      this.$store.dispatch("resetToFirstStep");
      this.$store.commit("SWITCH_TAB", tab);
    }
  }
};
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.header_toggles {
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: $toggle_height;

  .header_toggle {
    flex: 1;
    color: #fff;
    height: 100%;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  
    &.active::after {
      content: '';
      height: 4px;
      width: 100%;
      background: #fff;
      position: absolute;
      bottom: 0;
      // right: 0;
    }
  }
}

.header_intro {
  text-align: center;

  h1 {
    font-size: 1.8rem;
    color: #fff;
    text-transform: uppercase;
    margin-bottom: 0.8rem;
  }

  h2 {
    font-size: 1.4rem;
    color: #fbfbfb;
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
  animation: show var(--base-speed) ease;

  img {
    width: 100%;
    height: 100%;
  }
}

@keyframes show {
  from {transform: scale(0.4)}
  to {transform: scale(1)}
}
</style>

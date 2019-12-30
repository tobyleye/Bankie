<template>
  <div id="app">
    <app-header/>

    <main class="main">
      <create-tab v-if="currentTab == 'create'"/>
      <saved-tab v-else />
    </main>

    <!-- Install prompt -->
    <install-prompt/>
    
    <code-renderer/>
    <record-form/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  import InstallPrompt from '@/components/subcomponents/InstallPrompt';
  import AppHeader from '@/components/subcomponents/AppHeader.vue';
  import CreateTab from '@/components/tabs/Create.vue';
  import SavedTab from '@/components/tabs/Saved.vue';

  import CodeRenderer from '@/components/dialogs/CodeRenderer.vue';
  import RecordForm from '@/components/dialogs/RecordForm.vue'; 

  export default {
    name: 'app',

    components: {
      AppHeader,
      CreateTab,
      SavedTab,
      InstallPrompt,
      CodeRenderer,
      RecordForm
    },

    computed: {
      ...mapGetters([
        'theme',
        'step',
        'currentTab',
        'selectedBank',
        'showRecordForm',
        'renderCode'
      ])
    },
     watch: {
      theme() {
        // set css theme property
        document.documentElement.style
          .setProperty('--theme', this.theme)

        // only change browser tab color when current tab is create.
        if (this.currentTab === 'create') {
          document
            .querySelector('meta[name="theme-color"]')
            .setAttribute('content', this.theme);
        } 
        else {
          document
            .querySelector('meta[name="theme-color"]')
            .setAttribute('content', '#ca3e47' /* default theme*/)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import './styles/forms.css';
  @import './styles/layout.css';
  @import './styles/animations.css';
  @import './styles/lists.css';
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>

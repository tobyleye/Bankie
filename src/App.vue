<template>
  <div id="app">
    
    <app-header>
      <div 
        slot="header-inner" 
        class="header-inner" 
        :style="{background: theme}"
        v-if="step > 1">

        <div class="logo-holder">
          <img :src="selectedBankLogo" alt="logo">
        </div>
      </div>

      <nav slot="nav" class="nav">
        <div class="nav-inner">
          <div 
            v-if="step == 1" 
            class="tab" 
            @click="currentTab='create'; showSearchToggle = false;"
            >Create
          </div>

          <div 
            v-if="step > 1" 
            class="tab" 
            @click="previousStep">
              <i class="chevron-arrow-left"></i>
            Back
          </div>

          <div
            v-if="currentTab === 'create' || !showSearchToggle || !savedRecords.length" 
            class="tab" 
            @click="showSavedRecords">
            Saved
          </div>

          <div 
            v-if="currentTab === 'saved' && showSearchToggle && savedRecords.length" 
            class="tab" 
            @click="showSearchForm = !showSearchForm">🔍
          </div>

          <div :class="['nav-indicator', currentTab]"></div>
        </div>
      </nav>

    </app-header>

    <main class="main-wireframe">
      <create-tab 
        v-if="currentTab == 'create'"
        :transition="transition" 
        :step="step" 
        @nextStep="nextStep" 
        @onSelectBank="selectBank" 
        @generateCode="generateCode"
      />
      
      <saved-tab 
        v-else
        :showSearchForm="showSearchForm" 
        :savedRecords="savedRecords" 
        @viewRecord="viewRecord"
      />
    
    </main>
    
    <render-code 
      :active.sync="renderCode" 
      :code="code"
      :theme="theme"/>

    <view-record 
      :active.sync="showRecord"
      :record="record"
      @generateCode="generateCode"
      @deleteRecord="deleteRecord"/>

    <!-- Install Pprompt -->
    <install-prompt/>
    
  </div>
</template>

<script>
  import RenderCode from '@/components/subcomponents/RenderCode.vue';
  import ViewRecord from '@/components/subcomponents/ViewRecord.vue';
  import InstallPrompt from '@/components/subcomponents/InstallPrompt';
  import AppHeader from '@/components/subcomponents/AppHeader.vue';
  import CreateTab from '@/components/tabs/CreateTab.vue';
  import SavedTab from '@/components/tabs/SavedTab.vue';

  const _defaultTheme = '#2b5876'
 

  export default {
    name: 'app',

    components: {
      AppHeader,
      CreateTab,
      SavedTab,
      RenderCode,
      ViewRecord,
      InstallPrompt,
    },

    computed: {
      selectedBankLogo() {
        return `/static/logos/${this.selectedBank.logo}`
      }
    },
    data: () => ({
      selectedBank: null,
      savedRecords: localStorage['quick-numbers'] ? JSON.parse(localStorage['quick-numbers']) : [],
      step: 1,
      code: '',
      renderCode: false,
      transition: 'slide-left',
      currentTab: 'create', // default tab
      showRecord: false,
      record: {},
      showSearchForm: false, // show search form in saved tab
      showSearchToggle: false, // show search toggle
      theme: _defaultTheme
    }),

    watch: {
      theme() {
        document
          .querySelector('meta[name="theme-color"]')
          .setAttribute('content', this.theme);
      }
    },
    
    methods: {
      selectBank(bank) {
        this.selectedBank = bank;
        this.theme = this.selectedBank.theme;
      },
      previousStep() {
        this.transition = 'slide-right'
        this.step == 2 
          ? this.resetToFirstStep()
          : this.step--
      },
      nextStep() {
        this.transition = 'slide-left';
        this.step++;
      },
      resetToFirstStep() {
        this.step = 1;
        this.theme = _defaultTheme;
        this.selectedBank = null;
      },
      showSavedRecords() {
        this.showSearchToggle = this.savedRecords.length > 0;
        this.resetToFirstStep() // reset step 
        this.currentTab = 'saved';
      },
      saveRecord(record) {
        // check if record exist 
        const recordExist = this.savedRecords.find(
          el => record.action == el.action && record.number == el.number && record.bank == el.bank
        )
        if (recordExist) return;
        // get the max record id & increment by 1
        const id = this.savedRecords.reduce(function(acc, currentRecord) {
          if (currentRecord.id > acc.id) return currentRecord; 
        }, {id: 0}).id + 1;

        this.savedRecords.push({id, ...record})
        localStorage.setItem('quick-numbers', JSON.stringify(this.savedRecords));
      },
      generateCode(formDetails) {
        const { action, bank } = formDetails;
        // set theme
        this.theme = bank.theme;

        let code, amount, number, saveRecord, recordName, isSameBank;
        switch(action) {
          case 'menu': 
            code = bank.codes['menu']
            this.render(code);
            break;
          case 'balance': 
            code = bank.codes['balance']
            this.render(code);
            break;
          case 'airtime-others': 
            ({ amount, number, saveRecord, recordName } = formDetails);
            code = bank.codes['airtime-others'].replace('{{number}}', number)
                                               .replace('{{amount}}', amount);
            if (saveRecord && recordName) {
              this.saveRecord({
                action,
                number,
                bank: bank.name,
                type: 'phone',
                name: recordName,
              })
            }
            this.render(code);
            break;
          case 'airtime-self':
            ({ amount } = formDetails);
            code = bank.codes['airtime-self'].replace('{{amount}}', amount)
            this.render(code);
            break;
          case 'transfer':
            ({amount, number, isSameBank, saveRecord, recordName } = formDetails);
            code = isSameBank ? bank.codes['transfer-self'] : bank.codes['transfer-others']
            code = code.replace('{{number}}', number)
                       .replace('{{amount}}', amount);
            if (saveRecord && recordName) {
             this.saveRecord({
               action,
               number,
               isSameBank,
               bank: bank.name,
               type: 'account',
               name: recordName,
             })
            }
            this.render(code);
            break;
        }
      },
      render(code) {
        this.code = code;
        this.renderCode = true;
      },
      viewRecord(id) {
        this.record = this.savedRecords.find(record => record.id == id)
        this.showRecord = true;
      },
      deleteRecord(id) {
        this.savedRecords = this.savedRecords.filter(record => record.id !== id)
        localStorage.setItem('quick-numbers', JSON.stringify(this.savedRecords));
        
        this.record = null;
        this.showRecord = false;
      }
    }
  }
</script>

<style>
  @import url('./assets/styles/main.css');
</style>

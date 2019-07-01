<template>
  <div id="app">
    
    <Header>
      <div slot="header-inner" :style="{background: selectedBank.theme}"
        v-if="step != 1 && Object.keys(selectedBank).length" class="intro header-inner">
        <div class="logo-holder">
          <img :src="selectedBankLogo" alt="logo">
        </div>
      </div>

      <nav class="nav" slot="nav">
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

    </Header>

    <main class="main-wireframe">
      
      <CreateTab 
        v-if="currentTab == 'create'"
        :transition="transition" 
        :step="step" 
        @nextStep="nextStep" 
        @onSelectBank="selectBank" 
        @generateCode="generateCode"
      />
      
      <SavedTab 
        v-else
        :showSearchForm="showSearchForm" 
        :savedRecords="savedRecords" 
        @viewRecord="viewRecord"
      />
    
    </main>
    
    <RenderCode 
      :active.sync="renderCode" 
      :code="code"
      :theme="selectedBank.theme"/>

    <ViewRecord :active.sync="showRecord" 
      :record="record"
      :theme="selectedBank.theme"
      @generateCode="generateCode"
      @deleteRecord="deleteRecord"/>

    <!-- Install Pprompt -->
    <InstallPrompt/>
    
  </div>
</template>

<script>
  import RenderCode from '@/components/subcomponents/RenderCode.vue';
  import ViewRecord from '@/components/subcomponents/ViewRecord.vue';
  import InstallPrompt from '@/components/subcomponents/InstallPrompt';
  import Header from '@/components/subcomponents/Header.vue';
  import CreateTab from '@/components/tabs/CreateTab.vue';
  import SavedTab from '@/components/tabs/SavedTab.vue';

  const _defaultBank = {
     theme: '#2b5876', // default theme 
  }

  export default {
    name: 'app',
    components: {
      Header,
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
      selectedBank: _defaultBank,
      savedRecords: localStorage['quick-numbers'] ? JSON.parse(localStorage['quick-numbers']) : [],
      step: 1,
      code: '',
      renderCode: false,
      transition: 'slide-left',
      currentTab: 'create', // default tab
      showRecord: false,
      record: {},
      showSearchForm: false, // show search form in saved tab
      showSearchToggle: false // show search toggle
    }),
    watch: {
      selectedBank() {
        document
          .querySelector('meta[name="theme-color"]')
          .setAttribute('content', this.selectedBank.theme)
      }
    },
    methods: {
      selectBank(bank) {
        this.selectedBank = bank
      },
      previousStep() {
        this.transition = 'slide-right'
        if (this.step == 2) this.selectedBank = _defaultBank
        this.step--
        },
      nextStep() {
        this.transition = 'slide-left';
        this.step++;
      },
      resetToFirstStep() {
        this.step = 1;
        this.selectedBank = _defaultBank;
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
        
        this.record = {};
        this.showRecord = false;
      }
    }
  }
</script>

<style>
  @import url('./assets/styles/main.css');
</style>

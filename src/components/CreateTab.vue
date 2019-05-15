<template>
  <div>
    <transition :name="transition">
      <BankList v-if="step == 1" @onSelectBank="onSelectBank"/>
      <TransactionMenu 
        v-if="step == 2"
        :theme="selectedBank.theme"
        :menu="selectedBank.menu" 
        @onClickAction="onClickAction"/>
      <div class="form-container" v-if="step == 3">
        <TransferMoneyForm 
          v-show="formToShow == 'transfer'" 
          :selectedBank="selectedBank" 
          @submitForm="submitForm"/>
        <SendAirtimeForm 
          v-show="formToShow == 'airtime-others'" 
          :theme="selectedBank.theme"
          @submitForm="submitForm"/>
        <PurchaseAirtimeForm 
          v-show="formToShow == 'airtime-self'" 
          :theme="selectedBank.theme"
          @submitForm="submitForm"/>
      </div>
    </transition>
  </div>
</template>

<script>
  import BankList from './subcomponents/BankList.vue';
  import TransactionMenu from './subcomponents/TransactionMenu.vue';
  import SendAirtimeForm from './subcomponents/SendAirtimeForm.vue';
  import PurchaseAirtimeForm from './subcomponents/PurchaseAirtimeForm.vue';
  import TransferMoneyForm from './subcomponents/TransferMoneyForm.vue';

  export default {
    name: 'CreateTab',
    props: {
      step: {
        type: Number,
        default: 1,
      },
      transition:{
        type: String,
        required: true,
      }
    },
    data: () => ({
      formToShow: '',
      selectedBank:{},
    }),
    components: {
      BankList,
      TransactionMenu,
      SendAirtimeForm,
      PurchaseAirtimeForm,
      TransferMoneyForm
    },
    methods: {
      onSelectBank(evt) {
        this.$emit('onSelectBank', evt);
        this.selectedBank = evt;
        this.$emit('nextStep'); // next step
      },
      onClickAction(action) {
        if (action == 'menu' || action == 'balance') {
          return this.$emit('generateCode', {action, bank: this.selectedBank});
        }

        this.formToShow = action;
        this.$emit('nextStep'); // next step 
      },
      submitForm(formDetails) {
        this.$emit('generateCode', {
          bank: this.selectedBank, 
          ...formDetails,
        });
      }
    }
  }
</script>

<style>
  .form-container {
    margin-top: 1em;
    position: absolute;
    width: 100%;
  }
</style>
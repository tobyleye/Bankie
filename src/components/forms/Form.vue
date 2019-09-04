<template>
  <div class="content">
    <div class="form-container">
      <transfer-money-form
        v-if="action == 'transfer'"
        @submit-form="submitForm"
      />
      <send-airtime-form
        v-if="action == 'airtime-others'"
        @submit-form="submitForm"
      />
      <purchase-airtime-form 
        v-if="action == 'airtime-self'"
        @submit-form="submitForm"
      />
    </div>
  </div>
</template>

<script>
  import SendAirtimeForm from './SendAirtimeForm.vue'
  import TransferMoneyForm from './TransferMoneyForm.vue';
  import PurchaseAirtimeForm from './PurchaseAirtimeForm.vue';

  export default {
    name: 'Form',
    
    props: { 
      action: { type: String , required: true }
    },
    
    components: {
      SendAirtimeForm,
      PurchaseAirtimeForm,
      TransferMoneyForm
    },

    methods: {
      submitForm (formData) {
        let action = this.action;
        this.$store.dispatch('generateCode', { action, ...formData })

        if (formData.saveRecord && formData.recordName) {
          let record = {
            action,
            name: formData.recordName,
            number: formData.number,
            isSameBank: formData.isSameBank,
          }
          this.$store.dispatch('saveRecord', record)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-container {
    margin-top: 1.2rem;
    position: absolute;
    width: 100%;
  }
</style>
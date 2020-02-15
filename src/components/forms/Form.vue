<template>
  <div class="content">
    <div class="form-container">
      <component :is="activeForm" @submit-form="submitForm"/>
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
      active: { type: String , required: true }
    },
    
    components: {
      SendAirtimeForm,
      PurchaseAirtimeForm,
      TransferMoneyForm
    },

    computed: {
      activeForm () {
        // action to form mapping
        return ({
          'transfer': 'transfer-money-form',
          'airtime-others': 'send-airtime-form',
          'airtime-self': 'purchase-airtime-form'
        })[this.active]
      }
    },

    methods: {
      submitForm (formData) {
        let action = this.active;
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
    width: 100%;
  }
</style>
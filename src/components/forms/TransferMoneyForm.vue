<template>
  <form id="transfer-money" @submit.prevent="submit">
    
    <div class="form-group">
      <label for="account-number">Account Number</label>
      <input 
        v-model="formData.number" 
        type="number" 
        id="account-number" 
        min="0" 
        class="form-input" 
        placeholder="0123456789" 
        required
      >
    </div>

    <div class="form-group">
      <label for="amount-to-account">Amount</label>
      <input 
        v-model="formData.amount" 
        type="number" 
        id="amount-to-account" 
        min="50" 
        class="form-input" 
        placeholder="1000" 
        required
      >
      <div class="pills">
        <span class="pill"
          v-for="amt in [500, 1000, 2000, 5000, 10000, 20000]"
          :key="amt"
          @click="formData.amount = amt">
            &#8358;{{ amt.toLocaleString() }}
        </span>
      </div>
    </div>

    <div class="switch-group form-group">
      <div class="switch-label"> Is this {{ prefix }} {{ selectedBank.alias || selectedBank.name }} acount ?</div>
      <div class="onoffswitch">
        <input 
          v-model="formData.isSameBank" 
          type="checkbox" 
          class="onoffswitch-checkbox" 
          id="is-samebank"
        >
        <label for="is-samebank" class="onoffswitch-label"></label>
      </div>
    </div>

    <div class="switch-group form-group">
      <div class="switch-label">Save account number?</div>
      <div class="onoffswitch">
        <input 
          v-model="formData.saveRecord" 
          type="checkbox" 
          class="onoffswitch-checkbox" 
          id="save-account"
        >
        <label for="save-account" class="onoffswitch-label"></label>
      </div>
    </div>

    <div v-show="formData.saveRecord" class="form-group">
      <label for="account-name">Account Name</label>
      <input 
        type="text" 
        class="form-input" 
        v-model="formData.recordName" 
        id="account-name" 
        placeholder="Jane Doe" 
        :required="formData.saveRecord"
      >
    </div>
    
    <div class="submit">
      <button type="submit" class="button">Generate code</button>
    </div>
  </form>
</template>

<script>
  import { mapGetters } from 'vuex';
  
  export default {
    name: 'TransferMoneyForm',
   
    data: () => ({
      formData: {
        number: '',
        amount: '',
        recordName: '',
        isSameBank: false,
        saveRecord: false,
      }
    }),

    computed: {
      ...mapGetters([
        'selectedBank',
      ]),

      prefix() {
        const vowels = 'aeiou'
        const char = this.selectedBank.name[0].toLowerCase()
        return vowels.search(char) > -1 ? 'an' : 'a'
      }
    },

    methods: {
      submit() {
        this.$emit('submit-form', this.formData)
      }
    }
  }
</script>

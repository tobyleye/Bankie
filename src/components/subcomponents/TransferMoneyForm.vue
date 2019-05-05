<template>
  <form id="transfer-money" @submit.prevent="submitForm">
    <div class="form-group">
      <label for="account-number">Account Number</label>
      <input v-model="number" type="number" id="account-number" min="0" class="form-control" placeholder="0123456789" required>
    </div>
    <div class="form-group">
      <label for="amount-to-account">Amount</label>
      <input v-model="amount" type="number" id="amount-to-account" min="50" class="form-control" placeholder="1000" required>
      <div class="pills">
        <span class="pill"
          v-for="amt in [500, 1000, 2000, 5000, 10000, 20000]"
          :key="amt"
          @click="amount = amt">
            &#8358;{{ amt.toLocaleString() }}
        </span>
      </div>
    </div>
    <div class="switch-group form-group">
      <div class="switch-label"> Is this {{ prefix }} {{ selectedBank.shortName || selectedBank.name }} acount ?</div>
      <div class="onoffswitch">
        <input v-model="isSameBank" type="checkbox" class="onoffswitch-checkbox" id="is-samebank">
        <label for="is-samebank" class="onoffswitch-label"></label>
      </div>
    </div>
    <div class="switch-group form-group">
      <div class="switch-label">Save account number?</div>
      <div class="onoffswitch">
        <input v-model="saveRecord" type="checkbox" class="onoffswitch-checkbox" id="save-account">
        <label for="save-account" class="onoffswitch-label"></label>
      </div>
    </div>
    <div v-show="saveRecord" class="form-group">
      <label for="account-name">Account Name</label>
      <input type="text" class="form-control" v-model="recordName" id="account-name" placeholder="Jane Doe" :required="saveRecord">
    </div>
    
    <div class="submit">
      <button role="submit" class="button">Generate code</button>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'TransferMoneyForm',
    props: {
      selectedBank: {
        type: Object,
        required: true,
      }
    },
    data: () => ({
      number: '',
      amount: '',
      recordName: '',
      isSameBank: false,
      saveRecord: false,
    }),
    computed: {
      prefix() {
        const vowels = 'aeiou'
        const char = this.selectedBank.name[0].toLowerCase()
        return vowels.search(char) > -1 ? 'an' : 'a'
      }
    },
    methods: {
      submitForm() {
        const { number, amount, isSameBank, saveRecord, recordName } = this;
        this.$emit('submitForm', {
          amount,
          number,
          isSameBank,
          saveRecord,
          recordName,
          action: 'transfer',
        })
      }
    }
  }
</script>

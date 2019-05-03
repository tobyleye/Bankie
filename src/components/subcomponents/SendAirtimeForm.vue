<template>
  <form id="send-airtime" @submit.prevent="submitForm">
    <div class="form-group">
      <label for="phone-number">phone number</label>
      <input v-model="number" type="number" id="phone-number" class="form-control" min="50" placeholder="08012345678" required>
    </div>  
    <div class="form-group">
      <label for="amount-to-send">amount to send</label>
      <input v-model="amount" type="number" id="amount-to-send" class="form-control" min="0" placeholder="1000" required>
      <div class="pills">
        <span class="pill"
          v-for="amt in [100, 200, 500, 1000, 2000, 5000]"
          :key="amt"
          @click="amount = amt">
            &#8358;{{ amt.toLocaleString() }}
        </span>
      </div>
    </div>
    <div class="switch-group form-group">
      <div class="switch-label">Save phone number?</div>
      <div class="onoffswitch">
        <input v-model="saveRecord" type="checkbox" class="onoffswitch-checkbox" id="save-phone">
        <label for="save-phone" class="onoffswitch-label"></label>
      </div>
    </div>
    <div class="form-group" v-show="saveRecord">
      <label for="record-name">Name to save as</label>
      <input type="text" v-model="recordName" placeholder="Ada's MTN" class="form-control" id="record-name" :required="saveRecord">
    </div>
    <div class="submit">
      <button role="submit" class="button">generate code</button>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'SendAirtimeForm',
    data: () => ({
      number: '',
      amount: '',
      recordName: '',
      saveRecord: false 
    }),
    methods: {
      submitForm() {
        const { number, amount, saveRecord, recordName } = this;
        this.$emit('submitForm', {
          number,
          amount,
          saveRecord,
          recordName,
          action: 'airtime-others',
        })
      }
    }
  }
</script>

<template>
  <form id="send-airtime" @submit.prevent="submit">
    
    <div class="form-group">
      <label for="phone-number">phone number</label>
      <input 
        v-model="formData.number" 
        type="number" 
        id="phone-number" 
        class="form-input" 
        min="50" 
        placeholder="08012345678" 
        required
      >
    </div>

    <div class="form-group">
      <label for="amount-to-send">amount to send</label>
      <input 
        v-model="formData.amount" 
        type="number" 
        id="amount-to-send" 
        class="form-input" 
        min="0" 
        placeholder="1000" 
        required
      >
      <div class="pills">
        <span class="pill"
          v-for="amt in [100, 200, 500, 1000, 2000, 5000]"
          :key="amt"
          @click="formData.amount = amt">
            &#8358;{{ amt.toLocaleString() }}
        </span>
      </div>
    </div>

    <div class="switch-group">
      <div class="switch-label">Save phone number?</div>
      <div class="onoffswitch">
        <input 
          v-model="formData.saveRecord" 
          type="checkbox" 
          class="onoffswitch-checkbox" 
          id="save-phone"
        >
        <label for="save-phone" class="onoffswitch-label">
          <span class="onoffswitch-inner"></span>
          <span class="onoffswitch-switch"></span>
        </label>
      </div>
    </div>

    <div class="form-group" v-show="formData.saveRecord">
      <label for="record-name">Name to save as</label>
      <input 
        type="text" 
        v-model="formData.recordName" 
        placeholder="Jane's Airtel" 
        class="form-input" 
        id="record-name" 
        :required="formData.saveRecord"
      >
    </div>

    <div class="submit">
      <button type="submit" class="button">generate code</button>
    </div>
  </form>
</template>

<script>

  export default {
    name: 'SendAirtimeForm',

    data: () => ({
      formData: {
        number: '',
        amount: '',
        recordName: '',
        saveRecord: false 
      }
    }),

    methods: {
      submit() {
        this.$emit('submit-form', this.formData)
      }
    }
  }
</script>

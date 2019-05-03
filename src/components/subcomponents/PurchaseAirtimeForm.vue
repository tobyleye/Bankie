<template>
  <form id="purchase-airtime" @submit.prevent="submitForm">
    <div class="form-group">
      <label for="amount-to-purchase">amount to purchase</label>
      <input v-model="amount" type="number" id="amount-to-purchase" min="50" class="form-control" placeholder="1000" required>
      <div class="pills">
        <span class="pill"
          v-for="amt in [100, 200, 500, 1000, 2000, 5000]"
          :key="amt"
          @click="amount = amt">
            &#8358;{{ amt.toLocaleString() }}
        </span>
      </div>
    </div>
    <div class="submit">
      <button role="submit" class="button">generate code</button>
    </div>
  </form>
</template>

<script>
  export default {
    name: 'PurchaseAirtimeForm',
    data: () => ({
      amount: '',
    }),
    methods: {
      submitForm() {
        const { amount } = this;
        this.$emit('submitForm', {
          amount,
          action: 'airtime-self'
        })
      }
    }
  }
</script>

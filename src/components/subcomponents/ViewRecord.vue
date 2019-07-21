<template>
  <div class="view-record" role="dialog" :class="{'visible': active}">
    <div class="modal-close" @click="close"></div>
    <div class="modal-content">
      <p>How much do you want to send to {{ record.name}} ({{ record.number}})</p>
      <form @submit.prevent="submitForm">
        
        <div class="form-group">
          <input 
            type="number" 
            v-model="amount"
            min="50" 
            placeholder="1000" 
            class="form-control" 
            required
          >
          <div class="pills">
            <span class="pill"
              v-for="amt in suggestedAmounts"
              :key="amt"
              @click="amount = amt">
              {{ amt | naira }}
            </span>
          </div>
        </div>

        <div class="submit">
          <button role="submit" class="button">Generate code</button>
        </div>
        
      </form>
      <button 
        class="delete-record" 
        @click="$emit('deleteRecord', record.id)"><span>&times;</span>Delete this number
      </button>
    </div>
  </div>
</template>

<script>
  import banks from '@/banks.js';

  export default {
    name: 'ViewRecord',
    data: () => ({
      amount: '',
    }),
    props:{
      active: {
        type: Boolean,
        required: true,
      },
      record: {
        type: Object,
        required: true,
      }
    },
    computed: {
      suggestedAmounts() {
        if (this.record.type == 'phone') 
          return [100, 200, 500, 1000, 2000, 5000 ] 
        return [500, 1000, 2000, 5000, 10000, 20000]
      }
    },
    filters: {
      naira(value) {
        return `₦${value.toLocaleString()}`
      }
    },
    methods: {
      close() {
        this.$emit('update:active', false)
        this.amount = '';
      },
      submitForm() {
        const { amount } = this;
        const bank = banks.find(bank => bank.name === this.record.bank);
        this.$emit('update:active', false); // close viewrecord modal
        // wait before code is rendered
        setTimeout(() => {
          this.$emit('generateCode', {
            amount,
            ...this.record,
            bank,
          });
        }, 350)
        
        this.amount = '';
      }
    }
  }
</script>

<style>
  .view-record input {
    text-align: center;
  }

  .view-record .modal-content p {
    padding: 0 1em; 
    font-weight: 300;
  }

  .view-record .form-group {
    padding: .6em;
  }

  .view-record .submit {
    border-top: 1px solid #f5f5f5;
    padding-top: 1.3em;
  }

  .view-record .pills {
    max-width: fit-content;
    margin: .5em auto 0;
  }

  .view-record .submit .button {
    border-radius: 3px;
  }

  .view-record .submit {
    margin-bottom: 0;
  }
  
  .delete-record {
    border: 0;
    outline: 0;
    background: none;
    padding: .5em 1em;
    font: inherit;
    font-size: 16px;
    color: #555;
    display: inline-flex;
    align-items: center;
    color: #FF5722;
    cursor: pointer;
  }

  .delete-record span {
    display: inline-block;
    color: #999;
    margin-right: 5px;
  }
</style>

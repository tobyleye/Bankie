<template>
  <modal id="record-form" :active="showRecordForm" @close="closeRecordForm">
    <template v-slot:modal-content>
      <h4>How much do you want to send to {{ record.name }} ({{ record.number }})</h4>
      <form @submit.prevent="submit">
        <div class="form-group">
          <input 
            type="number" 
            v-model.trim="amount"
            min="50" 
            placeholder="1000" 
            class="form-input" 
            required
          >
          <div class="pills">
            <span class="pill"
              v-for="amt in suggestedAmounts"
              :key="amt"
              @click="amount = amt">
              &#8358;{{ amt.toLocaleString() }}
            </span>
          </div>
        </div>
        <div class="submit">
          <button type="submit" class="button">generate code</button>
        </div>
      </form>
      <button class="delete" @click="deleteRecord(record.index)">
        <i style="margin-right: 3px;" class="material-icons sm">delete</i>
        Delete number
      </button>
    </template>
  </modal>
</template>

<script>
  import { mapState } from 'vuex'
  import Modal from './_modal.vue';

  export default {
    name: 'RecordForm',
    components: {
      Modal
    },
    computed: {
      ...mapState([
        'showRecordForm',
        'record'
      ]),
      suggestedAmounts () {
        const { action = '' } = this.record;
        if (action.includes('airtime')) {
          return [100, 200, 500, 1000, 2000, 5000 ] 
        } 
        return [500, 1000, 2000, 5000, 10000, 20000]
      }
    },
    data () {
      return {
        amount: ''
      }
    },
    methods: {
      submit () {
        this.$store.commit('SET_SELECTED_BANK_ID', this.record.bank);

        this.$store.commit('DISMISS_RECORD_FORM')
        this.$store.dispatch('generateCode', { amount: this.amount, ...this.record })
        this.amount = '';
        this.$store.commit('CLEAR_RECORD')
        
      },
      closeRecordForm () {
        // todo: close recordform modal
        this.amount = ''
        this.$store.commit('DISMISS_RECORD_FORM')
      },
      deleteRecord (index) {
        this.$store.dispatch('deleteRecord', index)
        this.$store.commit('DISMISS_RECORD_FORM')
      }
    }
  }
</script>

<style lang="scss" scoped>
  h4 {
    font-size: 1.6rem;
    font-weight: 400;
  }

  input[type="number"] {
    text-align: center;
  }
  
  .submit {
    margin-bottom: 0;
    padding: 1rem;

    .button {
      border-radius: 3px;
      padding: .8rem 1.2rem;
      border-color: #4f81c7;
      color: #4f81c7;
    }
  }
  
  .pills {
    max-width: fit-content;
    margin: .5rem auto 0;
  }

  .delete {
    --red: #c76059;
  }
  
  .delete {
    border: 0;
    outline: 0;
    display: block;
    background: none;
    padding: .5rem 1rem;
    font: inherit;
    color: #555;
    display: inline-flex;
    align-items: center;
    color: var(--red);
    cursor: pointer;

    span {
      margin-right: .5rem;
    }
  }
</style>
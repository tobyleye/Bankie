<template>
  <div id="create">
    <transition :name="create_transition">
      <bank-list
        v-if="step == 1" 
        @select-bank="onSelectBank"
      />
      <transaction-menu 
        v-if="step == 2"
        :theme="selectedBank.theme"
        :transaction_menu="selectedBank.transaction_menu"
        @select-menu="onSelectMenu"
      />
      <b-form
        v-if="step == 3"
        :action="action"
      />
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  import BankList from '@/components/subcomponents/BankList.vue';
  import TransactionMenu from '@/components/subcomponents/TransactionMenu.vue';
  import Form from '@/components/forms/Form.vue'

  // move to constants
  const MAP_MENU_TO_ACTION = {
    'main menu': 'menu',
    'check account balance': 'balance',
    'send airtime': 'airtime-others',
    'purchase airtime': 'airtime-self',
    'transfer money': 'transfer'
  }

  export default {
    name: 'CreateTab',
    data: () => ({
      action: ''
    }),
    components: {
      BankList,
      TransactionMenu,
      'b-form': Form
    },

    computed: {
      ...mapGetters([
        'step',
        'create_transition',
        'selectedBank',
      ])
    },

    methods: {
      onSelectBank(bankId) {
        // this.$emit('select-bank', bank);
        this.$store.commit('SET_SELECTED_BANK_ID', bankId)
        this.$store.dispatch('nextStep');
      },
      onSelectMenu(menu) {
        let action = MAP_MENU_TO_ACTION[menu]

        if (
          // menu that don't require additional form
          // ... todo ...
          menu == 'main menu' || 
          menu == 'check account balance'
        ) {
          this.$store.dispatch('generateCode', {action});
        } else {
          this.action = action
          this.$store.dispatch('nextStep')
        }
      },
    }
  }
</script>
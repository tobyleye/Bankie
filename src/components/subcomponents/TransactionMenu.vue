<template>
  <div class="content">
    <ul class="list-group">
      <li 
        v-for="(menu, index) in transaction_menu" 
        class="list-group-item" 
        :key="index"
        @click="selectMenu(menu)">
        <i class="list-group-icon material-icons">radio_button_unchecked</i>
          {{ menu }}
        <i class="list-group-next material-icons sm" 
          v-if="menu !== 'main menu' && menu !== 'check account balance'">chevron_right</i>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'TransactionMenu',
    props: {
      transaction_menu: {
        type: Array,
        required: true,
      },
      theme: {
        type: String,
        required: true,
      }
    },

    methods: {
      selectMenu (menu) {
        this.$emit('select-menu', menu)
      }
    }
  }
</script>



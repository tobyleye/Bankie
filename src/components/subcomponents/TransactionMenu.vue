<template>
  <ul class="list-group">
    <li v-for="($, index) in menu" class="list-group-item" :key="index" @click="$emit('onClickAction', $.action)">
      <i :style="{borderColor: theme}" class="list-group-icon"></i>
        {{ $.title }}
      <i class="chevron-arrow-right" 
        v-show="$.action !== 'menu' && $.action !== 'balance'"></i>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'TransactionMenu',
    props: {
      menu: {
        type: Array,
        required: true,
      },
      theme: {
        type: String,
        required: true,
      }
    },
    methods: {
      onClick($) {
        switch($) {
          case 'transfer money':
            this.$emit('onClickAction', 'transfer')
            break;
          case 'send airtime':
            this.$emit('onClickAction', 'airtime-others')
            break;
          case 'purchase airtime':
            this.$emit('onClickAction', 'airtime-self');
            break;
          case 'check account balance':
            this.$emit('onClickAction', 'balance');
            break;
          case 'main menu': 
            this.$emit('onClickAction', 'menu');
            break;
        }  
      }
    }
  }
</script>

<style>
  .list-group-icon {
    content: '';
    width: 10px;
    height: 10px;
    display: inline-block;
    border: 1px solid #85D8CE;
    border-radius: 100%;
    margin-right: 20px;
  }
</style>


<template>
  <ul class="list-group">
    <li 
      v-for="(bank, index) in banks"
      :key="index"
      @click="$emit('onSelectBank', bank)"
      class="bank-item list-group-item">
        <img 
          :src="getLogoPath(bank.logo)" 
          alt="logo"
        >
        {{ bank.shortName || bank.name }}
        <i class="chevron-arrow-right"></i>
    </li>
    <!-- credit -->
    <li class="credit">Built with 💗 & 🍵 by <a target="_blank" href="https://twitter.com/ibenddrules">Toby</a></li>
  </ul>
</template>

<script>
  import banks from '@/banks.js';

  export default {
    name: 'BankList',

    data: () => ({
      banks
    }),

    methods: {
      getLogoPath(logo) {
        return `/static/logos/${logo}`
      }
    }
  }
</script>

<style>
  .bank-item {
    padding: 1.5rem 1.6rem !important;
  }  
</style> 

<style scoped>
  .credit {
    text-align: center;
    font-size: 12px;
    text-transform: none;
    padding: 1rem;
    background: #fbfbfb;
  }

  .credit a {
    color: #607D8B;
    font-weight: 500;
    text-decoration: none;
  }
</style>
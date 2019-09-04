<template>
  <div class="content">
    <ul class="list-group">
      <li v-for="bank in banks"
        :key="bank.id"
        @click="selectBank(bank.id)"
        class="bank-item list-group-item">
          <img :src="getLogoPath(bank.logo)" alt="logo">
          {{ bank.alias || bank.name }}
          <i class="list-group-next material-icons sm">chevron_right</i>
      </li>
      
    </ul>
    <!-- credit -->
     <p class="credit">Built with 💗 by <a target="_blank" href="https://twitter.com/ibenddrules">Toby</a></p>
  </div>
</template>

<script>
  export default {
    name: 'BankList',
    data: () => ({
      banks: require('@/banks_data.json')
    }),

    methods: {
      getLogoPath(logo) {
        return `/static/logos/${logo}`
      },
      selectBank (bankId) {
        this.$emit('select-bank', bankId);
      }
    }
  }
</script>

<style>
  
</style> 

<style lang="scss" scoped>
  .bank-item {
    padding: 2.2rem 2rem;

    img {
      width: 40px;
      height: 40px;
      margin-right: 2rem;
    }
  }  

  .credit {
    text-align: center;
    font-size: 13px;
    text-transform: none;
    padding: 1rem;
    background: #fbfbfb;

    a {
      font-weight: 500;
      color: inherit;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }

  }

</style>
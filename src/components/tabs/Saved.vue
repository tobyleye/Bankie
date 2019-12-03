<template>
  <div id="saved" role="tabpanel">
    <div class="content">
      <div v-if="this.savedRecords.length == 0" class="empty">
        <span role="img">😿</span>
        <p>no saved number</p>
        <p>When you generate a code you have the option to save <strong>locally</strong> to your device</p>
      </div>

      <ul id="record-list" v-else class="record-list">
        <li v-for="(record, index) in savedRecords" 
          :key="index"
          class="record-item list-group-item" 
          @click="viewRecord({index, ...record})"
        >
          <img :src="getBankLogo(record.bank)" alt="logo">
          <div class="record-item-info">
            <h3>{{ record.name }}</h3>
            <h5>{{ record.number }}</h5>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  import Banks from '@/banks_data.json';

  export default {
    name: 'SavedTab',

    computed: {
      ...mapGetters([
        'savedRecords'
      ])
    },

    methods: {
      getBankLogo(bankId) {
        const logo = Banks.find(bank => bankId === bank.id ).logo
        return `/static/logos/${logo}`
      },
      viewRecord(record) {
        this.$store.dispatch('viewRecord', record)
      }
    }
    
  }
</script>

<style lang="scss" scoped>

  .empty {
    margin: 7rem 3rem;
    text-align: center;
   
    span {
      font-size: 3rem;
      line-height: 1.1;
      margin-bottom: 14px; 
    }
  
    p:nth-of-type(1) {
      color: #f54811;
      margin: 1.2rem 0;
      font-size: 1.4rem;
      text-transform: uppercase;
    }
  }

  .record-item {
    padding: 2rem !important;
    display: flex;
    align-items: flex-start;

    img {
      height: 4rem;
      width: 4rem;
      margin-right: 2rem;
    }
  }

  .record-item-info {

    h3 {
      text-transform: uppercase;
      font-weight: 500;
      font-size: 1.3rem;
    }
    
    h5 {
      color: #888;
      font-weight: 300;
      letter-spacing: 1px;
      font-size: 1.3rem;
    }
  }
</style>
<template>
  <div class="empty" v-if="this.savedRecords.length == 0">
    <span>😿</span>
    <p>no saved number</p>
    <p>When you generate a code you have the option to save locally to your device</p>
  </div>
  <ul v-else class="record-list list-group">
    <transition-group name="list">
      <li class="list-group-item" v-for="record in savedRecords" 
        :key="record.id"
        @click="$emit('viewRecord', record.id)">
        <div class="record">
          <img :src="getBankLogo(record.bank)" alt="logo">
          <div>
            <div class="record-info"><span>{{ record.type }}</span> <span>{{ record.name}}</span></div>
            <div class="record-number">{{ record.number }}</div>
          </div>  
        </div>
      </li>
    </transition-group>
  </ul>
</template>

<script>
  import banks from '../banks.js';

  export default {
    name: 'SavedTab',
    props: {
      savedRecords: {
        type: Array,
        required: true,
      }
    },
    methods: {
      getBankLogo(bankName) {
        const logo = banks.find(bank => bank.name === bankName).logo
        return require(`../assets/logos/${logo}`)
      }
    }
  }
</script>

<style>

  .empty {
    margin: 7em 3em;
    text-align: center;
  }
  
  .empty p {
    font-size: 16px;
  }

  .empty span {
    font-size: 2.5em;
    line-height: 1.1;
    margin-bottom: 14px; 
  }
  
  .empty p:nth-of-type(1) {
    color: #f54811;
    margin: 12px 0;
    font-size: 14px;
    text-transform: uppercase;
  }

  .record-list .list-group-item {
    padding: 1.5em 1.6em;
  }

  .record {
    display: flex;
    align-items: center;
    text-transform: none;
  }

  .record-info span {
    display: block;
  }

  .record-info span:nth-child(2) {
    display: inline-block;
    font-size: 14px;
    font-weight: 600;
    color: #444;
    text-transform: capitalize;
  }

  .record-info span:nth-child(1) {
    font-size: 10px;
    font-weight: 300;
    margin-bottom: 1px;
    color: #999;
    text-transform: uppercase;
  }

  .record-number {
    color: #999;    
    margin-top: 5px;
    font-size: 12px;
    letter-spacing: 1px;
  }

  .record-info {
    font-size: 14px;
  }
  
  /* transition for saved list */
  .list-enter-active, .list-leave-active {
    transition: all .35s ease;
  }

  .list-leave-to {
    transform: translateX(100%);
  }
</style>
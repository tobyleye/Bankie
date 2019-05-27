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
          <div class="record-content">
            <span class="record-name">{{ record.name}}</span>
            <span class="record-number">{{ record.number }}</span>
            <span :style="getTypeStyle(record.type)" class="record-type">{{ record.type }}</span>
          </div>  
        </div>
      </li>
    </transition-group>
  </ul>
</template>

<script>
  import banks from '@/banks.js';

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
        return `/static/logos/${logo}`
      },
      getTypeStyle(type) {
        // a wrapper used to get the style applied to a specific record type 
        // use orange color for phone & a teal for account
        const color = (type == 'phone' ? '#ff9800' : '#009688');
        return `border-color: ${color}; color: ${color}`
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
   
  .record-content {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }

  .record-number {
    color: #999;    
    margin-bottom: 7px;
    font-size: 12px;
    letter-spacing: 1px;
  }
   
  .record-name {
    text-transform: capitalize;
    font-size: 14px;
    font-weight: 600;
  }

  .record-type {
    font-size: 8px;
    text-transform: uppercase;
    font-weight: 400;
    border: 1px solid #e0e0e0;
    border-radius: 40px;
    padding: 3px 12px;
    text-align: center;
    color: #444;
  }
  
  /* transition for saved list */
  .list-enter-active, .list-leave-active {
    transition: all .5s ease;
  }

  .list-leave-to {
    transform: translateX(100%);
  }
</style>
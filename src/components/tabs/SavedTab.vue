<template>  
  <div 
    class="empty" 
    v-if="this.savedRecords.length == 0">
      <span>😿</span>
      <p>no saved number</p>
      <p>When you generate a code you have the option to save locally to your device</p>
  </div>

  <div v-else>
    <div
      :class="{'search-form': true, visible: showSearchForm}">
        <input 
          type="text"
          v-model="searchText"
          placeholder="Who are you looking for ? 👀" 
        />
        <span
          role="button"
          v-show="searchText"
          @click="searchText = ''" 
          class="clear">&times;
        </span>
    </div>

    <ul
      v-if="filteredRecords.length" 
      class="record-list">
        <transition-group name="list">
          <li 
            v-for="record in filteredRecords" 
            :key="record.id"
            class="list-group-item" 
            @click="$emit('viewRecord', record.id)">
              <div class="record">
                <img 
                  :src="getBankLogo(record.bank)" 
                  alt="logo"
                >
                <div class="record-content">
                  <span class="record-name">{{ record.name}}</span>
                  <span class="record-number">{{ record.number }}</span>
                  <span :style="getTypeStyle(record.type)" class="record-type">{{ record.type }}</span>
                </div>
              </div>
          </li>
        </transition-group>
    </ul>

    <div
      v-else 
      class="record-list-empty">
        <span>👀</span>
        <p>Can't find who you looking for...</p>
    </div>

  </div>
</template>

<script>
  import banks from '@/banks.js';

  export default {
    name: 'SavedTab',
    props: {
      showSearchForm: {
        type: Boolean,
        required: true,
        default: false
      },
      savedRecords: {
        type: Array,
        required: true,
      }
    },
    data: () => ({
      searchText: '',
      showSearchInput: true
    }),
    computed: {
      filteredRecords() {
        if (this.showSearchInput && this.searchText) {
          return this.savedRecords.filter( ({ name }) => (
            name.toLowerCase().search(this.searchText.toLowerCase()) > -1
          ))
        } else {
          return this.savedRecords;
        }
      }
    },
    methods: {
      getBankLogo(bankName) {
        const logo = banks.find(bank => bank.name === bankName).logo
        return `/static/logos/${logo}`
      },
      getTypeStyle(type) {
        // get style applied to a specific record type 
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

  .search-form {
    max-height: 0px;
    position: relative;
    overflow-y: hidden;
    transition: max-height .25s ease; 
  }

  .search-form.visible {
    max-height: 70px; 
  }

  .search-form input[type="text"] {
    outline: 0;
    border: 0;
    display: block;
    width: 100%;
    font: inherit;
    padding: 20px 1rem;
    font-size: 14px;
    padding-right: 46px;
    background: #f4f5f6;
    transition: .25s ease-in;
  }

  .search-form input[type="text"]::placeholder {
    color: #888;
  }

  .search-form .clear {
    color: #222;
    font-size: 20px;
    position: absolute;
    top: 0px;
    right: 0;
    width: 46px;
    bottom: 0px;
    font-weight: 300;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .record-list-empty {
    text-align: center;
    padding: 4rem 1rem;
  }

  .record-list-empty span {
    font-size: 2.5rem;
    line-height: 1.1;
    margin-bottom: 9px;
  }

  .record-list .list-group-item {
    padding: 1em 1.2em;
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
    transition: all .3s ease-in;
  }

  .list-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }
</style>
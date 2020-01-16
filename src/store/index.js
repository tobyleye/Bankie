import Vue from 'vue';
import Vuex from 'vuex';

import Banks from '@/banks_data.json';

Vue.use(Vuex)

const SLIDE_LEFT = 'slide-left'
const SLIDE_RIGHT = 'slide-right'
const DEFAULT_THEME = '#ca3e47'

export default new Vuex.Store({
  state: {
    renderCode: false,
    code: null,
    step: 1,
    currentTab: 'create',
    create_transition: SLIDE_LEFT,
    selectedBankId: null,
    showRecordForm: false,
    record: {},
    savedRecords: JSON.parse(localStorage['quick-numbers'] || '[]')
  },
  getters: {
    theme: (state, getters) => getters.selectedBank.theme || DEFAULT_THEME,
    renderCode: state => state.renderCode,
    showRecordForm: state => state.showRecordForm,
    code: state => state.code,
    step: state => state.step,
    currentTab: state => state.currentTab,
    create_transition: state => state.create_transition,
    selectedBank: state => Banks.find(bank => bank.id == state.selectedBankId) || {},
    savedRecords: state => state.savedRecords
  },
  mutations: {
    SHOW_RENDER_MODAL (state) {
      state.renderCode = true
    },
    DISMISS_RENDER_MODAL (state) {
      state.renderCode = false
    },
    SET_CODE (state, code) {
      state.code = code
    },
    CLEAR_CODE (state) {
      state.code = null
    },
    SET_SELECTED_BANK_ID (state, bankId) {
      state.selectedBankId = bankId
    },
    CLEAR_SELECTED_BANK_ID (state) {
      state.selectedBankId = null
    },
    SET_TRANSITION (state, transition) {
      state.create_transition = transition
    },
    SET_STEP (state, step) {
      state.step = step
    },
    SWITCH_TAB (state, tab) {
      state.currentTab = tab;
    },
    ADD_NEW_RECORD (state, record) {
      state.savedRecords.unshift(record)
    },
    SET_RECORD (state, record) {
      state.record = record
    },
    CLEAR_RECORD (state) {
      state.record = {}
    },
    SHOW_RECORD_FORM (state) {
      state.showRecordForm = true
    },
    DISMISS_RECORD_FORM (state) {
      state.showRecordForm = false
    },
    UPDATE_RECORDS (state, records) {
      state.savedRecords = records
    }
  },
  actions: {
    previousStep ({ commit, state, dispatch }) {
      commit('SET_TRANSITION', SLIDE_RIGHT)
        if (state.step == 2) {
          dispatch('resetToFirstStep')
        } else {
          commit('SET_STEP', state.step - 1)
        }
    },
    nextStep ({ commit, state }) {
      commit('SET_TRANSITION', SLIDE_LEFT)
      commit('SET_STEP', state.step + 1)
    },
    resetToFirstStep ({ commit }) {
      // reset to first step
      commit('SET_STEP', 1)
      commit('CLEAR_CODE')
      commit('CLEAR_SELECTED_BANK_ID')
    },
    generateCode ({ getters, dispatch }, formData ) {
      // code is generated here
     let { action } = formData;
      let bank = getters.selectedBank;
      let code;

      switch(action) {
        case 'menu': 
          code = bank.codes['menu']
          break
        
        case 'balance': 
          code = bank.codes['balance']
          break

        case 'airtime-others': 
          code = bank.codes['airtime-others']
            .replace('{{number}}', formData.number)
            .replace('{{amount}}', formData.amount);
          break

        case 'airtime-self':
          code = bank.codes['airtime-self'].replace('{{amount}}', formData.amount)
          break

        case 'transfer':
          code = formData.isSameBank ? bank.codes['transfer-self'] : bank.codes['transfer-others']
          code = code.replace('{{number}}', formData.number)
            .replace('{{amount}}', formData.amount)
          break
      }

      if (code) {
        dispatch('renderCode', code)
      }
    },
    renderCode ({ commit }, code) {
      commit('SET_CODE', code)
      commit('SHOW_RENDER_MODAL');
    },
    saveRecord ({ commit, state }, record) {
      // ... todo ... 
      // check if record exist
       
      const recordExist = false

      if (!recordExist) {
        // save new record to store
        commit('ADD_NEW_RECORD', {...record, bank: state.selectedBankId})
        // save new record to storage
        localStorage.setItem('quick-numbers', JSON.stringify(state.savedRecords));
      }
    },
    viewRecord({ commit }, record) {
      commit('SET_RECORD', record)
      commit('SHOW_RECORD_FORM');
    },
    deleteRecord({ commit, getters }, record_index) {
      // filter out record by index
      const records = getters.savedRecords.filter((_, index) => record_index !== index)
      // save updated records to storage
      localStorage.setItem('quick-numbers', JSON.stringify(records));
      commit('UPDATE_RECORDS', records)
    }
  }
})
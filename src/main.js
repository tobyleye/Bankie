import Vue from 'vue'
import App from '@/App.vue'
import runtime from 'serviceworker-webpack-plugin/lib/runtime'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    runtime.register();
  })
}

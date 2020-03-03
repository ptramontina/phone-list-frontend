import Vue from 'vue'
import App from './App.vue'
import { router } from './router'

//Bulma
import './assets/scss/main.scss'

//FontAwesome
import '@fortawesome/fontawesome-free/js/all'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

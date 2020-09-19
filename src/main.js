import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
import Toasted from 'vue-toasted';
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

Vue.use(Toasted)

Vue.config.productionTip = false

// Ready translated locale messages
const messages = {
  en: {
    message: {
      hello: 'hello world',
      editor: 'Editeur'
    }
  },
  fr: {
    message: {
      hello: 'Bonjour',
      publish_date: 'Date de publication',
      month: 'mois'
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'fr', // set locale
  messages, // set locale messages
})


new Vue({
  router,
  i18n,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')

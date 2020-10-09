import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
import Toasted from 'vue-toasted';
import VueI18n from 'vue-i18n'
import VuePellEditor from 'vue-pell-editor'
import axios from 'axios';

Vue.use(VueI18n)


Vue.use(VuePellEditor)

Vue.use(Toasted)

Vue.config.productionTip = false

Vue.prototype.$api = 'http://localhost:1337'
Vue.prototype.$axios = axios;

// Ready translated locale messages

const messages = {
  en: {
    message: {
      hello: 'hello world',
      editor: 'Editeur',
      upload: 'Importer'
    }
  },
  fr: {
    message: {
      hello: 'Bonjour',
      publish_date: 'Date de publication',
      month: 'mois',
      upload: 'Importer'
    },
    app:{},
    apps:{},
    success:{},
    home:{},
    menu:{},
    creators:{},
    error:{},
    label:{},
    categories:{},
    button:{
      submit_for_check: 'Soumettre pour vérification'
    }
  }
}

// Fr
messages.fr.apps.status_pending = "En attente";
messages.fr.apps.status_draft = "Brouillon";
messages.fr.message.update_at = "Mise à jours le"
messages.fr.home.TopOfCatName = `Top {name}`;
messages.fr.home.seeAll = `Tout voir`;
messages.fr.menu.home = `Accueil`;
messages.fr.menu.creators = `Espace Créateurs`;
messages.fr.categories.games = `Jeux`;
messages.fr.categories.apps = `Appli`;
messages.fr.categories.tool = `Outils`;
messages.fr.categories.social_network = `Réseau social`;
messages.fr.creators.yourApplications = `Vos applications`;
messages.fr.creators.logout = `Déconnexion`;
messages.fr.error.noAppHere = `Oups ! Rien par ici !`;
messages.fr.label.yourAppName = `Nom de votre application`;
messages.fr.label.yourAppCategorie = `Catégorie`;
messages.fr.label.yourAppUrl = `Lien d'accès`;
messages.fr.label.yourAppLogo = `Icone (512x512)`;
messages.fr.label.yourAppDescription = `Description`;
messages.fr.label.yourAppImages = `Captures d'écrans`;
messages.fr.label.yourAppEditor = `Editeur`;
messages.fr.label.chooseFile = `Choisir un fichier`;
messages.fr.button.submit_draft = `Enregistrer le brouillon`;
messages.fr.button.edit = `Editer`;
messages.fr.button.publish = `Publier`;
messages.fr.button.delete = `Supprimer`;
messages.fr.app.go = `Accéder`;
messages.fr.success.submitSuccess = `Envoi effectué...`;
messages.fr.error.fieldsForgot = `Les champs marqués d'une <b>*</b> sont obligatoire`;


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

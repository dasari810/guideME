import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import * as firebase from 'firebase'
import { store } from './store/index'
import 'particles.js';

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyBZtQeHz1Tmnuu9iOWJlgAPeTdQ9KSzQsM",
      authDomain: "guideme-784d0.firebaseapp.com",
      databaseURL: "https://guideme-784d0.firebaseio.com",
      projectId: "guideme-784d0",
      storageBucket: "guideme-784d0.appspot.com",
      messagingSenderId: "986335674569",
      appId: "1:986335674569:web:eb8653285098a319728d18",
      measurementId: "G-BXR81M4SE0"
    })
    this.$store.dispatch('loadTopics')
  }
}).$mount('#app')

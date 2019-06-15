import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

const localEnv = require('./mysetting.env')


Vue.config.productionTip = false
const firebaseConfig = localEnv["FIRE_BASE"]

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
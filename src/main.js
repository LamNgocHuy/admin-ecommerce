import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'boxicons/css/boxicons.min.css'
import router from './router/routes'
import store from './store'
import Vuelidate from 'vuelidate'
import VTooltip from 'v-tooltip'
import Notifications from 'vue-notification'
import firebase from 'firebase'

Vue.use(VTooltip);
Vue.use(Notifications);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyD2DNdNMwW6g0_Y3bs8B7qh_lE9D60oBy8",
  authDomain: "fluent-music-310104.firebaseapp.com",
  projectId: "fluent-music-310104",
  storageBucket: "fluent-music-310104.appspot.com",
  messagingSenderId: "654071414652",
  appId: "1:654071414652:web:650a1afef993bfcc5c6ef9",
  measurementId: "G-QRSJZ6SQEN"
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

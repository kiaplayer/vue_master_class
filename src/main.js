// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as firebase from 'firebase'

import AppDate from './components/AppDate'
Vue.component('AppDate', AppDate)

Vue.config.productionTip = false

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCe_AyAL1xf9tNn7kbgotY_6QNUi2Y39hM',
  authDomain: 'vue-school-forum-9e7bc.firebaseapp.com',
  databaseURL: 'https://vue-school-forum-9e7bc.firebaseio.com',
  projectId: 'vue-school-forum-9e7bc',
  storageBucket: 'vue-school-forum-9e7bc.appspot.com',
  messagingSenderId: '724884500624',
  appId: '1:724884500624:web:d78e5087fa3833a19ce815',
  measurementId: 'G-F5P1BWJDHH'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
require("babel-core/register");
require("babel-polyfill");

// import vue Resource
import VueResource from 'vue-resource';

Vue.use(VueResource);

// Vue.use(axios)



new Vue({
  el: '#app',
  render: h => h(App)
})

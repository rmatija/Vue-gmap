import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAOMuZ7Jw1YKmflDV-iULHkxl5_O0bHEQs',
    },
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

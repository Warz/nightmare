import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueCompositionApi from '@vue/composition-api';
Vue.use(VueCompositionApi);

new Vue({
  render: h => h(App),
}).$mount('#app')

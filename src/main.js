import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as moment from 'moment';

import formatFilter from '@/filters/format.filter';

moment.updateLocale('ru', {
	week: {
		dow: 1
	}
});

Vue.filter('format', formatFilter);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

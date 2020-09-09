import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as moment from 'moment';
import Vuelidate from 'vuelidate';
import '@/assets/css/style.scss';

import formatFilter from '@/filters/format.filter';

moment.updateLocale('ru', {
	week: {
		dow: 1
	}
});

const firebaseConfig = {
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
	appId: process.env.VUE_APP_FIREBASE_APP_ID
};


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
export { auth, database };

Vue.use(Vuelidate);
Vue.filter('format', formatFilter);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

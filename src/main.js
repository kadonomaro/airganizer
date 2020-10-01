import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment';
import 'moment/locale/ru';
import Vuelidate from 'vuelidate';
import VueMeta from 'vue-meta'
import '@/assets/css/style.scss';

import formatFilter from '@/filters/format.filter';
import localizationFilter from '@/filters/localization.filter';

moment.updateLocale('ru', {
	week: {
		dow: 1
	}
});

const firebaseDevConfig = {
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
	appId: process.env.VUE_APP_FIREBASE_APP_ID
};

const firebaseProdConfig = {
	apiKey: 'AIzaSyDo_a33atZd7WdJNW7pDZwr5gnfYWk6iss',
	authDomain: 'airganizer-app.firebaseapp.com',
	databaseURL: 'https://airganizer-app.firebaseio.com',
	projectId: 'airganizer-app',
	storageBucket: 'airganizer-app.appspot.com',
	messagingSenderId: '946242446859"',
	appId: '1:946242446859:web:ee45eee0740c7417abc90e'
};


firebase.initializeApp(process.env.NODE_ENV === 'production' ? firebaseProdConfig : firebaseDevConfig);
const auth = firebase.auth();
const database = firebase.database();
export { auth, database };

Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.filter('format', formatFilter);
Vue.filter('localization', localizationFilter);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

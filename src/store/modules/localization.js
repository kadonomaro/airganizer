import ru from '@/locales/ru.json';
import en from '@/locales/en.json';

const locales = { ru, en }

export default {
	state: {
		language: 'en'
	},
	mutations: {

	},
	actions: {

	},
	getters: {
		getLanguage(state) {
			return state.language;
		},

		getLocale(state) {
			return locales[state.language];
		}
	}
};

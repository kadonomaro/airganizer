import { LocalStorage } from '@/libs/LocalStorage';
import ru from '@/locales/ru.json';
import en from '@/locales/en.json';

const localization = new LocalStorage('localization');
const locales = { ru, en };

export default {
	state: {
		language: 'ru'
	},
	mutations: {
		INIT_LANGUAGE(state, language) {
			language.length ? state.language = language : state.language = 'ru';
		},

		SET_LANGUAGE(state, language) {
			state.language = language
		}
	},
	actions: {
		fetchLocalization({ commit }) {
			commit('INIT_LANGUAGE', localization.load());
		},

		changeLanguage({ commit, state }, language) {
			commit('SET_LANGUAGE', language);
			localization.save(state.language);
		}
	},
	getters: {
		getLocale(state) {
			return locales[state.language];
		}
	}
};

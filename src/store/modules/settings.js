import { LocalStorage } from '@/libs/LocalStorage';
const settings = new LocalStorage('settings');

export default {
	state: {
		settings: {
			removeTaskConfirm: true,
			showCompletedTasks: true,
			еditingExpiredTasks: false
		}
	},
	mutations: {
		INIT_SETTINGS(state, settings) {
			Object.keys(settings).length ? state.settings = settings : state.settings;
		},

		SET_SETTINGS(state, type) {
			state.settings[type] = !state.settings[type];
		}
	},
	actions: {
		fetchSettings({ commit }) {
			commit('INIT_SETTINGS', settings.load());
		},

		updateSettings({ commit, state }, type) {
			commit('SET_SETTINGS', type);
			settings.save(state.settings);
		}
	},
	getters: {
		getSettings(state) {
			return state.settings;
		}
	}
};

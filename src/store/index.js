import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './modules/auth';
import settingsModule from './modules/settings';
import componentModule from './modules/component';
import { LocalStorage } from '../libs/LocalStorage';
import { Database } from '../api/Database';

Vue.use(Vuex)

const storage = new LocalStorage('days');
const db = new Database();

export default new Vuex.Store({
	state: {
		days: {}
	},
	mutations: {
		INIT_DATA(state, data) {
			state.days = data;
		},

		UPDATE_DATA(state, { day, value }) {
			state.days[day]
				? state.days[day].data.push(value)
				: state.days = { ...state.days, [day]: { data: [value] } };
			storage.save(state.days);
		},

		CHANGE_TASK(state, { day, task }) {
			let current = state.days[day].data.find(item => item.id === task.id);
			Object.assign(current, task);
			storage.save(state.days);
		},

		REMOVE_TASK(state, { day, task }) {
			state.days[day].data = state.days[day].data.filter(item => item.id !== task.id);
			if (!state.days[day].data.length) delete state.days[day];
			storage.save(state.days);
		}
	},
	actions: {
		fetchData({ commit, dispatch, state }) {
			dispatch('checkUserAuthStatus').then((status) => {
				if (status) {
					db.load(state.authorization.user.id).then(data => {
						commit('INIT_DATA', { ...storage.load(), ...data });
					});
				} else {
					commit('INIT_DATA', storage.load());
				}
			});
		},

		addTask({ commit, state }, data) {
			commit('UPDATE_DATA', data);
			if (state.authorization.user.isLoggedIn) {
				db.update(state.authorization.user.id, data.day, state.days[data.day]);
			}
		},

		changeTask({ commit, state }, data) {
			commit('CHANGE_TASK', data);
			if (state.authorization.user.isLoggedIn) {
				db.update(state.authorization.user.id, data.day, state.days[data.day]);
			}
		},

		removeTask({ commit, state }, data) {
			commit('REMOVE_TASK', data);
			if (state.authorization.user.isLoggedIn) {
				db.update(state.authorization.user.id, data.day, state.days[data.day]);
			}
		}
	},
	getters: {
		getDateByDay(state) {
			return (day) => {
				return state.days[day];
			};
		},

		getDateByAllDays(state) {
			return Object.fromEntries(Object.entries(state.days).sort((a, b) => {
				const date1 = new Date(a[0].replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
				const date2 = new Date(b[0].replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
				return date1 - date2;
			}));
		},

		getDayTasksMarkers(state) {
			return (day) => {
				return [
					{
						type: 'active',
						count: state.days[day]?.data.filter(item => {
							return item.completed === false && item.priority === 'low';
						}).length
					},
					{
						type: 'completed',
						count: state.days[day]?.data.filter(item => {
							return item.completed === true;
						}).length
					},
					{
						type: 'high',
						count: state.days[day]?.data.filter(item => {
							return item.priority === 'high' && item.completed === false;
						}).length
					}
				];
			}
		}
	},
	modules: {
		authorization: authModule,
		component: componentModule,
		settings: settingsModule
	}
});

import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import settingsModule from './modules/settings';
import componentModule from './modules/component';
import { auth } from '../main';
import { LocalStorage } from '../libs/LocalStorage';
import { Database } from '../api/Database';

Vue.use(Vuex)

const storage = new LocalStorage('days');
const db = new Database();

export default new Vuex.Store({
	state: {
		days: {},
		user: {
			id: '',
			name: '',
			email: '',
			isLoggedIn: false
		},
		auth: {
			error: ''
		}
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
		},

		CHANGE_TASK_COMPLETE(state, { day, task }) {
			const current = state.days[day].data.find(item => item.id === task.id);
			current.completed === true ? current.completed = false : current.completed = true;
			storage.save(state.days);
		},

		CHANGE_TASK_PRIORITY(state, { day, task }) {
			const current = state.days[day].data.find(item => item.id === task.id);
			current.priority === 'high' ? current.priority = 'low' : current.priority = 'high';
			storage.save(state.days);
		},

		SET_USER(state, user) {
			state.user.id = user.id;
			state.user.name = user.name;
			state.user.email = user.email;
			state.user.isLoggedIn = true;
		},

		REMOVE_USER(state) {
			state.user.id = '';
			state.user.name = '';
			state.user.email = '';
			state.user.isLoggedIn = false;
		},

		CHANGE_ERROR_CODE(state, error) {
			state.auth.error = error;
		}
	},
	actions: {
		checkUserAuthStatus({ commit }) {
			return new Promise(resolve => {
				auth.onAuthStateChanged(user => {
					if (user) {
						commit('SET_USER', { id: user.uid, name: user.displayName, email: user.email });
						resolve(true);
					} else {
						resolve(false);
					}
				});
			});
		},

		fetchData({ commit, dispatch, state }) {
			dispatch('checkUserAuthStatus').then((status) => {
				if (status) {
					db.load(state.user.id).then(data => {
						commit('INIT_DATA', { ...storage.load(), ...data });
					});
				} else {
					commit('INIT_DATA', storage.load());
				}
			});
		},

		addTask({ commit, state }, data) {
			commit('UPDATE_DATA', data);
			if (state.user.isLoggedIn) {
				db.update(state.user.id, data.day, state.days[data.day]);
			}
		},

		changeTask({ commit, state }, data) {
			commit('CHANGE_TASK', data);
			if (state.user.isLoggedIn) {
				db.update(state.user.id, data.day, state.days[data.day]);
			}
		},

		completeTask({ commit, state }, data) {
			commit('CHANGE_TASK_COMPLETE', data);
			if (state.user.isLoggedIn) {
				db.update(state.user.id, data.day, state.days[data.day]);
			}
		},

		removeTask({ commit, state }, data) {
			commit('REMOVE_TASK', data);
			if (state.user.isLoggedIn) {
				db.update(state.user.id, data.day, state.days[data.day]);
			}
		},

		changePriority({ commit, state }, data) {
			commit('CHANGE_TASK_PRIORITY', data);
			if (state.user.isLoggedIn) {
				db.update(state.user.id, data.day, state.days[data.day]);
			}
		},

		async login({ commit, state }, user) {
			try {
				const response = await auth.signInWithEmailAndPassword(user.email, user.password);
				if (response.user) {
					commit('SET_USER', { id: response.user.uid, name: response.user.displayName, email: user.email });
					router.replace({ name: 'Home' });
					if (Object.keys(state.days).length) {
						db.fill(state.user.id, state.days);
					}
				}
			} catch (error) {
				commit('CHANGE_ERROR_CODE', error.code);
				setTimeout(() => {
					commit('CHANGE_ERROR_CODE', '');
				}, 3000);
			}
		},

		async logout({ commit, state }) {
			try {
				await auth.signOut();
				commit('REMOVE_USER');
				if (Object.keys(state.days).length) {
					storage.save(state.days);
				}
			} catch (error) {
				commit('CHANGE_ERROR_CODE', error.code);
				setTimeout(() => {
					commit('CHANGE_ERROR_CODE', '');
				}, 3000);
			}
		},

		async registration({ commit }, user) {
			try {
				const response = await auth.createUserWithEmailAndPassword(user.email, user.password);
				await response.user.updateProfile({
					displayName: user.name
				});
				commit('SET_USER', {
					id: response.user.uid,
					name: response.user.displayName,
					email: user.email
				});
				router.replace({ name: 'Home' });
			} catch (error) {
				commit('CHANGE_ERROR_CODE', error.code);
				setTimeout(() => {
					commit('CHANGE_ERROR_CODE', '');
				}, 3000);
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
		},

		getUserName(state) {
			return state.user.name;
		},

		getAuthStatus(state) {
			return state.user.isLoggedIn;
		},

		getAuthError(state) {
			return state.auth.error;
		}
	},
	modules: {
		component: componentModule,
		settings: settingsModule
	}
});

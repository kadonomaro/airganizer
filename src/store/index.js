import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router';
import { auth, database } from '../main';
import { LocalStorage } from '../libs/LocalStorage'
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
		}
  },
	mutations: {
		INIT_DATA(state, data) {
			state.days = data;
		},

		UPDATE_DATA(state, [day, value]) {
			state.days[day]
				? state.days[day].data.push(value)
				: state.days = { ...state.days, [day]: { data: [value] } };
			storage.save(state.days);
		},

		REMOVE_TASK(state, [day, task]) {
			state.days[day].data = state.days[day].data.filter(item => item.id !== task.id);
			if (!state.days[day].data.length) delete state.days[day];
			storage.save(state.days);
		},

		CHANGE_TASK_PRIORITY(state, [day, task]) {
			const current = state.days[day].data.find(item => item.id === task.id);
			current.priority === 'high' ? current.priority = 'low' : current.priority = 'high';
			storage.save(state.days);
		},

		SET_USER(state, user) {
			state.user.id = user.id,
			state.user.name = user.name;
			state.user.email = user.email;
			state.user.isLoggedIn = true;
		},

		REMOVE_USER(state) {
			state.user.id = '',
			state.user.name = '';
			state.user.email = '';
			state.user.isLoggedIn = false;
		}
  },
	actions: {
		fetchData({ commit }) {
			const data = storage.load();
			commit('INIT_DATA', data);
		},

		addData({ commit }, data) {
			commit('UPDATE_DATA', data);
			if (this.state.user.isLoggedIn) {
				db.add(this.state.user.id, data[0], data[1]);
			}
		},

		removeTask({ commit }, data) {
			commit('REMOVE_TASK', data);
		},

		changePriority({ commit }, data) {
			commit('CHANGE_TASK_PRIORITY', data);
		},

		async login({ commit }, user) {
			try {
				const response = await auth.signInWithEmailAndPassword(user.email, user.password);
				if (response.user) {
					commit('SET_USER', {
						id: response.user.uid,
						name: response.user.displayName,
						email: user.email
					});
					router.replace({ name: 'Home' });
					db.fill(this.state.user.id, this.state.days);
				}
			} catch (error) {
				console.error(error);
			}
		},

		async logout({ commit }) {
			try {
				await auth.signOut();
				commit('REMOVE_USER');
			} catch (error) {
				console.error(error);
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
				console.error(error);
			}
		}
	},
	getters: {
		getDateByDay(state) {
			return (day) => {
				return state.days[day];
			};
		},

		getDayTasksPriority(state) {
			return (day) => {
				return [
					{ type: 'low', count: state.days[day]?.data.filter(item => item.priority === 'low').length },
					{ type: 'high', count: state.days[day]?.data.filter(item => item.priority === 'high').length }
				]
			}
		},

		getUserName(state) {
			return state.user.name
		},

		getAuthStatus(state) {
			return state.user.isLoggedIn;
		}
	}
})

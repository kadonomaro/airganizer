import router from '@/router';
import { auth } from '@/main';
import { LocalStorage } from '@/libs/LocalStorage';

const storage = new LocalStorage('days');

export default {
	state: {
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

		async login({ dispatch, commit, state, rootState }, user) {
			try {
				const response = await auth.signInWithEmailAndPassword(user.email, user.password);
				if (response.user) {
					dispatch('fetchData');
					router.replace({ name: 'Home' });
					if (Object.keys(rootState.days).length) {
						db.fill(state.user.id, rootState.days);
					}
				}
			} catch (error) {
				commit('CHANGE_ERROR_CODE', error.code);
				setTimeout(() => {
					commit('CHANGE_ERROR_CODE', '');
				}, 3000);
			}
		},

		async logout({ commit, rootState }) {
			try {
				await auth.signOut();
				commit('REMOVE_USER');
				if (Object.keys(rootState.days).length) {
					storage.save(rootState.days);
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
		getUserName(state) {
			return state.user.name;
		},

		getAuthStatus(state) {
			return state.user.isLoggedIn;
		},

		getAuthError(state) {
			return state.auth.error;
		}
	}
};

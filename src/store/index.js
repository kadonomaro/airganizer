import Vue from 'vue'
import Vuex from 'vuex'
import { LocalStorage } from '../libs/LocalStorage'

Vue.use(Vuex)

const storage = new LocalStorage('days');

export default new Vuex.Store({
  state: {
		days: {}
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

		REMOVE_ITEM(state, [day, task]) {
			state.days[day].data = state.days[day].data.filter(item => item.id !== task.id);
			storage.save(state.days);
		},

		CHANGE_TASK_PRIORITY(state, [day, task]) {
			const current = state.days[day].data.find(item => item.id === task.id);
			current.priority === 'high' ? current.priority = 'low' : current.priority = 'high';
			storage.save(state.days);
		}
  },
	actions: {
		fetchData({ commit }) {
			const data = storage.load();
			commit('INIT_DATA', data);
		},

		addData({ commit }, data) {
			commit('UPDATE_DATA', data);
		},

		removeItem({ commit }, item) {
			commit('REMOVE_ITEM', item)
		},

		changePriority({ commit }, data) {
			commit('CHANGE_TASK_PRIORITY', data);
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
		}
	}
})

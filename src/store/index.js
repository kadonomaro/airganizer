import Vue from 'vue'
import Vuex from 'vuex'
import { LocalStorage } from '../libs/LocalStorage'

Vue.use(Vuex)

const storage = new LocalStorage('days');

export default new Vuex.Store({
  state: {
		days: {
			'08-08-20': {
				data: [
					{ id: 111, title: 'Позвонить Евгению', priority: 'low' },
					{ id: 222, title: 'Написать Алексею', priority: 'low' }
				]
			},
			'12-08-20': {
				data: [
					{ id: 333, title: 'Позвонить Артему', priority: 'low' },
					{ id: 444, title: 'Сходить к Олегу', priority: 'low'},
				]
			},
			'13-08-20': {
				data: [
					{ id: 555, title: 'Сходить в магазин', priority: 'high' },
					{ id: 666, title: 'Поиграть с сыном', priority: 'high'}
				]
			},
		}
  },
	mutations: {
		INIT_DATA(state, data) {
			state.days = data;
		},

		UPDATE_DATA(state, [key, value]) {
			state.days[key]
				? state.days[key].data.push(value)
				: state.days = { ...state.days, [key]: { data: [value] } };
			storage.save(state.days);
		},

		REMOVE_ITEM(state, [key, title]) {
			state.days[key].data = state.days[key].data.filter(d => d !== title);
			storage.save(state.days);
		}
  },
	actions: {
		initData({ commit }) {
			const data = storage.load();
			commit('INIT_DATA', data);
		},

		addData({ commit }, data) {
			commit('UPDATE_DATA', data);
		},

		removeItem({ commit }, item) {
			commit('REMOVE_ITEM', item)
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

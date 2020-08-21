import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		days: {
			'08-08-20': {
				data: ['Позвонить Евгению', 'Написать Алексею']
			},
			'12-08-20': {
				data: ['Позвонить Артему', 'Сходить к Олегу']
			},
			'13-08-20': {
				data: ['Сходить в магазин', 'Поиграть с сыном']
			},
		}
  },
  mutations: {
		UPDATE_DATA(state, [key, value]) {
			state.days[key]
				? state.days[key].data.push(value)
				: state.days[key] = { data: [value] };
		}
  },
  actions: {
		addData({ commit }, data) {
			commit('UPDATE_DATA', data);
		}
	},
	getters: {
		getDateByDay(state) {
			return (day) => {
				return state.days[day];
			};
		}
	}
})

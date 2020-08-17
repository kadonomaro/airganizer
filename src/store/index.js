import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		dates: [
			{
				day: '08-08-20',
				data: ['Позвонить Евгению', 'Написать Алексею']
			},
			{
				day: '12-08-20',
				data: ['Позвонить Артему', 'Сходить к Олегу']
			}
		]
  },
  mutations: {

  },
  actions: {

	},
	getters: {
		getDateByDay(state) {
			return (day) => {
				return state.dates.filter(date => date.day === day);
			};
		}
	}
})

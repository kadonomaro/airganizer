export default {
	state: {
		component: 'calendar'
	},
	mutations: {
		SET_COMPONENT(state, name) {
			state.component = name;
		}
	},
	actions: {
		setActiveComponent({ commit }, name) {
			commit('SET_COMPONENT', name);
		}
	}
};

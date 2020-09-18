import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
		component: Home,
		meta: {
			layout: 'Main'
		}
	},
		{
			path: '/list',
			name: 'List',
			component: () => import(/* webpackChunkName: "list" */ '../views/List.vue'),
			meta: {
				layout: 'Main'
			}
		},
  {
    path: '/login',
		name: 'Login',
		meta: {
			layout: 'Auth'
		},
    component: () => import(/* webpackChunkName: "auth" */ '../views/Login.vue')
	},
	{
		path: '/registration',
		name: 'Registration',
		meta: {
			layout: 'Auth'
		},
		component: () => import(/* webpackChunkName: "auth" */ '../views/Registration.vue')
	}

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Join from '@/components/pages/Join'
import Create from '@/components/pages/Create'

Vue.use(Router)

export default new Router({
	mode: 'history',
  	routes: [
    	{
      		path: '/',
      		name: 'Home',
      		component: Home
    	},
    	{
    		path: '/join',
    		name: 'Join',
    		component:Join
    	},
    	{
    		path: '/create',
    		name: 'Create',
    		component:Create
    	}
  	]
})

import Vue from 'vue'
import Router from 'vue-router'
import Create from '@/components/web/pages/Create'
import Home from '@/components/web/pages/Home'

import Join from '@/components/mobile/pages/Join'
import Rules from '@/components/mobile/pages/Rules'
import Reconnection from '@/components/mobile/pages/Reconnection'
import Game from '@/components/mobile/pages/Game'

import Error404 from '@/components/common/pages/Error404'

import {homeGuard,requiredWeb,requiredMobile,requireReconnection} from '../utils/guards'

Vue.use(Router)

export default new Router({
	mode: 'history',
  	routes: [
    	{
      		path: '/',
      		name: 'home',
      		component: Home,
            beforeEnter: homeGuard
    	},
    	{
    		path: '/join',
    		name: 'join',
    		component:Join,
            beforeEnter: requiredMobile,
            
    	},
        {
            path: '/reconnection',
            name: 'reconnection',
            component : Reconnection,
            beforeEnter: requireReconnection
        },
    	{
    		path: '/create',
    		name: 'create',
    		component:Create,
            beforeEnter: requiredWeb
    	},
        {
            path: '/rules',
            name: 'rules',
            component:Rules,
            beforeEnter: requiredMobile
        },
        {
            path : '/game',
            name: 'game',
            component:Game,
            beforeEnter: requiredMobile
        },
        {
            path: '*',
            name: '404',
            component: Error404,
        }
  	]
})

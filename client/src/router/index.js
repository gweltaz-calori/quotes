import Vue from 'vue'
import Router from 'vue-router'
import Create from '@/components/web/pages/Game/Create'
import Game from '@/components/web/pages/Game/Game'


import Join from '@/components/mobile/pages/Join'
import Rules from '@/components/mobile/pages/Rules'
import Reconnection from '@/components/mobile/pages/Reconnection'


import Error404 from '@/components/common/pages/Error404'
import Home from '@/components/common/pages/Home'

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
            path: '/game',
            name: 'game',
            component:Game,
            beforeEnter: requiredWeb,
            children : [
                {
                    path: 'create',
                    name: 'create',
                    component:Create,
                }

            ]
        },
        {
            path: '/rules',
            name: 'rules',
            component:Rules,
            beforeEnter: requiredMobile
        },
        {
            path: '*',
            name: '404',
            component: Error404,
        }
  	]
})

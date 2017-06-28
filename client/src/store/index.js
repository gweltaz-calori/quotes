import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
    infos : {

    },
    reconnected : false,
}


const mutations = {
    setInfos (state,infos) {
        state.infos = infos;
    },
    setReconnected(state,value) {
        state.reconnected = value;
    }
}


const actions = {
    setInfos: ({ commit },infos) => commit('setInfos',infos),
    setReconnected: ({ commit },value) => commit('setReconnected',value),
}


const getters = {
    infos: state => state.infos,
    reconnected : state => state.reconnected
}


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
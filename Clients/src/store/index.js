import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        stateProdAchievements: null,
        countProbTemp: null,
        stateLines: null,
        stateMachines: null,
        searchMc: null,
        stateGraphClick: null,
        isActiveRoutes: null,
        storeTheme: 'light',
        stateMcCt: ''
    },
    mutations: {
        GET_PROD(state, payload) {
            state.stateProdAchievements = payload
        },
        GET_COUNT(state, payload) {
            state.countProbTemp = payload
        },
        GET_LINES(state, payload) {
            state.stateLines = payload
        },
        GET_MACHINES(state, payload) {
            state.stateMachines = payload
        },
        GET_SEARCH_MC(state, payload) {
            state.searchMc = payload
        },
        GET_PROBLEM_HISTORY(state, payload) {
            state.stateGraphClick = payload
        },
        PUSH_CHANGES_ROUTE(state, payload) {
            state.isActiveRoutes = payload
        },
        CHANGE_THEME(state, payload) {
            state.storeTheme = payload
        },
        GET_MC(state, payload) {
            state.stateMcCt = payload
        }
    },
    actions: {
        storeProdAchievments({ commit }) {
            console.log('MASUK');
            axios.get(`${process.env.VUE_APP_HOST}/colordash`)
                .then((result) => {
                    commit('GET_PROD', result.data.data)
                    console.log(result.data.data);
                }).catch((err) => {
                    console.log(err)
                    let count = 0

                    function reGettingData() {
                        axios.get(`${process.env.VUE_APP_HOST}/colordash`)
                            .then((result) => {
                                commit('GET_PROD', result.data.data)
                            }).catch((err) => {
                                console.log(err)
                                if (count !== 10) {
                                    reGettingData()
                                }
                                count++
                            });
                    }
                    reGettingData()
                });
        },
        storeCountProbTemp({ commit }) {
            axios.get(`${process.env.VUE_APP_HOST}/countTempProb`)
                .then((result) => {
                    if (result.data) {
                        commit('GET_COUNT', result.data.data)
                    }
                }).catch((err) => {
                    console.log(err)
                });
        },
        storeGetLines({ commit }) {
            axios.get(`${process.env.VUE_APP_HOST}/lines`)
                .then((result) => {
                    if (result.data) {
                        commit('GET_LINES', result.data.data)
                    }
                }).catch((err) => {
                    console.log(err)
                });
        },
        storeGetMachines({ commit }) {
            axios.get(`${process.env.VUE_APP_HOST}/machines`)
                .then((result) => {
                    if (result.data) {
                        commit('GET_MACHINES', result.data.data)
                    }
                }).catch((err) => {
                    console.log(err);
                });
        },
        storeSearchMachine({ commit }, machine) {
            axios.get(`${process.env.VUE_APP_HOST}/searchMc?machine=${machine}`)
                .then((result) => {
                    if (result.data) {
                        commit('GET_SEARCH_MC', result.data.data)
                    }
                }).catch((err) => {
                    console.log(err);
                });
        },
        actionsGetProblemHistory({ commit }, data) {
            let url = `${process.env.VUE_APP_HOST}/problemHistory?startDate=${data.startDate}&endDate=${data.endDate}&machine=${data.machine}`;
            if (data.isProblem) {
                url += `&problem=${data.machine}&isProblem=true`
            } else {
                url += `&isProblem=false`
            }

            axios
                .get(url)
                .then((result) => {
                    commit('GET_PROBLEM_HISTORY', result.data.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        actionsPushRoute({ commit }, route) {
            commit('PUSH_CHANGES_ROUTE', route)
        },
        actionsChangeTheme({ commit }, theme) {
            commit('CHANGE_THEME', theme)
        },
        actionsGetCtOneMc({ commit }, mc) {
            // console.log(mc);
            commit('GET_MC', mc)
        }
    },
    modules: {}
})
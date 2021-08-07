import http from '../../service/http'

const state = {
    allShopRevenue: [],
    overview: null,
}

const getters = {
    allShopRevenue() {
        return state.allShopRevenue;
    },
    overview() {
        return state.overview
    }
}

const mutations = {
    setAllShopRevenue(_state, data) {
        state.allShopRevenue = data
    },
    setOverview(_state, data) {
        state.overview = data;
    }
}

const actions = {
    getAllShopRevenue({commit}, id) {
        http.get(`/api/admin/revenue-top/shops/month?limit=${id}`)
        .then((result) => {
            commit('setAllShopRevenue', result.data);
        }).catch((err) => {
            console.log(err)
        })
    },
    getOverview({commit}) {
        http.get(`/api/admin/overview`)
        .then((result) => {
            commit('setOverview', result.data);
        }).catch((err) => {
            console.log(err)
        })
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
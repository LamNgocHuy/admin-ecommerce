import http from '../../service/http'

const state = { 
    allProducts: [],
    topTenProducts: []
}

const getters = {
    allProducts() {
        return state.allProducts;
    },
    topTenProducts() {
        return state.topTenProducts;
    }
}

const mutations = {
    setAllProducts(_state, data) {
        state.allProducts = data;
    },
    setTopTenProducts(_state, data) {
        state.topTenProducts = data;
    }
}

const actions = {
    getAllProducts({commit}) {
        http.get(`api/admin/products`)
        .then((result) => {
            commit('setAllProducts', result.data);
        }).catch((err) => {
            console.log(err);
        })
    },
    getTopTenProducts({commit}) {
        http.get(`api/admin/products/topten`)
        .then((result) => {
            commit('setTopTenProducts', result.data);
        }).catch((err) => {
            console.log(err);
        })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
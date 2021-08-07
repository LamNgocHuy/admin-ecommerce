import http from '../../service/http'

const state = { 
    allProducts: [],
}

const getters = {
    allProducts() {
        return state.allProducts;
    },
}

const mutations = {
    setAllProducts(_state, data) {
        state.allProducts = data;
    },
}

const actions = {
    getAllProducts({commit}) {
        http.get(`api/admin/products/best-sell/month?limit=5`)
        .then((result) => {
            commit('setAllProducts', result.data);
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
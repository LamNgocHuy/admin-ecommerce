const state = {
    isLoader: false
}

const getters = {
    isLoader() {
        return state.isLoader;
    }
}

const mutations = {
    setLoader(_state, data) {
        state.isLoader = data;
    }
}

const actions = {
    showLoader({commit}) {
        commit('setLoader', true);
    },
    hideLoader({commit}) {
        commit('setLoader', false);
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

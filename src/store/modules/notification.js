const state = {
    notification: null
}

const getters = {
    notification() {
        return state.notification;
    }
}

const mutations = {
    setNotification(_state, data) {
        state.notification = data;
    }
}

const actions = {
    setNotification({commit}, data) {
        commit('setNotification', data);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
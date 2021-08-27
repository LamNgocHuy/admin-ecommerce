import http from "../../service/http";
import notification from "../modules/notification"

const state = {
  allRoles: [],
  allPermissions: [],
};

const getters = {
  allRoles() {
    return state.allRoles;
  },
  allPermissions() {
    return state.allPermissions;
  },
};

const mutations = {
  setAllRoles(_state, data) {
    state.allRoles = data;
  },
  setAllPermissions(_state, data) {
    state.allPermissions = data;
  },
};

const actions = {
  getAllRoles({ commit }) {
    http
      .get(`/api/home/roles/all`)
      .then((result) => {
        commit("setAllRoles", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getAllPermissions({ commit }) {
    http
      .get(`/api/developer/permissions/all`)
      .then((result) => {
        commit("setAllPermissions", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updateRole({ commit, dispatch }, {params, id}) {
    http
      .put(`/api/home/roles/${id}`, params)
      .then((result) => {
        notification.state.notification = result.data;
        commit;
        dispatch("getAllRoles");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  createNewRole({ commit, dispatch }, params) {
    http
      .post(`/api/home/roles`, params)
      .then((result) => {
        notification.state.notification = result.data;
        commit;
        dispatch("getAllRoles");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

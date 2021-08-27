import http from "../../service/http";
import notification from "../modules/notification"

const state = {
  allAccounts: [],
};

const getters = {
  allAccounts() {
    return state.allAccounts;
  },
};

const mutations = {
  setAllAccounts(_state, data) {
    state.allAccounts = data;
  },
};

const actions = {
  getAllAccounts({ commit }) {
    http
      .get("/api/admin/accounts")
      .then((result) => {
        commit("setAllAccounts", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  lockAccount({ dispatch, commit }, id) {
    http
      .post(`/api/admin/accounts/${id}/lock_user`)
      .then((result) => {
        notification.state.notification = result.data;
        dispatch("getAllAccounts");
        commit;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  unlockAccount({ dispatch, commit }, id) {
    http
      .post(`/api/admin/accounts/${id}/unlock_user`)
      .then((result) => {
        notification.state.notification = result.data;
        dispatch("getAllAccounts");
        commit;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updateRolesForUser({ dispatch, commit }, {id, params}) {
    http
      .put(`/api/home/users/${id}/roles`, params)
      .then((result) => {
        commit;
        notification.state.notification = result.data;
        dispatch("getAllAccounts");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  changeMyAccountInfo({ commit }, { id }) {
    http
      .post(`api/admin/accounts?id=${id}`)
      .then((result) => {
        notification.actions.setNotification(result.data);
        commit;
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

import http from "../../service/http";

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
        commit;
        result;
        dispatch("getAllAccounts");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  unlockAccount({ dispatch, commit }, id) {
    http
      .post(`/api/admin/accounts/${id}/unlock_user`)
      .then((result) => {
        commit;
        result;
        dispatch("getAllAccounts");
      })
      .catch((err) => {
        console.log(err);
      });
  },
  changeAuthorAccount({ dispatch, commit }, { idUser, idRole }) {
    http
      .post(`/api/admin/accounts?idUser=${idUser}&idRole=${idRole}`)
      .then((result) => {
        commit;
        result;
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
        commit;
        result;
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

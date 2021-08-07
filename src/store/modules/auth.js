import http from "../../service/http";
import router from "../../router/routes";

const state = {
  userInfo: {},
};

const getters = {
  userInfo() {
    return state.userInfo;
  },
};

const mutations = {
  setUserInfo(_state, data) {
    state.userInfo = data;
  },
};

const actions = {
  login({ commit }, params) {
    http
      .post("/api/login", params)
      .then((result) => {
        if (!result.data.accessToken && result.data.status == -1) {
          commit;
          router.push({ path: "/login" });
        } else {
          localStorage.setItem("token", result.data.jwttoken);
          localStorage.setItem("adminId", result.data.userDto.id);
          router.push({ path: "/" });
        }
      })
      .catch((err) => {
        console.log(err);
        commit;
      });
  },
  logout({ commit }) {
    commit;
    localStorage.clear();
    router.push({ path: "/login" });
  },
  getPersonalAdminInfo({commit}, id) {
    http.get(`/api/admin/personal-info?id=${id}`)
    .then((result) => {
      commit("setUserInfo", result.data);
    })
    .catch((err) => {
      console.log(err);
      commit;
    })
  },
  changePersonalInfo({dispatch, commit}, params) {
    http.post(`/api/admin/personal-info`, params)
    .then((result) => {
      console.log(result);
      dispatch("getPersonalAdminInfo", localStorage.getItem("adminId"));
      commit;
    })
    .catch((err) => {
      console.log(err);
      commit;
    })
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

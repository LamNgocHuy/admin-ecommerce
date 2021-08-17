import http from "../../service/http";

const state = {
  allShopRevenue: [
    {
        logo: "https://cf.shopee.vn/file/91597425430dbd0593cc4f4845eea9d6_tn",
        shopName: "shop 1",
        ownerName: "Vendor 1",
        revenue: 300000,
        quantitySell: 1200
    },
    {
        logo: "https://cf.shopee.vn/file/7927127c680835ae86b3bfccefc8c6e0_tn",
        shopName: "shop 2",
        ownerName: "Vendor 2",
        revenue: 200000,
        quantitySell: 1100
    },
    {
        logo: "https://cf.shopee.vn/file/0dd480718d0a8c17a32ca53a1b82159e_tn",
        shopName: "shop 3",
        ownerName: "Vendor 3",
        revenue: 100000,
        quantitySell: 1000
    },
  ],
  overview: null,
};

const getters = {
  allShopRevenue() {
    return state.allShopRevenue;
  },
  overview() {
    return state.overview;
  },
};

const mutations = {
  setAllShopRevenue(_state, data) {
    state.allShopRevenue = data;
  },
  setOverview(_state, data) {
    state.overview = data;
  },
};

const actions = {
  getAllShopRevenue({ commit }, id) {
    http
      .get(`/api/admin/revenue-top/shops/month?limit=${id}`)
      .then((result) => {
        commit("setAllShopRevenue", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getOverview({ commit }) {
    http
      .get(`/api/admin/overview`)
      .then((result) => {
        commit("setOverview", result.data);
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

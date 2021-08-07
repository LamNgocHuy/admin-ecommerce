<template>
  <div class="mainpage d-flex flex-row">
    <Sidebar/>
    <div class="spinner-border text-light" role="status" style="font-size: .9rem" v-if="isLoader">
      <span class="visually-hidden">Loading...</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Sidebar from '../components/Sidebar.vue'
export default {
  name: 'MainPage',
  components: {
    Sidebar
  },
  computed:{
    ...mapGetters({
      isLoader: "loader/isLoader",
    })
  },
  methods: {
    ...mapActions({
      getAllAccounts: "account/getAllAccounts",
      getPersonalAdminInfo: "auth/getPersonalAdminInfo",
      getAllShopRevenue: "shop/getAllShopRevenue",
      getOverview: "shop/getOverview"
    })
  },
  created() {
    this.getAllAccounts();
    this.getPersonalAdminInfo(localStorage.getItem("adminId"));
    this.getAllShopRevenue(5);
    this.getOverview();
  }
}
</script>

<style scoped>
.mainpage {
    max-width: 100vw;
}

</style>
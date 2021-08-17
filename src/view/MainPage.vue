<template>
  <div class="mainpage d-flex flex-row">
    <notifications position="bottom right" classes="my-notification"/>
    <Sidebar/>
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
      notification: "notification/notification"
    })
  },
  methods: {
    ...mapActions({
      getAllAccounts: "account/getAllAccounts",
      getPersonalAdminInfo: "auth/getPersonalAdminInfo",
      getAllShopRevenue: "shop/getAllShopRevenue",
      getOverview: "shop/getOverview",
      getAllProducts: "product/getAllProducts",
      getAllRoles: "role/getAllRoles",
      getAllPermissions: "role/getAllPermissions"
    })
  },
  created() {
    this.getAllAccounts();
    this.getPersonalAdminInfo(localStorage.getItem("adminId"));
    this.getAllShopRevenue(5);
    this.getOverview();
    this.getAllProducts();
    this.getAllRoles();
    this.getAllPermissions();
  },
}
</script>

<style scoped>
.mainpage {
  max-width: 100vw;
}
</style>
<template>
  <nav
    class="navbar navbar-expand d-flex flex-column align-item-start"
    id="sidebar"
  >
    <a href="#" class="navbar-brand mt-5">
      <!-- <img src="../assets/logo.png" class="avatar avatar-circle" alt=""> -->
      <p class="text-dark">Ngoc Huy</p>
    </a>
    <ul class="navbar-nav d-flex flex-column mt-5 w-100">
      <li class="nav-item w-100">
        <router-link :to="{ path: '/dashboard' }" class="nav-link ps-4">
          <i class="bx bxs-dashboard"></i>
          <span class="ms-2">Dashboard</span>
        </router-link>
      </li>
      <li class="nav-item w-100">
        <router-link :to="{ path: '/manage-account' }" class="nav-link ps-4">
          <i class="bx bxs-user"></i>
          <span class="ms-2">Manage account</span>
        </router-link>
      </li>
      <li class="nav-item w-100">
        <router-link :to="{ path: '/admin-profile' }" class="nav-link ps-4">
          <i class="bx bxs-cog"></i>
          <span class="ms-2">Setting</span>
        </router-link>
      </li>
      <li class="nav-item w-100">
        <a class="nav-link ps-4" @click="logout">
          <i class='bx bx-log-out'></i>
          <span class="ms-2">Log out</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Sidebar",
  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
  },
};
</script>

<style scoped>
.navbar {
  width: 250px;
  height: 100vh;
  background: #fff;
  color: #333;
  transition: 0.4s;
}

.navtop {
  position: fixed;
  top: 0;
}

.nav-link {
  font-size: 1.2rem;
  color: #3f4254;
  border-radius: 8px;
}

.nav-link:focus,
.nav-link:active,
.nav-link:hover,
.router-link-active {
  background: var(--bg-primary);
  color: #fff;
  cursor: pointer;
}

.nav-item {
  padding: 5px 10px;
}

.nav-link > span {
  font-size: 1rem;
}
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import router from './router/routes'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters({
      notification: "notification/notification"
    })
  },
  created() {
    axios.interceptors.request.use(
      (config) => {
        this.showLoader();
        return config;
      },
      (error) => {
        this.showLoader();
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      (response) => {
        if (this.notification != null) {
          this.$notify({
            text: this.notification,
            duration: 3000
          });
        }
        this.setNotification(null);
        this.hideLoader();
        if (response.data.status === 0) {
          localStorage.removeItem("token");
          router.push({ path: "/login" });
        }
        return response;
      },
      (error) => {
        this.hideLoader();
        return Promise.reject(error);
      }
    );
  },
  methods: {
    ...mapActions('loader', [
      'showLoader',
      'hideLoader'
    ]),
    ...mapActions({
      setNotification: "notification/setNotification"
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap');
#app {
  font-family: 'Fira Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

:root {
  --bg-primary: #7777dd;
  --primary-color: #40407a;
  --secondary-color: #ffcd955e;
  --input-color: #e4e6ef;
  --text-color: #3f3f3f;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
::-webkit-scrollbar-thumb {
  background: #888; 
}

::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 13px !important;
  letter-spacing: 0;
}

body {
  min-height: 100vh;
  background: var(--bg-primary) !important;
  color: var(--text-color);
  font-size: 13px !important;
  overflow: hidden;
}

textarea:focus,
input[type="text"]:focus,
input[type="password"]:focus,
input[type="datetime"]:focus,
input[type="datetime-local"]:focus,
input[type="date"]:focus,
input[type="month"]:focus,
input[type="time"]:focus,
input[type="week"]:focus,
input[type="number"]:focus,
input[type="email"]:focus,
input[type="url"]:focus,
input[type="search"]:focus,
input[type="tel"]:focus,
input[type="color"]:focus,
.uneditable-input:focus {   
box-shadow: none !important;
outline: 0 none !important;
border: 1px solid var(--input-color) !important;
background: var(--input-color) !important;
}

.form-control {
  background: var(--input-color) !important;
  border: 1px solid var(--input-color) !important; 
  border-radius: 10px !important;
  padding: 0.9rem !important;
}

.form-group {
  margin-bottom: 20px
}

.form-group > label {
  font-weight: 600;
  margin-bottom: 10px;
}

.btn {
  padding: 10px 10px !important;
  font-weight: 600 !important;
  border-radius: 10px !important;
  font-size: 13px !important;
  box-shadow: none !important;
}

.btn-primary {
  color: #fff !important;
  background-color: var(--primary-color) !important;
  border: var(--primary-color) !important;
}

.btn-secondary {
  color: var(--bg-primary) !important;
  background-color: var(--secondary-color) !important;
  border: var(--secondary-color) !important;
}

.invalid-feedback {
  color: #f64e60;
}

.valid-feedback {
  color: #2ecc71;
}

.card {
  border: none !important;
  box-shadow: 0 0 30px 0 rgba(82, 63, 105, 0.05) !important;
}

table {
  font-size: .9rem;
  font-weight: 600 !important;
}

table > tbody > tr > td {
  padding: 5px !important;
}

table > thead > tr > th {
  padding: 5px !important;
}

.table-responsive {
  max-height: 70vh;
  min-height: 300px;
}

thead {
  color: #b5b5c3;
}

tbody > tr > td > i {
  font-size: 24px;
  padding: 10px;
  background: #f3f6f9;
  color: #b5b5c3;
  border: none !important;
}

tbody > tr > td > i:hover {
  background: #e0eafc;
  color: #3f80ea;
  cursor: pointer;
}

tbody > tr > td {
  padding: 15px 0 !important;
  vertical-align: middle;
}


.badge {
  padding: 8px 12px !important;
  font-weight: 500 !important;
  border-radius: .72rem;
  font-size: .8rem !important;
}

.badge-active {
  color: #2ecc71 !important;
  background-color: #a7fdcb;
}

.badge-inactive {
  color: #f64e60 !important;
  background-color: #ffe2e5;
}

.pagination li a {
  position: relative;
  display: block;
  width: 30px;
  height: 30px;
  font-size: .75rem !important;
  font-weight: 500;
  text-align: center;
  line-height: 32px;
  background: #f3f6f9;
  color: #7E8299;
  text-decoration: none;
  margin: 5px;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
}

.pagination li a:hover,
.pagination li a[disabled] {
  background: #3f80ea;
  color: #fff !important;
}

.pagination li a[disabled] {
  cursor: pointer;
}

.text-muted {
  color: #B5B5C3 !important;
  font-size: 600 !important;
}

.my-notification {
  background: #2ecc71 !important;
  padding: 15px;
  margin: 0 5px 5px 0;
  color: #fff;
}
</style>

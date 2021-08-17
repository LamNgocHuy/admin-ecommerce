import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '../view/MainPage.vue'
import Login from '../view/Login.vue'
import Dashboard from '../view/Dashboard.vue'
import ManageAccount from '../view/ManageAccount.vue'
import AdminProfile from '../view/AdminProfile.vue'
import ManageRole from '../view/ManageRole.vue'
// import auth from '../store/modules/auth'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'mainpage',
        component: MainPage,
        meta: { requiresAuth: true },
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: Dashboard,
                meta: { requiresAuth: true }
            },
            {
                path: 'manage-account',
                name: 'manage-account',
                component: ManageAccount,
                meta: { requiresAuth: true }
            },
            {
                path: 'admin-profile',
                name: 'admin-profile',
                component: AdminProfile,
                meta: { requiresAuth: true }
            },
            {
                path: 'manage-role',
                name: 'manage-role',
                component: ManageRole,
                meta: { requiresAuth: true }
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) next();
            else {
                next('/');
            }
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (token) {
        token;
    }
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (localStorage.getItem('token') === null) {
        next({ path: '/login' });
      }
      next();
    } else {
      if(!localStorage.getItem('token')) {
        next()
        } else {
        next('/');
        }
      next();
    }
});
  

export default router
import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import account from './modules/account'
import product from './modules/product'
import shop from './modules/shop'
import loader from './modules/loader'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        account,
        product,
        shop,
        loader
    }
});
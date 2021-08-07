<template>
  <div class="container main">
    <div class="row w-100 justify-content-center">
      <div class="card shadow-lg border-0 col-12 col-md-4 align-self-center">
      <div class="card-body">
        <form class="p-3" @submit.prevent="submit">
          <div class="card-title">
            <h4>Sign in Admin</h4>
            <small class="text-muted">DACNPM: Ecommerce</small>
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input 
              type="text" 
              class="form-control" 
              id="username"
              placeholder="Enter your username"
              v-model.trim="$v.username.$model"
              :class="{ 'is-invalid': $v.username.$error, 'is-valid': !$v.username.$invalid}">
              <div class="valid-feedback">Username is valid!</div>
              <div class="invalid-feedback">
                <span v-if="!$v.username.required">Username is required.</span>
                <span v-if="!$v.username.maxLength">{{ $v.username.$params.maxLength.max  }} characters maximum.</span>
              </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              class="form-control" 
              id="password"
              placeholder="Enter your password"
              v-model.trim="$v.password.$model"
              :class="{ 'is-invalid': $v.password.$error, 'is-valid': !$v.password.$invalid}">
            <div class="valid-feedback">Password is valid!</div>
            <div class="invalid-feedback">
              <span v-if="!$v.password.required">Password is required.</span>
              <span v-if="!$v.password.minLength">{{ $v.password.$params.minLength.min  }} characters minimun.</span>
            </div>
          </div>
          <button type="submit" class="btn btn-primary mt-2" :disabled="this.$v.$invalid">
            <span v-if="!isLoader">Sign in</span>
            <div class="spinner-border text-light" role="status" style="font-size: .9rem" v-else>
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
        </form>
      </div>
    </div>
    </div>
    
  </div>
</template>

<script>
import {required, maxLength, minLength} from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters('loader', ['isLoader'])
  }
  ,
  validations: {
    username: {
      required,
      maxLength: maxLength(30)
    },
    password: {
      required,
      minLength: minLength(6)
    },
  },
  methods: {
    ...mapActions('auth', [
      'login'
    ]),
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.login({
          username: this.username,
          password: this.password
        })
      }
    }
  }
}
</script>

<style scoped>
.main {
  min-height: 100vh;
}

.row {
  height: 100vh;
}

.card-title {
  margin-bottom: 30px;
}

.card-title > h4 {
  font-weight: 600;
  font-size: 1.5rem !important;
  color: var(--primary-color);
}

.card-title > small {
  font-size: 12px;
  font-weight: 500;
  font-style: italic;
}

.card {
  height: 400px;
  border-radius: 8px;
}

</style>
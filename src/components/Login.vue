<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Welcome</h3>
          <p class="subtitle has-text-grey">Insert your credentials</p>
          <div class="box">
            <figure class="avatar">
              <!-- <img class="logo" src="../../assets/img/logo-simple.png"> -->
              <i class="far fa-address-book has-text-info" style="font-size: 100px"></i>
            </figure>
            <br />
            <form method="POST" @submit="submit" aria-label="Login">
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    id="login"
                    type="text"
                    name="login"
                    v-model="login"
                    placeholder="User or e-mail"
                    required
                    autofocus
                  />
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    id="password"
                    type="password"
                    name="password"
                    v-model="password"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
              <div v-if="invalidCredentials" class="field">
                <div class="control has-text-centered">
                  <span role="alert">
                    <strong class="has-text-danger">Invalid credentials</strong>
                  </span>
                </div>
              </div>
              <div v-else-if="loginError" class="field">
                <div class="control has-text-centered has-text-danger">
                  <span role="alert">
                    <strong class="has-text-danger">Login error</strong>
                  </span>
                </div>
              </div>
              <div class="field">
                <button :class="['button', 'is-block', 'is-info', 'is-large', 'is-fullwidth', isLoading ? 'is-loading' : '']">Login</button>
              </div>
              <div class="field">
                <label class="checkbox">
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>
            </form>
          </div>
          <p class="has-text-grey">
            <a href="../">Register</a> &nbsp;·&nbsp;
            <a href="../">Forgot password?</a> &nbsp;·&nbsp;
            <a href="../">Help</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { storeToken } from "../helpers/local-storage"
import { login } from '../helpers/login'

export default {
  data() {
    return {
      login: '',
      password: '',
      invalidCredentials: false,
      loginError: false,
      isLoading: false,
    }
  },

  methods: {
    submit(event) {
      event.preventDefault()

      this.isLoading = true
      this.invalidCredentials = false
      this.loginError = false

      login(this.login, this.password)
        .then(res => {          
          storeToken(res.data.access_token)
          this.$router.push(this.$route.query.redirect || '/')          
        })
        .catch(err => {
          if (err.response && err.response.status === 401) {
            this.invalidCredentials = true
          } else {
            this.loginError = true
          }
        })
        .finally(()=>this.isLoading = false)
    }
  }
}
</script>

<style>
</style>